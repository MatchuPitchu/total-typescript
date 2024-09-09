import { it } from 'vitest';

interface Events {
  click: {
    x: number;
    y: number;
  };
  focus: undefined;
}
/**
 * Use a Tuple to Represent a Dynamic Number of Arguments
 *
 * If Events[TEventKey] extends undefined (if focus property is of value 'undefined'),
 * it should return an empty array. Otherwise, it will return a tuple with a member Events[TEventKey]:
 *
 * You can be dynamic with the typing: e.g. Events[TEventKey] extends undefined ? [] : [Events[TEventKey], string, number]
 *
 * Named Tuple: Adding payload to the Events[TEventKey] tuple tells TypeScript we want to call the result payload.
 */
export const sendEvent = <TEventKey extends keyof Events>(
  event: TEventKey,
  ...args: Events[TEventKey] extends undefined
    ? []
    : [payload: Events[TEventKey]]
) => {
  // Send the event somewhere!
};

it('Should force you to pass a second argument when you choose an event with a payload', () => {
  // @ts-expect-error
  sendEvent('click');

  sendEvent('click', {
    // @ts-expect-error
    x: 'oh dear',
  });

  sendEvent(
    'click',
    // @ts-expect-error
    {
      y: 1,
    }
  );

  sendEvent('click', {
    x: 1,
    y: 2,
  });
});

it('Should prevent you from passing a second argument when you choose an event without a payload', () => {
  sendEvent('focus');

  sendEvent(
    'focus',
    // @ts-expect-error
    {}
  );
});
