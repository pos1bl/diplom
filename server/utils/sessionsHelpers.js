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