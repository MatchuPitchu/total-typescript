import { expect, it } from 'vitest';
import { fetchUser } from '../fake-external-lib';

type Middleware<TInput, TOutput> = (input: TInput) => TOutput | Promise<TOutput>;

/**
 * In this problem, we need to type the return type of the use()
 * method to make it update the TOutput generic with a new one.
 *
 * Currently, the use method just uses the same TOutput as the
 * first middleware you pass in. But it should infer the _new_
 * output from the middleware you pass in.
 */
class DynamicMiddleware<TInput, TOutput> {
  private middleware: Middleware<any, any>[] = [];

  constructor(firstMiddleware: Middleware<TInput, TOutput>) {
    this.middleware.push(firstMiddleware);
  }

  /**
   * The first thing to do is add a <TNewOutput> slot to use,
   * which will be used for inferring what is returned from the middleware.
   *
   * Now the middleware that is returned is not going to be the input,
   * but instead is going to be the output of the first middleware.
   *
   * Look at the as each of the generic slots being like a new line
   * that recursively goes down. The TInput stays the same, but the
   * will change on each run.
   *
   * Afterward, we need to update the use function to add a return type
   * that returns the class but with a new set of generics.
   *
   * So the return type will be DynamicMiddleware with the same TInput
   * but an output of the TNewOutput that results from middleware.
   */
  use<TNewOutput>(middleware: Middleware<TOutput, TNewOutput>): DynamicMiddleware<TInput, TNewOutput> {
    this.middleware.push(middleware);

    return this as any; //  'as any' is required
  }

  async run(input: TInput): Promise<TOutput> {
    let result: TOutput = input as any;

    for (const middleware of this.middleware) {
      result = await middleware(result);
    }

    return result;
  }
}

const middleware = new DynamicMiddleware((req: Request) => {
  return {
    ...req,
    // Transforms /user/123 to 123
    userId: req.url.split('/')[2],
  };
})
  .use((req) => {
    if (req.userId === '123') {
      throw new Error();
    }
    return req;
  })
  .use(async (req) => {
    return {
      ...req,
      user: await fetchUser(req.userId),
    };
  });

it('Should fail if the user id is 123', () => {
  expect(middleware.run({ url: '/user/123' } as Request)).rejects.toThrow();
});

it('Should return a request with a user', async () => {
  const result = await middleware.run({ url: '/user/matt' } as Request);

  expect(result.user.id).toBe('matt');
  expect(result.user.firstName).toBe('John');
  expect(result.user.lastName).toBe('Doe');
});

// Example of usage of middleware
// - prepare middlewares with callbacks that are passed in to use
// - run entire chaining middlewares with run method and input argument
const middleware2 = new DynamicMiddleware((input: string) => parseFloat(input))
  .use((num) => num.toFixed())
  .use((stringNumber) => ({ hello: stringNumber }))
  .run('1');
