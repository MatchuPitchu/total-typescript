import { Equal, Expect } from '../helpers/type-utils';

const parser1 = {
  parse: () => 1,
};

const parser2 = () => '123';

const parser3 = {
  extract: () => true,
};

/**
 * We can say that T extends either an object with parse, an object with extract,
 * or a function. Each of these branches has its own infer TResult.
 */
type GetParserResult<T> = T extends
  | {
      parse: () => infer TResult;
    }
  | {
      extract: () => infer TResult;
    }
  | (() => infer TResult)
  ? TResult
  : never;

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>,
];
