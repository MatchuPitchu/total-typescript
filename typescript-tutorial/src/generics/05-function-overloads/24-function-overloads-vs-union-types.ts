import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

type Func = () => string;
type FuncInObject = { run: Func };

/**
 * When to Use Overloads and Unions
 *
 * Solution 1: Function Overloads VS Solution 2: Using a Union
 * - When the return type does not change based on the parameters, avoid function overloads
 */
// function runGenerator(generator: Func): string;
// function runGenerator(generator: FuncInObject): string;
function runGenerator(generator: Func | FuncInObject): string {
  if (typeof generator === 'function') {
    return generator();
  }
  return generator.run();
}

it('Should accept an object where the generator is a function', () => {
  const result = runGenerator({
    run: () => 'hello',
  });

  expect(result).toBe('hello');

  type test1 = Expect<Equal<typeof result, string>>;
});

it('Should accept an object where the generator is a function', () => {
  const result = runGenerator(() => 'hello');

  expect(result).toBe('hello');

  type test1 = Expect<Equal<typeof result, string>>;
});
