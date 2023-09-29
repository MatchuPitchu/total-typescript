import { Equal, Expect } from '../helpers/type-utils';

interface Attributes {
  id: string;
  email: string;
  username: string;
}

/**
 * Create a Discriminated Union through Intermediary Transformations
 *
 * 1) K is a union of all keys in the Attributes type
 * 2) For each member of the K union, I create an Object (e.g. with the Record utility type) -> so I have a new union of 3 objects
 * 3) Mapping over the intermediary type with [keyof T] to extract the wished target type
 */
type MutuallyExclusive<T> = {
  [K in keyof T]: Record<K, T[K]>;
}[keyof T];

// OR without Record utility type
type MutuallyExclusive2<T> = {
  [K in keyof T]: {
    [Property in K]: T[Property];
  };
}[keyof T];

type ExclusiveAttributes = MutuallyExclusive<Attributes>;

type tests = [
  Expect<
    Equal<
      ExclusiveAttributes,
      | {
          id: string;
        }
      | {
          email: string;
        }
      | {
          username: string;
        }
    >
  >,
];
