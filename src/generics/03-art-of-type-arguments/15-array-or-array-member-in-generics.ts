import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Constrain to the Array Member, Not the Array
 *
 * Remember our generics rule of thumb to always go with the lower level.
 * With this in mind, we can first update the statuses to be a TStatus array instead of just TStatus (-> TStatus extends string[])
 */
const makeStatus = <TStatus extends string>(statuses: TStatus[]) => {
  return statuses;
};

const statuses = makeStatus(['INFO', 'DEBUG', 'ERROR', 'WARNING']);

type tests = [
  Expect<Equal<typeof statuses, Array<'INFO' | 'DEBUG' | 'ERROR' | 'WARNING'>>>,
];
