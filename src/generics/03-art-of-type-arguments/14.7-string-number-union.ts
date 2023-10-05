import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Accepting Multiple Literal Types
 *
 * Adding T extends string | number, will stop anything else from being passed in,
 * while getting us inference on the strings and numbers that are passed in
 */
export const inferItemLiteral = <T extends string | number>(t: T) => {
  return {
    output: t,
  };
};

const result1 = inferItemLiteral('a');
const result2 = inferItemLiteral(123);

type tests = [
  Expect<Equal<typeof result1, { output: 'a' }>>,
  Expect<Equal<typeof result2, { output: 123 }>>,
];

// @ts-expect-error
const error1 = inferItemLiteral({
  a: 1,
});

// @ts-expect-error
const error2 = inferItemLiteral([1, 2]);
