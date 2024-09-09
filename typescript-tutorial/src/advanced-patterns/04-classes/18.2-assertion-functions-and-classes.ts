import { Equal, Expect } from '../../helpers/type-utils';

interface User {
  id: string;
}

/**
 * Leverage Assertion Functions for Better Inference in Classes
 */
export class SDK {
  constructor(public loggedInUser?: User) {}

  /**
   * V2: asserts this is SDK & { loggedInUser: User }
   */
  assertIsLoggedIn(): asserts this is this & { loggedInUser: User } {
    if (!this.loggedInUser) {
      throw new Error('Not logged in');
    }
  }

  createPost(title: string, body: string) {
    type test1 = Expect<Equal<typeof this.loggedInUser, User | undefined>>;

    this.loggedInUser; // SDK.loggedInUser?: User | undefined

    this.assertIsLoggedIn();

    this.loggedInUser; // loggedInUser: User

    type test2 = Expect<Equal<typeof this.loggedInUser, User>>;
  }
}
