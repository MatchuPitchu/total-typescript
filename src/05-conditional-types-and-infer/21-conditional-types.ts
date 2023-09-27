import { Equal, Expect } from '../helpers/type-utils';

/**
 * Conditional types are immensely powerful, and are where TypeScript becomes less about
 * "annotations you add to your JS" and more like its own meta programming language itself.
 */
type YouSayGoodbyeAndISayHello<T extends string> = T extends 'hello' ? 'goodbye' : 'hello';

type tests = [
  Expect<Equal<YouSayGoodbyeAndISayHello<'hello'>, 'goodbye'>>,
  Expect<Equal<YouSayGoodbyeAndISayHello<'goodbye'>, 'hello'>>,
];
