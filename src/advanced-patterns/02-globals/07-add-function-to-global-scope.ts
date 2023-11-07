import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Declare functions and variables to the global scope
 * ! Globals are generally considered bad. They should be avoided if possible.
 *
 * 1. declare global will be needed:
 * declare global {}
 *
 * 2. myFunc will need to be added to the global scope using 'function':
 * function myFunc(): boolean
 *
 * 3. myVar will need to be added to the global scope using 'var':
 * var myVar: number
 *
 * In addition to being able to declare our own globals, this is also configurable
 * from tsconfig.json inside of the `lib` config option. This allows specifying global
 * libraries that get bundled into the global scope. By default, it includes the `DOM`.
 * However, if `DOM` is not included, certain things will not be allowed. For example,
 * document will not be in scope. To include `DOM`, change the lib compiler option in tsconfig.json:
 *
 * @see https://www.typescriptlang.org/tsconfig#lib
 */
declare global {
  function myFunc(): boolean;
  var myVar: number;

  interface Whatever {
    foo: string;
  }
}

globalThis.myFunc = () => true;
globalThis.myVar = 1;

const a: Whatever = { foo: 'bar' };

it('Should let you call myFunc without it being imported', () => {
  expect(myFunc()).toBe(true);
  type test1 = Expect<Equal<typeof myFunc, () => boolean>>;
});

it('Should let you access myVar without it being imported', () => {
  expect(myVar).toBe(1);
  type test1 = Expect<Equal<typeof myVar, number>>;
});
