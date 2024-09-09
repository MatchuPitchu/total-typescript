import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Match Return Types with Function Overloads
 *
 * One of the most important things to know about function overloads is
 * that the implementation signatures of functions are not exposed outside of the function.
 *
 * Notice: Add return type to the implementation signature (the lowest version)
 * which matches the overloads to increase type safety when using function overloads
 */
function youSayGoodbyeISayHello(greeting: 'hello'): 'goodbye';
function youSayGoodbyeISayHello(greeting: 'goodbye'): 'hello';
function youSayGoodbyeISayHello(greeting: string): 'goodbye' | 'hello' {
  return greeting === 'goodbye' ? 'hello' : 'goodbye';
}

it('Should return goodbye when hello is passed in', () => {
  const result = youSayGoodbyeISayHello('hello');

  type test = [Expect<Equal<typeof result, 'goodbye'>>];

  expect(result).toEqual('goodbye');
});

it('Should return hello when goodbye is passed in', () => {
  const result = youSayGoodbyeISayHello('goodbye');

  type test = [Expect<Equal<typeof result, 'hello'>>];

  expect(result).toEqual('hello');
});
