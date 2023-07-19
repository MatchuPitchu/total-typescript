import { Equal, Expect } from '../helpers/type-utils';

const testingFrameworks = {
  vitest: {
    label: 'Vitest',
  },
  jest: {
    label: 'Jest',
  },
  mocha: {
    label: 'Mocha',
  },
};

// `keyof` operates only on type level, so need `typeof` this object
type TestingFramework = keyof typeof testingFrameworks;

type tests = [Expect<Equal<TestingFramework, 'vitest' | 'jest' | 'mocha'>>];
