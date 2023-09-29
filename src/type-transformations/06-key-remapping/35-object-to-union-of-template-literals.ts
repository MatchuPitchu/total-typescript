import { Equal, Expect } from '../../helpers/type-utils';

interface FruitMap {
  apple: 'red';
  banana: 'yellow';
  orange: 'orange';
}

/**
 * Map an Object to a Union of Template Literals
 *
 * First we need to combine the keys and values of the type object:
 * {
 *  apple: "apple:red"
 *  banana: "banana:yellow"
 *  orange: "orange:orange"
 * }
 *
 * The solution is to re-index the type we started with by appending [keyof FruitMap] to the end of it.
 */
type TransformedFruit = {
  [Fruit in keyof FruitMap]: `${Fruit}:${FruitMap[Fruit]}`;
}[keyof FruitMap];

type tests = [
  Expect<
    Equal<TransformedFruit, 'apple:red' | 'banana:yellow' | 'orange:orange'>
  >,
];
