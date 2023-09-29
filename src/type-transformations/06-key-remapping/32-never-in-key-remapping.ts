import { Equal, Expect } from '../../helpers/type-utils';

interface Example {
  name: string;
  age: number;
  id: string;
  organisationId: string;
  groupId: string;
}

/**
 * In order to keep things clean, we’ll create a helper type called SearchForId that
 * will use a string template to look for "id" or "Id" that is surrounded by strings of any length:
 */
type SearchForId = `${string}${'id' | 'Id'}${string}`;

/**
 * Selective Remapping with Conditional Types and Template Literals
 * Now we can use a conditional type inside of the mapped type.
 * For every key of the object, we’ll check if it extends SearchById. If it does, it will be included. Otherwise, the never type will be used.
 * By using never as the else case, any keys that don’t extend SearchById will not be included in the OnlyIdKeys object:
 */
type OnlyIdKeys<T> = {
  [K in keyof T as K extends SearchForId ? K : never]: T[K];
};

type A = OnlyIdKeys<Example>;

type tests = [
  Expect<
    Equal<
      OnlyIdKeys<Example>,
      {
        id: string;
        organisationId: string;
        groupId: string;
      }
    >
  >,
  Expect<Equal<OnlyIdKeys<{}>, {}>>,
];
