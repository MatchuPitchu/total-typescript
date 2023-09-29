import { Equal, Expect } from '../../helpers/type-utils';

type Fruit = 'apple' | 'banana' | 'orange';

// Failing Ausgangspunkt: Fruit remains 'apple' | 'banana' | 'orange' in this example
// type AppleOrBanana = Fruit extends 'apple' | 'banana' ? Fruit : never;

/**
 * The distributed conditional types problem can be solved by using a generic.
 * It works because when you pull a union into a generic like T, the members of the union distribute across it.
 * In other words, T will become each individual member of the union, and the conditional type will iterate over each one.
 */
type AppleOrBanana<T> = T extends 'apple' | 'banana' ? T : never;

// cumbersome solution without generic type, but with inference
type AppleOrBanana2 = Fruit extends infer T
  ? T extends 'apple' | 'banana'
    ? T
    : never
  : never;

type tests = [Expect<Equal<AppleOrBanana<Fruit>, 'apple' | 'banana'>>];
