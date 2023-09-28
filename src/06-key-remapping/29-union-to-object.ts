import { Equal, Expect } from '../helpers/type-utils';

type Route = '/' | '/about' | '/admin' | '/admin/users';

/**
 * The [R in Route] part looks similar to an index, but it isn't.
 * Instead, it's saying to map over the Route union extract each member
 * into a private variable called R and make it the property's value.
 */
type RoutesObject = {
  // for each member in the union type, extract the value (=R)
  [R in Route]: R;
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        '/': '/';
        '/about': '/about';
        '/admin': '/admin';
        '/admin/users': '/admin/users';
      }
    >
  >,
];
