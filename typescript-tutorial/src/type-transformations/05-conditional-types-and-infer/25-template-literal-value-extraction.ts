import { Equal, Expect } from '../../helpers/type-utils';
import { S } from 'ts-toolbelt';

type Names = [
  'Matt Pocock',
  'Jimi Hendrix',
  'Eric Clapton',
  'John Mayer',
  'BB King',
];

/**
 * Here, we use the conditional check to check that T is a string with two
 * strings with a space between, then infer the strings in those slots.
 */
type GetSurname<T> = T extends `${string} ${infer Last}` ? Last : never;

/**
 * This is an alternative way of doing it, using S.Split
 */
type GetSurname1<T extends string> = S.Split<T, ' '>[1];

type tests = [
  Expect<Equal<GetSurname<Names[0]>, 'Pocock'>>,
  Expect<Equal<GetSurname<Names[1]>, 'Hendrix'>>,
  Expect<Equal<GetSurname<Names[2]>, 'Clapton'>>,
  Expect<Equal<GetSurname<Names[3]>, 'Mayer'>>,
  Expect<Equal<GetSurname<Names[4]>, 'King'>>,
];
