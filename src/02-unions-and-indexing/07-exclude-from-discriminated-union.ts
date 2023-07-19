import { Equal, Expect } from '../helpers/type-utils';

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
 * Exclude utility type (reverse of Extract): Exclude<UnionType, ExcludedMembers>
 * Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.
 * type Exclude<T, U> = T extends U ? never : T;
 */
type NonKeyDownEvents = Exclude<Event, { type: 'keydown' }>;

type tests = [
  Expect<Equal<NonKeyDownEvents, { type: 'click'; event: MouseEvent } | { type: 'focus'; event: FocusEvent }>>,
];
