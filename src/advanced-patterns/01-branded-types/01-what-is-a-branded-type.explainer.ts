import { Brand } from '../../helpers/Brand';

/**
 * Branded types (also known as "Nominal" or "Opaque" types) let us specify logic on the type level.
 *
 *
 */
type Password = Brand<string, 'Password'>;
type Email = Brand<string, 'Email'>;

type UserObject = Brand<
  {
    id: string;
    name: string;
  },
  'User'
>;

const user: UserObject = {
  id: 'awdawd',
  name: 'awdawdawd',
} as UserObject;

const verifyPassword = (password: Password) => {
  // ...
};
verifyPassword('12345' as Password);

/**
 * Normally a password would just be a string.
 * But by calling a special Brand type helper, we can turn this password from a regular string into a Password:
 */
const password = '1231423' as Password;

const email = 'mpocock@me.com' as Email;

let passwordSlot: Password;
// @ts-expect-error string should be branded as Password to be valid
passwordSlot = 'awdjhawdjhbawd';

passwordSlot = 'awdjhawdjhbawd' as Password;
