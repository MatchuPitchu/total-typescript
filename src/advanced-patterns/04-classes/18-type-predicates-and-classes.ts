import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Simplifying TypeScript with Type Predicates
 */
class Form<TValues> {
  error?: string;

  constructor(
    public values: TValues,
    private validate: (values: TValues) => string | void
  ) {}

  /**
   * Use type predicate and expect error of type string if fn return is true
   *
   * V2: this is this & { error: string }
   */
  isInvalid(): this is Form<TValues> & { error: string } {
    const result = this.validate(this.values);

    if (typeof result === 'string') {
      this.error = result;
      return true;
    }

    this.error = undefined;
    return false;
  }
}

const form = new Form(
  {
    username: '',
    password: '',
  },
  (values) => {
    if (!values.username) {
      return 'Username is required';
    }

    if (!values.password) {
      return 'Password is required';
    }
  }
);

if (form.isInvalid()) {
  type test1 = Expect<Equal<typeof form.error, string>>;
} else {
  type test2 = Expect<Equal<typeof form.error, string | undefined>>;
}
