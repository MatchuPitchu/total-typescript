import { Equal, Expect } from '../../helpers/type-utils';

type Event = `log_in` | 'log_out' | 'sign_up';

/**
 * The Uppercase (like Lowercase, Capitalize) string manipulation type is built into TypeScript,
 * and in this case is applied to each member of the union that is being mapped over.
 */
type UppercaseEvent = Uppercase<Event>;
type ObjectOfKeys = Record<UppercaseEvent, string>;

type tests = [
  Expect<
    Equal<
      ObjectOfKeys,
      {
        LOG_IN: string;
        LOG_OUT: string;
        SIGN_UP: string;
      }
    >
  >,
];
