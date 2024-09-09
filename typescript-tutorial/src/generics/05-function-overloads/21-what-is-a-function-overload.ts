import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Function overloads allow us to overload a function with different call signatures
 * and different return types based on what is passed in.
 */
function returnWhatIPassIn<T extends number>(t: T): T;
function returnWhatIPassIn<T extends string>(t: T): T;
function returnWhatIPassIn(t: unknown) {
  return t;
}

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn('matt');

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, 'matt'>>];
