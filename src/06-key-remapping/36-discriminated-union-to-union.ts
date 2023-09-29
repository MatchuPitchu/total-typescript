import { Equal, Expect } from '../helpers/type-utils';

type Fruit =
  | {
      name: 'apple';
      color: 'red';
    }
  | {
      name: 'banana';
      color: 'yellow';
    }
  | {
      name: 'orange';
      color: 'orange';
    };

/**
 * Iteratively Map and Remap to Transform Types
 *
 * This pattern of using iterators to create an object, remapping it to a different object,
 * and then iterating over its values is extremely powerful!
 */
type TransformedFruit = {
  [F in Fruit as F['name']]: `${F['name']}:${F['color']}`;
}[Fruit['name']];

type tests = [
  Expect<
    Equal<TransformedFruit, 'apple:red' | 'banana:yellow' | 'orange:orange'>
  >,
];
