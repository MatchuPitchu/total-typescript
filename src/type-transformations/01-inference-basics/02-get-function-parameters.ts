import { Equal, Expect } from '../../helpers/type-utils';

const makeQuery = (
  url: string,
  opts?: {
    method?: string;
    headers?: {
      [key: string]: string;
    };
    body?: string;
  }
) => {};

/**
 * Parameters utility type
 * type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
 */
type MakeQueryParameters = Parameters<typeof makeQuery>;
type MakeQueryParametersSecondArg = MakeQueryParameters[1];

type tests = [
  Expect<
    Equal<
      MakeQueryParameters,
      [
        url: string,
        opts?: {
          method?: string;
          headers?: {
            [key: string]: string;
          };
          body?: string;
        },
      ]
    >
  >,
];
