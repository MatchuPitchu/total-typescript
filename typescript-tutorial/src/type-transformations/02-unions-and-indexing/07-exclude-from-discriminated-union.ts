import { Equal, Expect } from '../../helpers/type-utils';

export type Event =
  | {
      type: 'click';
      event: MouseEvent;
    }
  | {
      type: 'focus';
      event: FocusEvent;
    }
  | {
      type: 'keydown';
      event: KeyboardEvent;
    };

/**
 * Exclude utility type (reverse of Extract): Exclude<T, U>
 * Constructs a type by excluding from T those types that are assignable to U
 * type Exclude<T, U> = T extends U ? never : T;
 */
type NonKeyDownEvents = Exclude<Event, { type: 'keydown' }>;

type tests = [
  Expect<Equal<NonKeyDownEvents, { type: 'click'; event: MouseEvent } | { type: 'focus'; event: FocusEvent }>>,
];
