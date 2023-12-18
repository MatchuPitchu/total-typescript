import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Class Implementation Following the Builder Pattern
 *
 * 1) Starting point is empty [], so it's the default type []
 */
export class BuilderTuple<TList extends any[] = []> {
  list: TList;

  constructor() {
    this.list = [] as any;
  }

  /**
   * Define new type of list as the return type.
   * This overwrites the initial BuilderTuple type -> [].
   */
  push<TNum extends number>(num: TNum): BuilderTuple<[...TList, TNum]> {
    this.list.push(num);

    // return to be able to chain methods (see below)
    // as any assertion needed to avoid type error that this is not assignable to new type
    return this as any;
  }

  unshift<TNum extends number>(num: TNum): BuilderTuple<[TNum, ...TList]> {
    this.list.unshift(num);

    return this as any;
  }

  pop(): BuilderTuple<TList extends [...infer TListNew, any] ? TListNew : never> {
    this.list.pop();

    return this as any;
  }
}

const builderBeforePush = new BuilderTuple();
const listBeforePush = builderBeforePush.list;

const builderAfterAddItems = builderBeforePush.push(2).unshift(1).push(100).pop();
const listAfterAddItems = builderAfterAddItems.list;

type tests = [
  Expect<Equal<typeof builderBeforePush, BuilderTuple<[]>>>,
  Expect<Equal<typeof listBeforePush, []>>,
  Expect<Equal<typeof builderAfterAddItems, BuilderTuple<[1, 2]>>>,
  Expect<Equal<typeof listAfterAddItems, [1, 2]>>,
];
