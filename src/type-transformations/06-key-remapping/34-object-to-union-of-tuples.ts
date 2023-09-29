import { Equal, Expect } from '../../helpers/type-utils';

interface Values {
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Create a Union of Tuples by Reindexing a Mapped Type
 *
 * In order to create a union of tuples, we need to extract the values of the object that is currently being created:
 * {
 *   email: ["email", string]
 *   firstName: ["firstName", string]
 *   lastName: ["lastName", string]
 * }
 *
 * The solution is to re-index the type we started with by appending [keyof Values] to the end of it.
 */
type ValuesAsUnionOfTuples = {
  [K in keyof Values]: [K, Values[K]];
}[keyof Values];

type A = ValuesAsUnionOfTuples;

type tests = [
  Expect<
    Equal<
      ValuesAsUnionOfTuples,
      ['email', string] | ['firstName', string] | ['lastName', string]
    >
  >,
];
