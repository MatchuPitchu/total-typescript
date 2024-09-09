declare const brand: unique symbol;

/**
 * Branded type helper returns T and an object containing that brand assigned to a unique symbol.
 *
 * Using unique symbol puts something into the global scope that's a type which only exists at the
 * type level. It can never satisfied at the runtime level.
 *
 * In this case, we use the syntax to say that once something has been branded,
 * it has to be passed to a slot that has the same Brand.
 */
export type Brand<T, TBrand> = T & { [brand]: TBrand };
