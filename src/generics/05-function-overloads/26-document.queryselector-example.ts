import { Equal, Expect } from '../../helpers/type-utils';

/**
 * querySelector has several Interface Overloads inside
 * `interface ParentNode extends Node { }`
 *
 * When argument that is passed in is a valid HTML element,
 * then this will be infered correctly whitout a generic type argument.
 *
 * querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
 */
const divElement = document.querySelector('div');
const spanElement = document.querySelector('span');
const divElement2 = document.querySelector<HTMLDivElement>('div.foo');

type tests = [
  Expect<Equal<typeof divElement, HTMLDivElement | null>>,
  Expect<Equal<typeof spanElement, HTMLSpanElement | null>>,
  Expect<Equal<typeof divElement2, HTMLDivElement | null>>,
];
