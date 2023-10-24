import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Modify a Generic Type Default for Improved Error Messages
 *
 * This means that if you are sure that there will always has
 * a data attribute or a data: any, then this solution won't work.
 * But, if you find yourself wanting to pass in a type argument and
 * the result is unconstrained, then this is a neat solution.
 */
const fetchData = async <
  TResult = 'You must pass a type argument to fetchData',
>(
  url: string
): Promise<TResult> => {
  const data = await fetch(url).then((response) => response.json());
  return data;
};

it('Should fetch data from an API', async () => {
  const data = await fetchData<{ name: string }>(
    'https://swapi.dev/api/people/1'
  );
  expect(data.name).toEqual('Luke Skywalker');

  type tests = [Expect<Equal<typeof data, { name: string }>>];
});

it('Should force you to add a type annotation with a helpful error message', async () => {
  const data = await fetchData('https://swapi.dev/api/people/1');

  type tests = [
    Expect<Equal<typeof data, 'You must pass a type argument to fetchData'>>,
  ];
});
