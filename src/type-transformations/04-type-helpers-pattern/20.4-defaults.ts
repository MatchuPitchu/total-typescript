import { Equal, Expect } from '../../helpers/type-utils';

type MaybeError = Error | undefined;

/**
 * Updating CreateDataShape to have TError = undefined tells TypeScript that the second argument doesn't need to be passed in:
 */
type CreateDataShape<TData, TError extends MaybeError = undefined> = {
  data: TData;
  error: TError;
};

type tests = [
  Expect<
    Equal<
      CreateDataShape<string>,
      {
        data: string;
        error: undefined;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<boolean, SyntaxError>,
      {
        data: boolean;
        error: SyntaxError;
      }
    >
  >,
];
