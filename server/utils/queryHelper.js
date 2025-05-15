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
  let filter = {};
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
