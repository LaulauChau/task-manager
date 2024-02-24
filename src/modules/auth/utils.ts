export function excludeFields<
  TObject extends object,
  TKey extends keyof TObject,
>(object: TObject, fields: TKey[]): Omit<TObject, TKey> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !fields.includes(key as TKey)),
  ) as Omit<TObject, TKey>;
}
