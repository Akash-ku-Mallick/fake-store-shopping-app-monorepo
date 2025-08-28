export default function processQueryParams<T extends Record<string, any>>(params?: T | void): Partial<T> {
  if (!params) return {};

  const filtered = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  ) as Partial<T>;

  return Object.keys(filtered).length > 0 ? filtered : {};
}
