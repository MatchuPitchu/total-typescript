import { Equal, Expect } from '../../helpers/type-utils';

const fruits = ['apple', 'banana', 'orange'] as const;

type Fruits = typeof fruits;

// to access into the array using an indexed access type with 0 | 1:
type AppleOrBanana = Fruits[0 | 1];
// number acts as any possible number, so we get the union of all of the elements in the array
type Fruit = Fruits[number];

type tests = [
  Expect<Equal<AppleOrBanana, 'apple' | 'banana'>>,
  Expect<Equal<Fruit, 'apple' | 'banana' | 'orange'>>,
];
