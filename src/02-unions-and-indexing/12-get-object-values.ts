import { Equal, Expect } from '../helpers/type-utils';

const obj = {
  singleModule: 'SINGLE_MODULE',
  multiModule: 'MULTI_MODULE',
  sharedModule: 'SHARED_MODULE',
} as const;

type Obj = typeof obj;

type BackendModuleEnum = Obj[keyof Obj];

type tests = [Expect<Equal<BackendModuleEnum, 'SINGLE_MODULE' | 'MULTI_MODULE' | 'SHARED_MODULE'>>];
