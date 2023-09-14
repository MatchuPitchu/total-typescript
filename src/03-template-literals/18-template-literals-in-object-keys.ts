import { Equal, Expect } from '../helpers/type-utils';

type TemplateLiteralKey = `${'user' | 'post' | 'comment'}${'Id' | 'Name'}`;

/**
 * Passing in TemplateLiteralKey and string as the type parameters will create an object type
 * that has all of the keys from TemplateLiteralKey and the values will be string.
 *
 * We can add anything we want to TemplateLiteralKey and it will be reflected in ObjectOfKeys.
 */
type ObjectOfKeys = Record<TemplateLiteralKey, string>;

// V2
// type ObjectOfKeys = {
//   [Key in TemplateLiteralKey]: string;
// };

type tests = [
  Expect<
    Equal<
      ObjectOfKeys,
      {
        userId: string;
        userName: string;
        postId: string;
        postName: string;
        commentId: string;
        commentName: string;
      }
    >
  >,
];
