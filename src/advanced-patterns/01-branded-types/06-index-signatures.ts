import { it } from 'vitest';
import { Brand } from '../../helpers/Brand';
import { Equal, Expect } from '../../helpers/type-utils';

type PostId = Brand<string, 'PostId'>;
type UserId = Brand<string, 'UserId'>;

interface User {
  id: UserId;
  name: string;
}

interface Post {
  id: PostId;
  title: string;
}

/**
 * Indexing an Object with Branded Types
 *
 * Usually if we would index into an object using something like this:
 * const db: { [index: string]: Post | User }
 * is the same as
 * const db: Record<string, Post | User>
 *
 * Solution is two index signatures with two different brands
 * that return two different things!
 */
const db: {
  [id: UserId]: User;
  [id: PostId]: Post;
} = {};

// OR
// const db2: Record<UserId, User> & Record<PostId, Post>;

it('Should let you add users and posts to the db by their id', () => {
  const postId = 'post_1' as PostId;
  const userId = 'user_1' as UserId;

  db[postId] = {
    id: postId,
    title: 'Hello world',
  };

  db[userId] = {
    id: userId,
    name: 'Miles',
  };

  const post = db[postId];
  const user = db[userId];

  type tests = [
    Expect<Equal<typeof post, Post>>,
    Expect<Equal<typeof user, User>>,
  ];
});

it('Should fail if you try to add a user under a post id', () => {
  const postId = 'post_1' as PostId;
  const userId = 'user_1' as UserId;

  const user: User = {
    id: userId,
    name: 'Miles',
  };

  // @ts-expect-error
  db[postId] = user;
});
