type NoInfer<A extends any> = [A][A extends any ? 0 : never];

/**
 * Clue: F.NoInfer is part of the solution!
 *
 * You'll need to modify the interface below
 * to get it to work.
 */
interface FSMConfig<TState extends string> {
  // Use NoInfer utility type of TS 5.4
  initial: NoInfer<TState>;
  states: Record<
    TState,
    {
      onEntry?: () => void;
    }
  >;
}

const compare = <T>(a: NoInfer<T>, b: T) => {
  return a === b;
};

// @ts-expect-error with NoInfer only b type is inferred
compare(2, '123');

export const makeFiniteStateMachine = <TState extends string>(config: FSMConfig<TState>) => config;

const config = makeFiniteStateMachine({
  initial: 'a',
  states: {
    a: {
      onEntry: () => {
        console.log('a');
      },
    },
    // b should be allowed to be specified!
    b: {},
  },
});

const config2 = makeFiniteStateMachine({
  // c should not be allowed! It doesn't exist on the states below
  // @ts-expect-error
  initial: 'c',
  states: {
    a: {},
    // b should be allowed to be specified!
    b: {},
  },
});
