import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Refactoring Functions with Unnecessary Type Arguments
 *
 * Notice: remove useless generic arguments in functions.
 */
const returnBothOfWhatIPassIn = <TParams extends { a: unknown; b: unknown }>(
  params: TParams
): [TParams['a'], TParams['b']] => {
  return [params.a, params.b];
};

// const returnBothOfWhatIPassIn_ORIGINAL = <T1, T2>(params: {
//   a: T1;
//   b: T2;
// }): [T1, T2] => {
//   return [params.a, params.b];
// };

it('Should return a tuple of the properties a and b', () => {
  const result = returnBothOfWhatIPassIn({
    a: 'a',
    b: 1,
  });

  expect(result).toEqual(['a', 1]);

  type test1 = Expect<Equal<typeof result, [string, number]>>;
});
