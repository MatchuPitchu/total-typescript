import { expect, it } from 'vitest';

/**
 * Here, we've actually got _multiple_ problem files!
 * Make sure to to check problem.2.ts too.
 *
 * This approach works well in a library setting.
 * When you use declare global inside your library, it means that users can override
 * an interface that you've declared in the global.
 * This provides a way of passing down information or letting users pass your library information.
 * Think about global as a way to communicate between files that don't necessarily import or export
 * to each other. When you use it like this, you can actually end up with a really nice API.
 */
declare global {
  interface DispatchableEvent {
    LOG_IN: {
      username: string;
      password: string;
    };
  }

  /**
   * This type converts the DispatchableEvent
   * interface into a union:
   *
   * ({ type: "LOG_IN" } & {
   *     username: string;
   *     password: string;
   * }) | {
   *     type: "LOG_OUT";
   * } | ({
   *     type: "UPDATE_USERNAME";
   * } & {
   *     username: string;
   * })
   */
  type UnionOfDispatchableEvents = {
    [K in keyof DispatchableEvent]: {
      type: K;
    } & DispatchableEvent[K];
  }[keyof DispatchableEvent];
}

const dispatchEvent = (event: UnionOfDispatchableEvents) => {
  // Imagine that this function dispatches this event
  // to a global handler
};

it('Should be able to dispatch a LOG_IN and LOG_OUT event', () => {
  dispatchEvent({ type: 'LOG_IN', username: 'username', password: 'password' });
  dispatchEvent({ type: 'LOG_OUT' });
});
