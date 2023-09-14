import { Equal, Expect } from '../helpers/type-utils';

type BreadType = 'rye' | 'brown' | 'white';

type Filling = 'cheese' | 'ham' | 'salami';

// The challenge was to create a union where its members are strings containing all possible permutations of two other unions.
// In order to do this, all we need to do is create a template literal and pass in all of the elements as their union types:
type Sandwich = `${BreadType} sandwich with ${Filling}`;
type Greetings = `${'hello' | 'hi'} ${'Matt' | 'Matchu'}`;

type tests = [
  Expect<
    Equal<
      Sandwich,
      | 'rye sandwich with cheese'
      | 'rye sandwich with ham'
      | 'rye sandwich with salami'
      | 'brown sandwich with cheese'
      | 'brown sandwich with ham'
      | 'brown sandwich with salami'
      | 'white sandwich with cheese'
      | 'white sandwich with ham'
      | 'white sandwich with salami'
    >
  >,
];
