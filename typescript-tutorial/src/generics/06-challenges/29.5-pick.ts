import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Extracting Object Properties with Reduce and Generics
 */
const pick = <TObj extends object, TPickedKey extends keyof TObj>(
  obj: TObj,
  picked: TPickedKey[]
) => {
  return picked.reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },
    {} as Pick<TObj, TPickedKey>
    // OR
    // {} as Record<TPickedKey, TObj[TPickedKey]>
  );
};

it('Should pick the keys from the object', () => {
  const result = pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    ['a', 'b']
  );

  expect(result).toEqual({ a: 1, b: 2 });

  type test = Expect<Equal<typeof result, { a: number; b: number }>>;
});

it('Should not allow you to pass keys which do not exist in the object', () => {
  pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    [
      'a',
      'b',
      // @ts-expect-error
      'd',
    ]
  );
});
