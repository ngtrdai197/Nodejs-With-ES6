export const createQuery = (query, conditions) => {
    if (conditions.populate) {
        query.populate(conditions.populate)
    }
    if (conditions.selects) {
        query.select(conditions.selects)
    }
    if (conditions.limit) {
        query.limit(conditions.limit)
    }
    if (conditions.sort) {
        query.sort(conditions.sort)
    }
    return query
}