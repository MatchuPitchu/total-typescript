// Explain excalidraw's sum function

/**
 * Inside of gestures.ts, in the Excalidraw codebase is a beautiful example of of the concepts we've explored so far.
 * The sum function takes in an array and a mapper function as arguments. Inside of the function, the array is reduced
 * over and turned into a number by calling the mapper function:
 */
const sum = <T>(array: readonly T[], mapper: (item: T) => number): number =>
  array.reduce((acc, item) => acc + mapper(item), 0);

const arr = ['1', '2', '5', { wow: 12345 }];

/**
 * We can then create a result variable that will be the result of calling sum with our arr array and a mapper function that calls parseInt on each item:
 */
const result = sum(arr, (item) => {
  if (typeof item === 'object' && 'wow' in item) {
    return item.wow;
  }
  return parseInt(item);
});
