import { Equal, Expect } from '../helpers/type-utils';

/**
 * There's no limit to how many conditional types you can stack.
 * In fact, a lot of the complicated libraries use these huge stacks of
 * conditional types that are ugly to look at but drive a lot of the complex logic.
 * The pattern of returning never allows our conditional types to specify their
 * "else" logic without having to worry too much about what it is. If you try to use
 * something that's been typed as never you will get an error.
 */
type YouSayGoodbyeAndISayHello<T> = T extends 'hello' | 'goodbye'
  ? T extends 'hello'
    ? 'goodbye'
    : 'hello'
  : never;

type tests = [
  Expect<Equal<YouSayGoodbyeAndISayHello<'hello'>, 'goodbye'>>,
  Expect<Equal<YouSayGoodbyeAndISayHello<'goodbye'>, 'hello'>>,
  Expect<Equal<YouSayGoodbyeAndISayHello<'alright pal'>, never>>,
  Expect<Equal<YouSayGoodbyeAndISayHello<1>, never>>,
];
