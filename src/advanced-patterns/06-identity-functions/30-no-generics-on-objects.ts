/**
 * fetchers is an object where you can optionally
 * pass keys that match the route names.
 *
 * BUT - how do we prevent the user from passing
 * fetchers that don't exist in the routes array?
 *
 * We'll need to change this to a function which takes
 * in the config as an argument.
 *
 * Desired API:
 *
 * const config = makeConfigObj(config);
 */
type Config<TRoute extends string> = {
  routes: TRoute[];
  fetchers: Record<TRoute, (...args: any[]) => void>;
};

/**
 * The solution is to use an identity function containing
 * a generic, which will capture the names of the routes and
 * allow the user to specify the fetchers.
 *
 * Identity functions are great for sorting out configuration
 * like this, and are removed by most minifiers so you don't
 * have to worry about bundle size even though it looks like
 * you're adding extra wrappers.
 */
const makeConfigObj = <TRoute extends string>(config: Config<TRoute>) => config;

export const configObj = makeConfigObj({
  routes: ['/', '/about', '/contact'],
  fetchers: {
    // @ts-expect-error
    '/does-not-exist': () => {
      return {};
    },
  },
});
