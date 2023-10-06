import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Ensure Runtime Level & Type Level Safety with Conditional Types
 *
 * Without () as any: Error: Type '"hello" | "goodbye"' is not assignable to type 'TGreeting extends "hello" ? "goodbye" : "hello"'.
 * It's the only way we can tell TypeScript that we know better in this situation.
 *
 * TypeScript isn't clever enough on its own to map a conditional type in the return of a function.
 */
const youSayGoodbyeISayHello = <TGreeting extends 'goodbye' | 'hello'>(
  greeting: TGreeting
): TGreeting extends 'goodbye' ? 'hello' : 'goodbye' => {
  return (greeting === 'goodbye' ? 'hello' : 'goodbye') as any;
};

type GreetingResult<TGreeting> = TGreeting extends 'hello'
  ? 'goodbye'
  : 'hello';

const youSayGoodbyeISayHello2 = <TGreeting extends 'goodbye' | 'hello'>(
  greeting: TGreeting
) => {
  return (
    greeting === 'goodbye' ? 'hello' : 'goodbye'
  ) as GreetingResult<TGreeting>;
};

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
