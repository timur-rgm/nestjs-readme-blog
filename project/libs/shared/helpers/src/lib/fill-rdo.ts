import { plainToInstance, type ClassTransformOptions } from 'class-transformer';

export function fillRdo<Rdo, PlainData extends object[]>(
  rdoClass: new () => Rdo,
  plainData: PlainData,
  options?: ClassTransformOptions,
): Rdo[];
export function fillRdo<Rdo, PlainData extends object>(
  rdoClass: new () => Rdo,
  plainData: PlainData,
  options?: ClassTransformOptions,
): Rdo;
export function fillRdo<Rdo, PlainData extends object | object[]>(
  rdoClass: new () => Rdo,
  plainData: PlainData,
  options?: ClassTransformOptions,
): Rdo | Rdo[] {
  return plainToInstance(rdoClass, plainData, {
    excludeExtraneousValues: true,
    ...options,
  });
}
