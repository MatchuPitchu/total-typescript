import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Using Overloads and Generics to Type Function Composition
 *
 * The reason this needs function overloads is that we need to capture
 * different numbers of generics based on what the user passes in.
 */
export function compose<T1, T2>(func: (t1: T1) => T2): (t1: T1) => T2;
export function compose<T1, T2, T3>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3
): (t1: T1) => T3;
export function compose<T1, T2, T3, T4>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3,
  func3: (t3: T3) => T4
): (t1: T1) => T4;
export function compose<T1, T2, T3, T4, T5>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3,
  func3: (t2: T3) => T4,
  func4: (t2: T4) => T5
): (t1: T1) => T5;
// ... you could add more overloads to cover more function arguments
export function compose(...funcs: Array<(input: any) => any>) {
  return (input: any) => {
    return funcs.reduce((acc, fn) => fn(acc), input);
  };
}

/**
 * Hover over compose to see the actual generic arguments
 */
const exampleWithTwoFuncs = compose(
  (num: number) => {
    return 'abc';
  },
  (t2) => {
    return parseInt(t2);
  }
);

const addOne = (num: number) => {
  return num + 1;
};

const addTwoAndStringify = compose(addOne, addOne, String);

it('Should compose multiple functions together', () => {
  const result = addTwoAndStringify(4);

  expect(result).toEqual('6');

  type tests = [Expect<Equal<typeof result, string>>];
});

it('Should error when the input to a function is not typed correctly', () => {
  const stringifyThenAddOne = compose(
    // addOne takes in a number - so it shouldn't be allowed after
    // a function that returns a string!
    // @ts-expect-error
    String,
    addOne
  );
});
