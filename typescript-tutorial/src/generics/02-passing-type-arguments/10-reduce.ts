import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

const array = [
  {
    name: 'John',
  },
  {
    name: 'Steve',
  },
];

/**
 * Type Signature for reduce: There are three definitions, which are called function overloads.
 * Because we want to create a different object out of the members of our original array, TypeScript will end up using the third definition of reduce:
 * reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U, initialValue: U): U;
 */
const obj = array.reduce<Record<string, { name: string }>>((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {});

// Version 2
const obj2 = array.reduce((accum: Record<string, { name: string }>, item) => {
  accum[item.name] = item;
  return accum;
}, {});

// Version 3
const obj3 = array.reduce(
  (accum, item) => {
    accum[item.name] = item;
    return accum;
  },
  {} as Record<string, { name: string }>
);

it('Should resolve to an object where name is the key', () => {
  expect(obj).toEqual({
    John: {
      name: 'John',
    },
    Steve: {
      name: 'Steve',
    },
  });

  type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>];
});
