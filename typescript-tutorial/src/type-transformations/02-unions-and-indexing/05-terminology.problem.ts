/**
 * Discriminated union types have common properties which are used to
 * differentiate between members of the union. In this case, `type`
 * is the discriminator.
 */
type A =
  | {
      type: 'a';
      a: string;
    }
  | {
      type: 'b';
      b: string;
    }
  | {
      type: 'c';
      c: string;
    };

const getUnion = (result: A) => {
  if (result.type === 'a') {
    return result.a;
  }
  // ...
};

// string literal union type
type B = 'a' | 'b' | 'c';

// enum
enum C {
  A = 'a',
  B = 'b',
  C = 'c',
}
