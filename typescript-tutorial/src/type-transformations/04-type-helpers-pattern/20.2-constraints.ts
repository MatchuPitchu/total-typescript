import { Equal, Expect } from '../../helpers/type-utils';
/**
 * The solution is to update AddRoutePrefix so we can only pass in a string.
 * To do this, we'll add extends string to the type helper to tell it that TRoute must be a string:
 */
type AddRoutePrefix<TRoute extends string> = `/${TRoute}`;

type tests = [
  Expect<Equal<AddRoutePrefix<''>, '/'>>,
  Expect<Equal<AddRoutePrefix<'about'>, '/about'>>,
  Expect<Equal<AddRoutePrefix<'about/team'>, '/about/team'>>,
  Expect<Equal<AddRoutePrefix<'blog'>, '/blog'>>,
  // @ts-expect-error
  AddRoutePrefix<boolean>,
  // @ts-expect-error
  AddRoutePrefix<number>,
];
