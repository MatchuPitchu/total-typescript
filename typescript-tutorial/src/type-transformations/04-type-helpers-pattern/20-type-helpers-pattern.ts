import { Equal, Expect } from '../../helpers/type-utils';

/**
 * The angle brackets next to ReturnWhatIPassIn instantiate a type argument called T. After the equals sign, we 'return' it by using T.
 * It's a type helper function that returns another type.
 * The generic argument T is like an argument for a function.
 */
type ReturnWhatIPassIn<T> = T;

type tests = [
  Expect<Equal<ReturnWhatIPassIn<1>, 1>>,
  Expect<Equal<ReturnWhatIPassIn<'1'>, '1'>>,
  Expect<Equal<ReturnWhatIPassIn<true>, true>>,
  Expect<Equal<ReturnWhatIPassIn<false>, false>>,
  Expect<Equal<ReturnWhatIPassIn<null>, null>>,
];
