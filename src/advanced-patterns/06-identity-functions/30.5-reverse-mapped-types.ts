import { Equal, Expect } from '../../helpers/type-utils';

type EventHandlers<T> = {
  [Key in keyof T]: (name: Key) => void;
};

/**
 * Inference Inception in an Identity Function
 * The reverse mapped type EventHandlers is used
 */
export const makeEventHandlers = <T>(obj: EventHandlers<T>) => obj;

const obj = makeEventHandlers({
  click: (name) => {
    console.log(name);

    type test = Expect<Equal<typeof name, 'click'>>;
  },
  focus: (name) => {
    console.log(name);

    type test = Expect<Equal<typeof name, 'focus'>>;
  },
});
