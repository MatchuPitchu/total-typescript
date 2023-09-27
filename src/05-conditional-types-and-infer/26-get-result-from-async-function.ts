import { Equal, Expect } from '../helpers/type-utils';

const getServerSideProps = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const json: { title: string } = await data.json();
  return {
    props: {
      json,
    },
  };
};

/**
 * This pattern is useful when working with functions where you want to extract something
 * but you might not have access to its internals or you don’t want to declare a type annotation for.
 */
type InferPropsFromServerSideFunction<T> = T extends (
  ...args: any[]
) => Promise<{ props: infer Props }>
  ? Props
  : never;

type tests = [
  Expect<
    Equal<
      InferPropsFromServerSideFunction<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >,
];
