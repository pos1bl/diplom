import { Types } from "mongoose"

export const SESSIONS_ROLES = {
  USER: 'user',
  SPECIALIST: 'specialist',
}

export const buildSessionFilter = ({ roleField, id, query }) => {
  const filter = { [roleField]: id };

  // 1. Фільтр по статусу: ?status=scheduled або ?status=scheduled,completed
  if (query.status) {
    const statuses = String(query.status).split(',');
    filter.status = { $in: statuses };
  }

  // 2. Фільтр по даті: ?dateFrom=2025-05-01&dateTo=2025-05-31
  if (query.dateFrom || query.dateTo) {
    filter.scheduledAt = {};
    if (query.dateFrom) {
      filter.scheduledAt.$gte = new Date(query.dateFrom);
    }
    if (query.dateTo) {
      filter.scheduledAt.$lte = new Date(query.dateTo);
    }
  }

  // 3. (Опційно) пагінація: ?limit=10&skip=20
  // Ми не вносимо це в filter, але збережемо для опцій find()
  const options = {};
  if (query.limit) options.limit = parseInt(query.limit, 10);
  if (query.skip) options.skip = parseInt(query.skip, 10);
  if (query.sortBy) options.sort = { [query.sortBy]: query.order === 'asc' ? 1 : -1 };

  return { filter, options };
}

const buildAgeQuery = (selectedAges) => {
  const now = new Date();

  const threshold30 = new Date(
    now.getFullYear() - 30,
    now.getMonth(),
    now.getDate()
  );
  const threshold40 = new Date(
    now.getFullYear() - 40,
    now.getMonth(),
    now.getDate()
  );
  const SPECIALIST_AGE_OPTIONS  = {
    "30-": { dateOfBirth: { $gt: threshold30 } },
    "30-40": { dateOfBirth: { $lte: threshold30, $gt: threshold40 } },
    "40+": { dateOfBirth: { $lte: threshold40 } },
  };

  const orConditions = selectedAges
    .filter(key => SPECIALIST_AGE_OPTIONS[key])
    .map(key => SPECIALIST_AGE_OPTIONS[key]);

  return { $or: orConditions };
}

const SPECIALIST_ARRAY_OPTIONS = ["methods", "specialNeeds", "gender"];
const DEFAULT_LIMIT_SIZE = 10;

function normalizeQueryArrays(q) {
  const out = {};
  Object.entries(q).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      out[key] = val;
    } else if (typeof val === 'string') {
      out[key] = val.includes(',') ? val.split(',') : [val];
    }
  });
  return out;
}

const buildSpecialistsFilter = (rawQuery) => {
  const query = normalizeQueryArrays(rawQuery);
  let filter = { isFired: false };
  const options = { limit: DEFAULT_LIMIT_SIZE, skip: 0 };

  for (const filterName in query) {
    if (SPECIALIST_ARRAY_OPTIONS.includes(filterName)) {
      filter[filterName] = { $in: query[filterName] }
    }

    if (filterName === "age") {
      const ageQuery = buildAgeQuery(query[filterName]);
      filter = { ...filter, ...ageQuery }
    }

    if (filterName === "areas") {
      filter = { ...filter, $or: [{ mainAreas: {$in: query[filterName]} }, { secondaryAreas: {$in: query[filterName]} }] }
    }
  }

  if (query?.pageIndex) options.skip = +query.pageIndex * DEFAULT_LIMIT_SIZE;

  return { filter, options };
}

export const buildSpecialistsPipeline = (query) => {
  const { filter, options } = buildSpecialistsFilter(query);

  const pipeline = [
    { $match: filter },
  ];

  if (query?.areas && query.areas.length) {
    pipeline.push(
      {
        $addFields: {
          mainMatchCount: {
            $size: { $setIntersection: ['$mainAreas', query.areas] }
          }
        }
      },
      { $sort: { mainMatchCount: -1 } }
    );
  }

  pipeline.push(
  {
    $facet: {
      data: [
        { $skip: options.skip },
        { $limit: options.limit },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      ],
      totalCount: [
        { $count: 'count' }
      ]
    },
  },
  { $unwind: { path: '$totalCount', preserveNullAndEmptyArrays: true } },
  { $addFields: { totalCount: '$totalCount.count' } },
  { $project: { 'totalCount.count': 0 } }
);

  return pipeline;
}

export const buildFullSpecialistInfoPipeline = (id, userId = "", dateProps) => {
  const { startDate: startDayjs, endDate: endDayjs } = dateProps;

  const startDate = startDayjs.toDate();
  const endDate   = endDayjs.toDate();

  return [
    { $match: { _id: new Types.ObjectId(id) } },
    { $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
    }},
    { $unwind: '$user' },
    { $lookup: {
        from: 'diplomas',
        localField: '_id',
        foreignField: 'specialist',
        as: 'diploms'
    }},
    { $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: 'specialist',
        as: 'courses'
    }},
    { $lookup: {
        from: 'unavailabilities',
        let: { specId: '$_id' },
        pipeline: [
          { $match: {
              $expr: {
                $and: [
                  { $eq: ['$specialist', '$$specId'] },
                  { $lte: ['$start', endDate] },
                  { $gte: ['$end', startDate] },
                ]
              }
          }}
        ],
        as: 'unavailabilities'
    }},
    { $lookup: {
        from: 'sessions',
        let: { specId: '$_id', userId },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $or: [
                      { $eq: ['$specialist', '$$specId'] },
                      { $eq: ['$user', { $toObjectId: '$$userId' }] },
                    ]
                  },
                  { $eq: ['$status',     'scheduled'] },
                  { $gte: ['$scheduledAt', startDate] },
                  { $lte: ['$scheduledAt',   endDate]   },
                ]
              }
            }
          }
        ],
        as: 'sessions'
    }},
    { $project: {
        name: '$user.name',
        dateOfBirth: 1,
        gender: 1,
        bio: 1,
        yearsOfExperience: 1,
        mainAreas: 1,
        secondaryAreas: 1,
        excludedAreas: 1,
        methods: 1,
        avatarUrl: 1,
        availability: 1,
        diploms: 1,
        courses: 1,
        unavailabilities: 1,
        sessions: 1,
    }}
  ];
}

export const buildConflictCheckPipeline = (userId, specId, scheduledAt) => {
  return [
    {
      $match: {
        status: 'scheduled',
        scheduledAt,
        $or: [
          { user: new Types.ObjectId(userId) },
          { specialist: new Types.ObjectId(specId) },
        ],
      },
    },
    { $project: { _id: 1 } },

    {
      $unionWith: {
        coll: 'unavailabilities',
        pipeline: [
          {
            $match: {
              specialist: new Types.ObjectId(specId),
              start:      { $lte: scheduledAt },
              end:        { $gt:  scheduledAt },
            },
          },
          { $project: { _id: 1 } },
        ],
      },
    },

    { $limit: 1 },
  ]
}
