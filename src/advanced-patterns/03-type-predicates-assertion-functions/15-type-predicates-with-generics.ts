import { isBodyElement, isDivElement } from '../fake-external-lib';
import { it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

// Example with span
export const isSpanElement = (element: unknown): element is HTMLSpanElement => {
  return element instanceof HTMLSpanElement;
};

/**
 * Filtering with Type Predicates and Generics
 *
 * - isNode should be a type predicate function: needs return type `node is T`
 * - we can get inference from a type predicate.
 * - change `isDivElement` with `isSpanElement` to change the expected type for the transform function
 */
interface DOMNodeExtractorConfig<T, Result> {
  /**
   * Here, `node is T` lets you specify that
   * isNode takes in a type predicate.
   */
  isNode: (node: unknown) => node is T;
  transform: (node: T) => Result;
}

const createDOMNodeExtractor = <T, TResult>(
  config: DOMNodeExtractorConfig<T, TResult>
) => {
  return (nodes: unknown[]): TResult[] => {
    return nodes.filter(config.isNode).map(config.transform);
  };
};

it('Should pick up that "extractDivs" is of type "HTMLDivElement[]"', () => {
  const extractDivs = createDOMNodeExtractor({
    isNode: isDivElement,
    transform: (div) => {
      type test1 = Expect<Equal<typeof div, HTMLDivElement>>;
      return div.innerText;
    },
  });

  const divs = extractDivs([document.createElement('div')]);

  type test2 = Expect<Equal<typeof divs, string[]>>;
});

it('Should pick up that "extractBodies" is of type "HTMLBodyElement[]"', () => {
  const extractBodies = createDOMNodeExtractor({
    isNode: isBodyElement,
    transform: (body) => {
      type test1 = Expect<Equal<typeof body, HTMLBodyElement>>;

      return body.bgColor;
    },
  });

  const bodies = extractBodies([document.createElement('body')]);

  type test2 = Expect<Equal<typeof bodies, string[]>>;
});
