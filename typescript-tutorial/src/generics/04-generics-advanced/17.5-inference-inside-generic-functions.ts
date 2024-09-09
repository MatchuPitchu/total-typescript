import { Equal, Expect } from '../../helpers/type-utils';

type Person = {
  name: string;
  age: number;
  birthdate: Date;
};

/**
 * Fixing the "Not Assignable" Error
 *
 * Having a return type of Person[Key] tells us the function that it can be called with any key, or a union of some of the keys.
 * For example, means that we can pass either number or Date into remapPerson, but TypeScript can't narrow the return type inside
 * of a generic function. The return types will be resolved as never.
 * To get around these strange errors when narrowing inside of generic functions, you need to put an `as` on the return type.
 * In this case, the return type should be matched to Person[Key]
 */
export const remapPerson = <Key extends keyof Person>(
  key: Key,
  value: Person[Key]
) => {
  if (key === 'birthdate') {
    return new Date() as Person[Key];
  }

  return value;
};

const date = remapPerson('birthdate', new Date());
const num = remapPerson('age', 42);
const name = remapPerson('name', 'John Doe');

type tests = [
  Expect<Equal<typeof date, Date>>,
  Expect<Equal<typeof num, number>>,
  Expect<Equal<typeof name, string>>,
];
