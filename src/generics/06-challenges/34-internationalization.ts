import { expect, it } from 'vitest';

type GetParamKeys<TTranslation extends string> = TTranslation extends ''
  ? []
  : TTranslation extends `${string}{${infer Param}}${infer Tail}`
  ? [Param, ...GetParamKeys<Tail>]
  : [];

const translate = <
  TTranslations extends Record<string, string>,
  TKey extends keyof TTranslations,
  // * use TConsoleLog to see the current captured generic argument when hovering over translate fn call
  // TConsoleLog = GetParamKeys<TTranslations[TKey]>,
  // to have only one computation of a type, extract it into a generic type argument here
  // set a default value so that the contraint "extends string[]" could be defined to make ts compiler happy in function
  TParamKeys extends string[] = GetParamKeys<TTranslations[TKey]>,
>(
  translations: TTranslations,
  key: TKey,
  // [number] transforms array of parameters into a union type of parameters
  ...args: TParamKeys extends []
    ? [] // no args if no parameter key (= {xxx}) is found
    : [params: Record<TParamKeys[number], string>]
) => {
  const translation = translations[key];
  const params: any = args[0] || {};

  return translation.replace(/{(\w+)}/g, (_, key) => params[key]);
};

// TESTS

const translations = {
  title: 'Hello, {name}!',
  subtitle: 'You have {count} unread messages.',
  button: 'Click me!',
} as const;

it('Should translate a translation without parameters', () => {
  const buttonText = translate(translations, 'button');

  expect(buttonText).toEqual('Click me!');
});

it('Should translate a translation WITH parameters', () => {
  const subtitle = translate(translations, 'subtitle', {
    count: '2',
  });

  expect(subtitle).toEqual('You have 2 unread messages.');
});

it('Should force you to provide parameters if required', () => {
  // @ts-expect-error
  translate(translations, 'title');
});

it('Should not let you pass parameters if NOT required', () => {
  // @ts-expect-error
  translate(translations, 'button', {});
});
