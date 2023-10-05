// When returning the value only,
// it infers the literal type
const acceptsValueOnly = <T>(t: T) => t;

const result = acceptsValueOnly('a');
//    ^?

const acceptsValueInAnObject = <TValue>(obj: { input: TValue }) => {
  return obj.input;
};

const result2 = acceptsValueInAnObject({ input: 'abc' });
//    ^?

const asConstObj = { input: 'abc' } as const;
const result2WithAsConst = acceptsValueInAnObject(asConstObj);
//    ^?

const acceptsValueInAnObjectFieldWithConstraint = <TValue extends string>(obj: {
  input: TValue;
}) => {
  return obj.input;
};

const result3 = acceptsValueInAnObjectFieldWithConstraint({ input: 'abc' });
//    ^?

const acceptsValueWithObjectConstraint = <
  TObj extends {
    input: string;
  },
>(
  obj: TObj
) => {
  return obj.input;
};

const result4 = acceptsValueWithObjectConstraint({ input: 'abc' });
//    ^?

const result4WithAsConst = acceptsValueWithObjectConstraint(asConstObj);
//    ^?

export {};
