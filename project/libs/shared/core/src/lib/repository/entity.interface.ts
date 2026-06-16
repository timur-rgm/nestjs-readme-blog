export type EntityId = string;
export type DefaultObject = object;

export interface Entity<
  Id extends EntityId,
  Object = DefaultObject,
> {
  id?: Id;
  convertToObject(): Object;
}
