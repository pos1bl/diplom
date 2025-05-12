export default function cleanEmptyParams<T extends Record<string, unknown>>(search: T) {
  const newSearch = { ...search };

  Object.keys(newSearch).forEach((key) => {
    const value: any = newSearch[key];
    if (value === undefined || value === '' || (typeof value === 'number' && isNaN(value)) || (value instanceof Array && !value.length)) {
      delete newSearch[key];
    }
  });

  return newSearch;
}
