import { type CSSProperties } from 'react';

interface MyTheme {
  color: {
    primary: string;
  };
  fontSize: {
    small: string;
  };
}

/**
 * With this setup, useStyled and MyTheme can sit in one module together and export useStyled.
 * Then, buttonStyle and divStyle can just consume from useStyled without needing to pass in a
 * type argument. This is because we have reusable type argument at the top level which filters all the way down.
 *
 * Because generics are tied to function calls, we have to make a function call at the top level which doesn't
 * actually do anything. It's unfortunate that the only way to do this is by wrapping it in a factory function.
 *
 * Desired API:
 *
 * const useStyled = makeUseStyled<MyTheme>();
 */
const makeUseStyled =
  <TTheme = {}>() =>
  (func: (theme: TTheme) => CSSProperties) => {
    // Imagine that this function hooks into a global theme
    // and returns the CSSProperties
    return {} as CSSProperties;
  };

export const useStyled = makeUseStyled<MyTheme>();

const buttonStyle = useStyled((theme) => ({
  color: theme.color.primary,
  fontSize: theme.fontSize.small,
}));

const divStyle = useStyled((theme) => ({
  backgroundColor: theme.color.primary,
}));
