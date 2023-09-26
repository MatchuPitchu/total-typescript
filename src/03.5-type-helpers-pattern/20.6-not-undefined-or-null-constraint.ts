/**
 * The empty object value has a specific use in TypeScript, and will represent anything that is not null or undefined.
 * TypeScript makes structural comparisons when it checks if things are assignable to each other, and the empty object says that the contract has been met.
 */
export type Maybe<T extends {}> = T | null | undefined;

type tests = [
  // @ts-expect-error
  Maybe<null>,
  // @ts-expect-error
  Maybe<undefined>,

  Maybe<string>,
  Maybe<false>,
  Maybe<0>,
  Maybe<''>,
];
