import { Equal, Expect } from '../helpers/type-utils';

/**
 * Use Recursion and Mapped Types to Create a Type Helper
 * We can recursively reference DeepPartial inside of itself.
 *
 * 1) { [K in keyof T]?: DeepPartial<T[K]> } -> creates the deep nested object again, but every key becomes optional
 * 2) T extends Array<infer U> ? Array<DeepPartial<U>> -> handles the case when T is an array
 */
type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : { [K in keyof T]?: DeepPartial<T[K]> };

type MyType = {
  a: string;
  b: number;
  c: {
    d: string;
    e: {
      f: string;
      g: {
        h: string;
        i: string;
      }[];
    };
  };
};

type Result = DeepPartial<MyType>;

type tests = [
  Expect<
    Equal<
      Result,
      {
        a?: string;
        b?: number;
        c?: {
          d?: string;
          e?: {
            f?: string;
            g?: {
              h?: string;
              i?: string;
            }[];
          };
        };
      }
    >
  >,
];
