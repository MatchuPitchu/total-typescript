import { Equal, Expect } from '../../helpers/type-utils';

type Route =
  | {
      route: '/';
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: '/about'; search: {} }
  | { route: '/admin'; search: {} }
  | { route: '/admin/users'; search: {} };

/**
 * Solution 1: Using as
 * A cleaner solution is to iterate over Route itself, and remap the keys using the as clause.
 * As seen in the previous exercise, this means that we have access to the entire route object instead of only the route property.
 * This means we can use indexed access to get the search property directly off of R without needing to do any kind of extraction!
 *
 * Notice: Here, R represents the individual Route. The lesson here
 * is that the thing we're iterating DOESN'T have to be a
 * string | number | symbol, as long as the thing we cast it to is.
 */
type RoutesObject2 = {
  [R in Route as R['route']]: R['search'];
};

/**
 * The Extract utility type lets you extract some members of a union type.
 */
type Extracted<R> = Extract<Route, { route: R }>;
type ExampleExtracted = Extracted<'/'>;

/**
 * Solution 2: Creating a Union
 * One way to solve this problem is based on creating a union of all of the possible route values, which is the discriminator.
 * We then use Extract to get out only the route that matches the current R value.
 * Finally, we use an indexed access type to get the search property off of the matching object:
 */
type RoutesObject = {
  [R in Route['route']]: Extracted<R>['search'];
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
        '/about': {};
        '/admin': {};
        '/admin/users': {};
      }
    >
  >,
];
