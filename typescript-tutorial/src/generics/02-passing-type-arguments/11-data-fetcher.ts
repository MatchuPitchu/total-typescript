import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Use Generics to Type a Fetch Request
 */
const fetchData = async <TData>(url: string) => {
  const data: TData = await fetch(url).then((response) => response.json());
  // V2: works, but data becomes Awaited<TData>, no the same as the intended type TData
  const data2 = await fetch(url).then<TData>((response) => response.json());
  return data;
};

it('Should fetch data from an API', async () => {
  const data = await fetchData<{ name: string }>(
    'https://swapi.dev/api/people/1'
  );
  expect(data.name).toEqual('Luke Skywalker');

  type tests = [Expect<Equal<typeof data, { name: string }>>];
});
