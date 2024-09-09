/**
 * The solution is to use the rest parameter ... along with Array<T>:
 * The first T enforces that there is at least one item in the array, while supporting however many more items may be there thanks to the rest parameter.
 */
type NonEmptyArray<T> = [T, ...T[]];

export const makeEnum = (values: NonEmptyArray<string>) => {};

makeEnum(['a']);
makeEnum(['a', 'b', 'c']);

// @ts-expect-error
makeEnum([]);
