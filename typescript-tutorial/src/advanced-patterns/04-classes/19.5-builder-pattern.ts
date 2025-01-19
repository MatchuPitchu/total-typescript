// Youtube-Tutorial: https://www.youtube.com/watch?v=AON1nirWpcc

type Summary = {
  product: string;
  total: number;
};

type SummaryInput = {
  product: string;
  amount: number;
  cost: number;
};

class Builder<T extends Partial<SummaryInput>> {
  #actual: T;

  static create(product: string) {
    return new Builder({ product });
  }

  private constructor(private actual: T) {
    this.#actual = actual;
  }

  setAmount(amount: number) {
    return new Builder({ ...this.#actual, amount });
  }

  setCost(cost: number) {
    return new Builder({ ...this.#actual, cost });
  }

  build(this: Builder<SummaryInput>): Summary {
    const summary = this.#actual;

    return {
      product: summary.product,
      total: summary.amount * summary.cost,
    };
  }
}

const summary = Builder.create('My Product').setAmount(2).setCost(10).build();
