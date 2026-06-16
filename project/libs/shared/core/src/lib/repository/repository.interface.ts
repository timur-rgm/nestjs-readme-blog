import type { DefaultObject, Entity, EntityId } from './entity.interface';

export interface Repository<
  EntityType extends Entity<EntityId, Object>,
  Object = DefaultObject,
> {
  save(entity: EntityType): Promise<EntityType>;
  findById(id: EntityType['id']): Promise<EntityType | null>;
  update(id: EntityType['id'], entity: EntityType): Promise<EntityType>;
  deleteById(id: EntityType['id']): Promise<void>;
}
