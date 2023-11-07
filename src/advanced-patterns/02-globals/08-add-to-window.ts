import { expect, it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Add Functionality to Existing Global Interfaces
 *
 * Everything inside of a `*.d.ts` file is automatically put in the global ambient context.
 *
 * Hover over `window.something`: type is `var window: Window & typeof globalThis`
 * `Window` is an interface defined inside `lib.dom.d.ts`
 *
 * Interfaces with the same name in the same scoop get merged by TypeScript (= declaration merging).
 */
declare global {
  interface Window {
    makeGreeting(): string;
  }
}

window.makeGreeting = () => 'Hello, world!';

it('Should let you call makeGreeting from the window object', () => {
  expect(window.makeGreeting()).toBe('Hello, world!');

  type test1 = Expect<Equal<typeof window.makeGreeting, () => string>>;
});
