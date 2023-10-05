// Interview with Tanner about Generics in React Query
// https://www.totaltypescript.com/workshops/typescript-generics/the-art-of-type-arguments/generics-in-react-query

// Notes:
// - Instead of using generic names like T, U, V, Tanner suggests being more descriptive.
//
// Example: https://github.dev/TanStack/query
//
// export function useQuery<
//   TQueryFnData = unknown,
//   TError = unknown,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
// >(
//   options: Omit<
//     UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
//     'initialData'
//   > & { initialData?: () => undefined }
// ): UseQueryResult<TData, TError>;

export {};
