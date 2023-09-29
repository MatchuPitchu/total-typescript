import { Equal, Expect } from '../../helpers/type-utils';

const myFunc = () => {
  return 'hello';
};

/**
 * ReturnType utility type
 * type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
 */
type MyFuncReturn = ReturnType<typeof myFunc>;

type tests = [Expect<Equal<MyFuncReturn, string>>];
