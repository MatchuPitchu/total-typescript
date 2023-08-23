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

// Access a key on a union type, you are accessing all parts of a discriminated union
type EventType = Event['type'];

type tests = [Expect<Equal<EventType, 'click' | 'focus' | 'keydown'>>];
