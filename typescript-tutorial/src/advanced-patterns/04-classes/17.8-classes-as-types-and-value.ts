import { Equal, Expect } from '../../helpers/type-utils';

class CustomError extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message);
    this.name = 'CustomError';
  }
}

/**
 * Classes can be used as type in TypeScript
 */
const handleCustomError = (error: CustomError) => {
  console.error(error.code);

  type test = Expect<Equal<typeof error.code, number>>;
};

const customError = new CustomError('Error', 401);

handleCustomError(customError);

// if (customError instanceof CustomError) {
// ...
// }

export {};
