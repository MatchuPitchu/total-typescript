import { Equal, Expect } from '../../helpers/type-utils';

const obj = {
  a: 1,
  b: 2,
  c: 3,
} as const;

type ObjKey = keyof typeof obj;

/**
 * Handling Default Arguments with Function Overloads
 *
 * Original function:
 * const getObjKey = <TKey extends ObjKey>(key: TKey = "a") => obj[key];
 *
 * Error explanation: The function results in an error because getObjectValue can be called with a variety of different inputs.
 * It could be called with "a", "b", or "c", but it could also be called with a union type of those members,
 * such as "a" | "b", or "b" | "c".
 *
 * Defaulting it to "a" does not give TypeScript enough information to infer the correct type. Therefore, it
 * does not make the connection that if nothing is passed, it should grab "a" in the obj.
 */
function getObjValue(): (typeof obj)['a'];
function getObjValue<TKey extends ObjKey>(key: TKey): (typeof obj)[TKey];
function getObjValue(key: ObjKey = 'a') {
  return obj[key];
}

const one = getObjValue('a');
const oneByDefault = getObjValue();
const two = getObjValue('b');
const three = getObjValue('c');

type tests = [
  Expect<Equal<typeof one, 1>>,
  Expect<Equal<typeof oneByDefault, 1>>,
  Expect<Equal<typeof two, 2>>,
  Expect<Equal<typeof three, 3>>,
];
