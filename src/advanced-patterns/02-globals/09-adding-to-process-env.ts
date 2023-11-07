import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Autocomplete for env variables: Typing process.env in the NodeJS Namespace
 *
 * hovering over `process`
 * `process.env.MY_SOLUTION_ENV_VAR = "Hello, world!";`
 *
 * shows `(property) NodeJS.Process.env: NodeJS.ProcessEnv`
 *
 * It's imported and added to the global context by via `@types/node` in the package.json devDependencies:
 *
 * namespace: Everything inside a namespace sits in the global scope, but here under the NodeJS namespace.
 * This allows multiple libraries to exist without conflicting with each other, even if they have the same declarations.
 *
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MY_ENV_VAR: string;
    }
  }
}

process.env.MY_ENV_VAR = 'Hello, world!';

it('Should be declared as a string', () => {
  expect(process.env.MY_ENV_VAR).toEqual('Hello, world!');
});

it('Should NOT have undefined in the type', () => {
  const myVar = process.env.MY_ENV_VAR;
  type tests = [Expect<Equal<typeof myVar, string>>];
});
