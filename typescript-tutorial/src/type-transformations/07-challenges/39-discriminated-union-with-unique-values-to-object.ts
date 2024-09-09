import { Equal, Expect } from '../../helpers/type-utils';

type Route =
  | {
      route: '/';
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: '/about' }
  | { route: '/admin' }
  | { route: '/admin/users' };

/**
 * Create an Object using Mapped Types, Conditional Types, and TypeScript Keywords
 *
 * 1) R in Route -> Take every single object member of the Route union
 * 2) as R['route'] -> access only the value of the route key in the current single object member of the Route union
 * 3) R extends { search: infer S } ? S : never -> if search key exists, then infer the value, otherwise return never
 * Following this pattern to do checks is great in situations where you want to extract things that you aren't sure
 * are present in all members of the union.
 */
type RoutesObject = {
  [R in Route as R['route']]: R extends { search: infer S } ? S : never;
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        '/': {
          page: string;
          perPage: string;
        };
        '/about': never;
        '/admin': never;
        '/admin/users': never;
      }
    >
  >,
];
