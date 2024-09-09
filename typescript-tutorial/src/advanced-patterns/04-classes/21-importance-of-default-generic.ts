import { expect, it } from 'vitest';

/**
 * I've made a small change to the solution of the previous problem
 * which breaks it. Can you spot what it is?
 *
 * Clue: it's somewhere inside class TypeSafeStringMap, and it's
 * on the type level - not the runtime level.
 *
 * Solution: Default Generics in the Builder Pattern
 * The default generic "= {}" is important, otherwise in the set method
 * Record<string, string> & Record<K, string> would be resolved to Record<string, string>.
 * With default {} `keyof {} | keyof { matt: string } resolves to string literal type
 */
class TypeSafeStringMap<TMap extends Record<string, string> = {}> {
  private map: TMap;
  constructor() {
    this.map = {} as TMap;
  }

  get(key: keyof TMap): string {
    return this.map[key];
  }

  set<K extends string>(key: K, value: string): TypeSafeStringMap<TMap & Record<K, string>> {
    (this.map[key] as any) = value;

    return this;
  }
}

const map = new TypeSafeStringMap().set('matt', 'pocock').set('jools', 'holland').set('brandi', 'carlile');

it('Should not allow getting values which do not exist', () => {
  map.get(
    // @ts-expect-error
    'jim'
  );
});

it('Should return values from keys which do exist', () => {
  expect(map.get('matt')).toBe('pocock');
  expect(map.get('jools')).toBe('holland');
  expect(map.get('brandi')).toBe('carlile');
});
