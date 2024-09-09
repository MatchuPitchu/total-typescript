import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

const isDefined = <T>(value: T): value is NonNullable<T> => {
  return typeof value !== undefined && value !== null;
};

const isDefinedValue = isDefined(undefined);
//     ^?

export const values = ['a', 'b', undefined, 'c', undefined];

/**
 * Solution 1: use as assertion
 * const filteredValues = values.filter((value) => Boolean(value)) as string[];
 *
 * Solution 2: use a type predicate to filter types
 * - type predicate has to be a boolean (-> here `Boolean(value)`)
 * - if type predicate is true, then `value` is of type string, otherwise it's not
 * - could not write `value is number` because value arg in fn is of type `string | undefined`, must match this type
 */
const filteredValues = values.filter((value): value is string =>
  Boolean(value)
);

it('Should filter out the undefined values', () => {
  expect(filteredValues).toEqual(['a', 'b', 'c']);
});

it('Should be of type "string[]"', () => {
  type test1 = Expect<Equal<typeof filteredValues, string[]>>;
});
