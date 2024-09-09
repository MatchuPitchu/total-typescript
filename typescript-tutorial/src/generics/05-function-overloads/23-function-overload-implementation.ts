import { it } from 'vitest';
import { Equal, Expect } from '../../helpers/type-utils';

interface AnonymousPrivileges {
  sitesCanVisit: string[];
}

interface UserPrivileges extends AnonymousPrivileges {
  sitesCanEdit: string[];
}

interface AdminPrivileges extends UserPrivileges {
  sitesCanDelete: string[];
}

/**
 * Specifying Types for an Overloaded Function
 *
 * Problem: With this return type of the function implementation,
 * the wished return is not type safe. You could e.g. `sitesCanDelete` to `user` role
 * Notice: It's not easy to be type safe with only function overloads.
 */
function getRolePrivileges(role: 'admin'): AdminPrivileges;
function getRolePrivileges(role: 'user'): UserPrivileges;
function getRolePrivileges(role: string): AnonymousPrivileges;
function getRolePrivileges(
  role: string
): AnonymousPrivileges | AdminPrivileges | UserPrivileges {
  switch (role) {
    case 'admin':
      return {
        sitesCanDelete: [],
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    case 'user':
      return {
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    default:
      return {
        sitesCanVisit: [],
      };
  }
}

it('Should return the correct privileges', () => {
  const adminPrivileges = getRolePrivileges('admin');

  const userPrivileges = getRolePrivileges('user');
  const anonymousPrivileges = getRolePrivileges('anonymous');

  type tests = [
    Expect<Equal<typeof adminPrivileges, AdminPrivileges>>,
    Expect<Equal<typeof userPrivileges, UserPrivileges>>,
    Expect<Equal<typeof anonymousPrivileges, AnonymousPrivileges>>,
  ];
});
