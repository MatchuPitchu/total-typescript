import { Equal, Expect } from '../helpers/type-utils';

/**
 * The infer in T extends { data: infer TData } says "Whatever is passed in to the data key, infer its type".
 * Then, the infer declares TData for the true branch. If we try and access TData in the 'false' branch,
 * we won't be able to. In other words, the TData variable is only defined for one branch.
 */
type GetDataValue<T> = T extends Record<'data', infer TData> ? TData : never;

type tests = [
  Expect<Equal<GetDataValue<{ data: 'hello' }>, 'hello'>>,
  Expect<Equal<GetDataValue<{ data: { name: 'hello' } }>, { name: 'hello' }>>,
  Expect<
    Equal<
      GetDataValue<{ data: { name: 'hello'; age: 20 } }>,
      { name: 'hello'; age: 20 }
    >
  >,
  // Expect that if you pass in string, it
  // should return never
  Expect<Equal<GetDataValue<string>, never>>,
];
