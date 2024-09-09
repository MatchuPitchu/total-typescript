import { Equal, Expect } from '../../helpers/type-utils';

export const obj = {
  String: 'Default string',
  Int: 1,
  Float: 1.14,
  Boolean: true,
  ID: 'id',
};

type Obj = typeof obj;

// Indexed access types can also access deeply nested data by chaining
// square brackets: e.g. ObjType['foo']['bar']
export type StringType = Obj['String'];
export type IntType = Obj['Int'];
export type FloatType = Obj['Float'];
export type BooleanType = Obj['Boolean'];
export type IDType = Obj['ID'];

type tests = [
  Expect<Equal<StringType, string>>,
  Expect<Equal<IntType, number>>,
  Expect<Equal<FloatType, number>>,
  Expect<Equal<BooleanType, boolean>>,
  Expect<Equal<IDType, string>>,
];
