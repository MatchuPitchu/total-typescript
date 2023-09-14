// Might come in handy!
import { S } from 'ts-toolbelt';
// https://millsp.github.io/ts-toolbelt/modules/string_split.html

import { Equal, Expect } from '../helpers/type-utils';

type Path = 'Users/John/Documents/notes.txt';

/**
 * In SplitPath, we are using S.Split, passing it the Path, and then setting the delimiter to be /.
 * From here, S.Split will split the Path string up on the forward slash.
 * Of course, we can set it to split on any character we want.
 * Doing this type of operation at the type level is pretty fascinating!
 * Keep Split in mind, especially if you're looking to do really clever stuff with dynamic path parameters (which we may explore later in the section).
 */
type SplitPath = S.Split<Path, '/'>;

type tests = [Expect<Equal<SplitPath, ['Users', 'John', 'Documents', 'notes.txt']>>];
