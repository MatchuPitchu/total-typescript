import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Typing Object Keys
 *
 * Solution 1: represent the generic as the entire object in the generic slot.
 */
const typedObjectKeys = <TObj extends object>(obj: TObj) => {
  return Object.keys(obj) as (keyof TObj)[];
};

// Solution 2: have the generic only represent the keys
const typedObjectKeys2 = <TKey extends string>(obj: Record<TKey, any>) => {
  return Object.keys(obj) as TKey[];
};

it('Should return the keys of the object', () => {
  const result1 = typedObjectKeys({
    a: 1,
    b: 2,
  });

  expect(result1).toEqual(['a', 'b']);

  type test = Expect<Equal<typeof result1, Array<'a' | 'b'>>>;
});
