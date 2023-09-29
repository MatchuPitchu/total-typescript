import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Instead of tying into the structure of the interface, we should instead just
 * look at its public declaration because it is less likely to change.
 */
interface MyComplexInterface<Event, Context, Name, Point> {
  getEvent: () => Event;
  getContext: () => Context;
  getName: () => Name;
  getPoint: () => Point;
}

type Example = MyComplexInterface<
  'click',
  'window',
  'my-event',
  { x: 12; y: 14 }
>;

type Example2 = GetPoint<MyComplexInterface<1, 2, 3, 4>>;

type GetPoint<T> = T extends MyComplexInterface<any, any, any, infer TPoint>
  ? TPoint
  : never;

type tests = [Expect<Equal<GetPoint<Example>, { x: 12; y: 14 }>>];
