import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Understanding Generics at Different Levels of Functions
 *
 * The right place to define TTransformed is directly on the clone function.
 * So TTransformed is infered when clone fn is called.
 *
 * Notice: When you're inside of an interface or type, you can add a function that has a generic on it.
 * This is a useful pattern for doing any sort of transformation.
 * It also forms the basis for the Builder Pattern that we will see in future exercises.
 */
export interface Cache<T> {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
  // short solution
  clone: <TTransformed>(
    transform: (elem: T) => TTransformed
  ) => Cache<TTransformed>;
  // longer solution
  // clone: <TFunc extends (elem: T) => ReturnType<TFunc>>(
  //   transform: TFunc
  // ) => Cache<ReturnType<TFunc>>;
}

const createCache = <T>(initialCache?: Record<string, T>): Cache<T> => {
  const cache: Record<string, T> = initialCache || {};

  return {
    get: (key) => cache[key],
    set: (key, value) => {
      cache[key] = value;
    },
    clone: (transform) => {
      const newCache: Record<string, any> = {};

      for (const key in cache) {
        newCache[key] = transform(cache[key]);
      }
      return createCache(newCache);
    },
  };
};

it('Should let you get and set to/from the cache', () => {
  const cache = createCache<number>();

  cache.set('a', 1);
  cache.set('b', 2);

  expect(cache.get('a')).toEqual(1);
  expect(cache.get('b')).toEqual(2);
});

it('Should let you clone the cache using a transform function', () => {
  const numberCache = createCache<number>();

  numberCache.set('a', 1);
  numberCache.set('b', 2);

  const stringCache = numberCache.clone((elem) => {
    return String(elem);
  });

  const a = stringCache.get('a');

  expect(a).toEqual('1');

  type tests = [Expect<Equal<typeof a, string | undefined>>];
});
