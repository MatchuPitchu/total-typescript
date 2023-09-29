import { Equal, Expect } from '../../helpers/type-utils';

export const obj = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
  ONE_ON_ONE: '1on1',
  SELF_DIRECTED: 'selfDirected',
  PLANNED_ONE_ON_ONE: 'planned1on1',
  PLANNED_SELF_DIRECTED: 'plannedSelfDirected',
} as const;

type Obj = typeof obj;

// passing a union into an indexed access type like this will return another union
export type IndividualProgram1 = Obj[
  | 'ONE_ON_ONE'
  | 'SELF_DIRECTED'
  | 'PLANNED_ONE_ON_ONE'
  | 'PLANNED_SELF_DIRECTED'];

// create a union by excluding the members that you don't want
export type IndividualProgram2 = Obj[Exclude<
  keyof Obj,
  'GROUP' | 'ANNOUNCEMENT'
>];

type tests1 = [
  Expect<
    Equal<
      IndividualProgram1,
      '1on1' | 'selfDirected' | 'planned1on1' | 'plannedSelfDirected'
    >
  >,
];
type tests2 = [
  Expect<
    Equal<
      IndividualProgram2,
      '1on1' | 'selfDirected' | 'planned1on1' | 'plannedSelfDirected'
    >
  >,
];
