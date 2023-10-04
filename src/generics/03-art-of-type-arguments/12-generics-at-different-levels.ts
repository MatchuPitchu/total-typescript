import { expect, it, describe } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

/**
 * Represent Generics at the Lowest Level
 * Hint: when working with generics, try to represent the generic type argument a low level thing (NOT the whole thing, where you should drill down)
 * Here using HomePageFlags directly as the generic is an elegant solution since it is the argument for the override function.
 */
export const getHomePageFeatureFlags = <HomePageFlags>(
  config: { rawConfig: { featureFlags: { homePage: HomePageFlags } } },
  override: (flags: HomePageFlags) => HomePageFlags
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

// Solution 2: cumbersome solution
export const getHomePageFeatureFlags2 = <
  TConfig extends {
    rawConfig: {
      featureFlags: {
        homePage: any;
      };
    };
  },
>(
  config: TConfig,
  override: (
    flags: TConfig['rawConfig']['featureFlags']['homePage']
  ) => TConfig['rawConfig']['featureFlags']['homePage']
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

describe('getHomePageFeatureFlags', () => {
  const EXAMPLE_CONFIG = {
    apiEndpoint: 'https://api.example.com',
    apiVersion: 'v1',
    apiKey: '1234567890',
    rawConfig: {
      featureFlags: {
        homePage: {
          showBanner: true,
          showLogOut: false,
        },
        loginPage: {
          showCaptcha: true,
          showConfirmPassword: false,
        },
      },
    },
  };
  it('Should return the homePage flag object', () => {
    const flags = getHomePageFeatureFlags(
      EXAMPLE_CONFIG,
      (defaultFlags) => defaultFlags
    );

    expect(flags).toEqual({
      showBanner: true,
      showLogOut: false,
    });

    type tests = [
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>,
    ];
  });

  it('Should allow you to modify the result', () => {
    const flags = getHomePageFeatureFlags(EXAMPLE_CONFIG, (defaultFlags) => ({
      ...defaultFlags,
      showBanner: false,
    }));

    expect(flags).toEqual({
      showBanner: false,
      showLogOut: false,
    });

    type tests = [
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>,
    ];
  });
});
