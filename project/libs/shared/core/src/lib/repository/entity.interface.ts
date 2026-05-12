export type EntityIdType = string;

export interface Entity<
  Id extends EntityIdType,
  Object = Record<string, unknown>,
> {
  id?: Id;
  convertToObject(): Object;
}
