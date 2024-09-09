import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Using const type parameters for better literal inference
 */
export const asConst = <const T>(t: T) => t;

const fruits = asConst([
  {
    name: 'apple',
    price: 1,
  },
  {
    name: 'banana',
    price: 2,
  },
]);

// literal inference does not work with a normal (not const) already infered type
// const config = [
//   {
//     name: 'apple',
//     price: 1,
//   },
//   {
//     name: 'banana',
//     price: 2,
//   },
// ];
// const notInferedAsConst = asConst(config);

type tests = [
  Expect<
    Equal<
      typeof fruits,
      readonly [
        {
          readonly name: 'apple';
          readonly price: 1;
        },
        {
          readonly name: 'banana';
          readonly price: 2;
        },
      ]
    >
  >,
];
