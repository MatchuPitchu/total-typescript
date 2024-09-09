import { Equal, Expect } from '../../helpers/type-utils';

/**
 * The solution is to use the extends keyword to constrain T. In this case, we need T to be typed as a function with a return type.
 */
type GetParametersAndReturnType<T extends (...args: any[]) => ReturnType<T>> = {
  params: Parameters<T>;
  returnValue: ReturnType<T>;
};

type tests = [
  Expect<
    Equal<
      GetParametersAndReturnType<() => string>,
      { params: []; returnValue: string }
    >
  >,
  Expect<
    Equal<
      GetParametersAndReturnType<(s: string) => void>,
      { params: [string]; returnValue: void }
    >
  >,
  Expect<
    Equal<
      GetParametersAndReturnType<(n: number, b: boolean) => number>,
      { params: [number, boolean]; returnValue: number }
    >
  >,
];
