import { Equal, Expect } from '../../helpers/type-utils';

export type Event =
  | {
      type: 'click';
      event: MouseEvent;
    }
  | {
      type: 'focus';
      event: FocusEvent;
      a: string;
    }
  | {
      type: 'keydown';
      event: KeyboardEvent;
      a: string;
    };

/**
 * Extract utility type: Extract<T, U>
 * Constructs a type by extracting from T those types that are assignable to U.
 *
 * type Extract<T, U> = T extends U ? T : never;
 */
type ClickEvent = Extract<Event, { type: 'click' }>;
type FocusAndKeyEvent = Extract<Event, { a: string }>;

type Fruit = 'apple' | 'orange' | 'banana';
type AppleAndOrange = Extract<Fruit, 'apple' | 'orange'>;

type tests = [Expect<Equal<ClickEvent, { type: 'click'; event: MouseEvent }>>];
