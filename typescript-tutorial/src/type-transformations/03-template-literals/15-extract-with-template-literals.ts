import { Equal, Expect } from '../../helpers/type-utils';

type Routes = '/users' | '/users/:id' | '/posts' | '/posts/:id';

// In order to extract strings with :id, use the Extract utility.
type DynamicRoutes = Extract<Routes, `${string}:${string}`>;

type tests = [Expect<Equal<DynamicRoutes, '/users/:id' | '/posts/:id'>>];
