import { Equal, Expect } from '../../helpers/type-utils';
import { S } from 'ts-toolbelt';

type UserPath = '/users/:id';

type UserOrganisationPath = '/users/:id/organisations/:organisationId';

/**
 * Extract from String with Mapped Types, Template Literals, and infer.
 *
 * 1) K in S.Split<TPath, '/'> -> create array of all path parts
 * 2) [number] -> create string union of all path parts
 * 3) K extends `:${infer P}` ? P : never -> only take path parts that have a ":"
 */
type ExtractPathParams<TPath extends string> = {
  [K in S.Split<TPath, '/'>[number] as K extends `:${infer P}`
    ? P
    : never]: string;
};

type A = ExtractPathParams<UserPath>;

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >,
];
