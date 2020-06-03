import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  revokeRefreshTokensForUser: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  addPhoto: Scalars['Boolean'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddPhotoArgs = {
  date: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  category: Scalars['String'];
  url: Scalars['String'];
};

export type Photo = {
  __typename?: 'Photo';
  id: Scalars['Int'];
  url: Scalars['String'];
  category: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  date: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  users: Array<User>;
  self?: Maybe<User>;
  photos: Array<Photo>;
  photo?: Maybe<Photo>;
  birdPhotos: Array<Photo>;
  wildlifePhotos: Array<Photo>;
  naturePhotos: Array<Photo>;
};


export type QueryPhotoArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
};

export type BirdPhotosQueryVariables = {};


export type BirdPhotosQuery = (
  { __typename?: 'Query' }
  & { birdPhotos: Array<(
    { __typename?: 'Photo' }
    & Pick<Photo, 'id' | 'name' | 'date' | 'category' | 'description' | 'url'>
  )> }
);

export type ByeQueryVariables = {};


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type NaturePhotosQueryVariables = {};


export type NaturePhotosQuery = (
  { __typename?: 'Query' }
  & { naturePhotos: Array<(
    { __typename?: 'Photo' }
    & Pick<Photo, 'id' | 'name' | 'date' | 'category' | 'description' | 'url'>
  )> }
);

export type PhotosQueryVariables = {};


export type PhotosQuery = (
  { __typename?: 'Query' }
  & { photos: Array<(
    { __typename?: 'Photo' }
    & Pick<Photo, 'id' | 'name' | 'date' | 'category' | 'description' | 'url'>
  )> }
);

export type RegisterMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type SelfQueryVariables = {};


export type SelfQuery = (
  { __typename?: 'Query' }
  & { self?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type WildlifePhotosQueryVariables = {};


export type WildlifePhotosQuery = (
  { __typename?: 'Query' }
  & { wildlifePhotos: Array<(
    { __typename?: 'Photo' }
    & Pick<Photo, 'id' | 'name' | 'date' | 'category' | 'description' | 'url'>
  )> }
);


export const BirdPhotosDocument = gql`
    query birdPhotos {
  birdPhotos {
    id
    name
    date
    category
    description
    url
  }
}
    `;
export type BirdPhotosProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<BirdPhotosQuery, BirdPhotosQueryVariables>
    } & TChildProps;
export function withBirdPhotos<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  BirdPhotosQuery,
  BirdPhotosQueryVariables,
  BirdPhotosProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, BirdPhotosQuery, BirdPhotosQueryVariables, BirdPhotosProps<TChildProps, TDataName>>(BirdPhotosDocument, {
      alias: 'birdPhotos',
      ...operationOptions
    });
};

/**
 * __useBirdPhotosQuery__
 *
 * To run a query within a React component, call `useBirdPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useBirdPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBirdPhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function useBirdPhotosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BirdPhotosQuery, BirdPhotosQueryVariables>) {
        return ApolloReactHooks.useQuery<BirdPhotosQuery, BirdPhotosQueryVariables>(BirdPhotosDocument, baseOptions);
      }
export function useBirdPhotosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BirdPhotosQuery, BirdPhotosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BirdPhotosQuery, BirdPhotosQueryVariables>(BirdPhotosDocument, baseOptions);
        }
export type BirdPhotosQueryHookResult = ReturnType<typeof useBirdPhotosQuery>;
export type BirdPhotosLazyQueryHookResult = ReturnType<typeof useBirdPhotosLazyQuery>;
export type BirdPhotosQueryResult = ApolloReactCommon.QueryResult<BirdPhotosQuery, BirdPhotosQueryVariables>;
export const ByeDocument = gql`
    query Bye {
  bye
}
    `;
export type ByeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ByeQuery, ByeQueryVariables>
    } & TChildProps;
export function withBye<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ByeQuery,
  ByeQueryVariables,
  ByeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ByeQuery, ByeQueryVariables, ByeProps<TChildProps, TDataName>>(ByeDocument, {
      alias: 'bye',
      ...operationOptions
    });
};

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        return ApolloReactHooks.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
      }
export function useByeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = ApolloReactCommon.QueryResult<ByeQuery, ByeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>
    } & TChildProps;
export function withLogout<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LogoutMutation,
  LogoutMutationVariables,
  LogoutProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LogoutMutation, LogoutMutationVariables, LogoutProps<TChildProps, TDataName>>(LogoutDocument, {
      alias: 'logout',
      ...operationOptions
    });
};

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const NaturePhotosDocument = gql`
    query naturePhotos {
  naturePhotos {
    id
    name
    date
    category
    description
    url
  }
}
    `;
export type NaturePhotosProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<NaturePhotosQuery, NaturePhotosQueryVariables>
    } & TChildProps;
export function withNaturePhotos<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  NaturePhotosQuery,
  NaturePhotosQueryVariables,
  NaturePhotosProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, NaturePhotosQuery, NaturePhotosQueryVariables, NaturePhotosProps<TChildProps, TDataName>>(NaturePhotosDocument, {
      alias: 'naturePhotos',
      ...operationOptions
    });
};

/**
 * __useNaturePhotosQuery__
 *
 * To run a query within a React component, call `useNaturePhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useNaturePhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNaturePhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function useNaturePhotosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NaturePhotosQuery, NaturePhotosQueryVariables>) {
        return ApolloReactHooks.useQuery<NaturePhotosQuery, NaturePhotosQueryVariables>(NaturePhotosDocument, baseOptions);
      }
export function useNaturePhotosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NaturePhotosQuery, NaturePhotosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NaturePhotosQuery, NaturePhotosQueryVariables>(NaturePhotosDocument, baseOptions);
        }
export type NaturePhotosQueryHookResult = ReturnType<typeof useNaturePhotosQuery>;
export type NaturePhotosLazyQueryHookResult = ReturnType<typeof useNaturePhotosLazyQuery>;
export type NaturePhotosQueryResult = ApolloReactCommon.QueryResult<NaturePhotosQuery, NaturePhotosQueryVariables>;
export const PhotosDocument = gql`
    query Photos {
  photos {
    id
    name
    date
    category
    description
    url
  }
}
    `;
export type PhotosProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PhotosQuery, PhotosQueryVariables>
    } & TChildProps;
export function withPhotos<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PhotosQuery,
  PhotosQueryVariables,
  PhotosProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PhotosQuery, PhotosQueryVariables, PhotosProps<TChildProps, TDataName>>(PhotosDocument, {
      alias: 'photos',
      ...operationOptions
    });
};

/**
 * __usePhotosQuery__
 *
 * To run a query within a React component, call `usePhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function usePhotosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PhotosQuery, PhotosQueryVariables>) {
        return ApolloReactHooks.useQuery<PhotosQuery, PhotosQueryVariables>(PhotosDocument, baseOptions);
      }
export function usePhotosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PhotosQuery, PhotosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PhotosQuery, PhotosQueryVariables>(PhotosDocument, baseOptions);
        }
export type PhotosQueryHookResult = ReturnType<typeof usePhotosQuery>;
export type PhotosLazyQueryHookResult = ReturnType<typeof usePhotosLazyQuery>;
export type PhotosQueryResult = ApolloReactCommon.QueryResult<PhotosQuery, PhotosQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>
    } & TChildProps;
export function withRegister<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps, TDataName>>(RegisterDocument, {
      alias: 'register',
      ...operationOptions
    });
};

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SelfDocument = gql`
    query Self {
  self {
    id
    email
  }
}
    `;
export type SelfProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SelfQuery, SelfQueryVariables>
    } & TChildProps;
export function withSelf<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SelfQuery,
  SelfQueryVariables,
  SelfProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SelfQuery, SelfQueryVariables, SelfProps<TChildProps, TDataName>>(SelfDocument, {
      alias: 'self',
      ...operationOptions
    });
};

/**
 * __useSelfQuery__
 *
 * To run a query within a React component, call `useSelfQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelfQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelfQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SelfQuery, SelfQueryVariables>) {
        return ApolloReactHooks.useQuery<SelfQuery, SelfQueryVariables>(SelfDocument, baseOptions);
      }
export function useSelfLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SelfQuery, SelfQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SelfQuery, SelfQueryVariables>(SelfDocument, baseOptions);
        }
export type SelfQueryHookResult = ReturnType<typeof useSelfQuery>;
export type SelfLazyQueryHookResult = ReturnType<typeof useSelfLazyQuery>;
export type SelfQueryResult = ApolloReactCommon.QueryResult<SelfQuery, SelfQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
  }
}
    `;
export type UsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<UsersQuery, UsersQueryVariables>
    } & TChildProps;
export function withUsers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UsersQuery,
  UsersQueryVariables,
  UsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, UsersQuery, UsersQueryVariables, UsersProps<TChildProps, TDataName>>(UsersDocument, {
      alias: 'users',
      ...operationOptions
    });
};

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const WildlifePhotosDocument = gql`
    query wildlifePhotos {
  wildlifePhotos {
    id
    name
    date
    category
    description
    url
  }
}
    `;
export type WildlifePhotosProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<WildlifePhotosQuery, WildlifePhotosQueryVariables>
    } & TChildProps;
export function withWildlifePhotos<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  WildlifePhotosQuery,
  WildlifePhotosQueryVariables,
  WildlifePhotosProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, WildlifePhotosQuery, WildlifePhotosQueryVariables, WildlifePhotosProps<TChildProps, TDataName>>(WildlifePhotosDocument, {
      alias: 'wildlifePhotos',
      ...operationOptions
    });
};

/**
 * __useWildlifePhotosQuery__
 *
 * To run a query within a React component, call `useWildlifePhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useWildlifePhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWildlifePhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function useWildlifePhotosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WildlifePhotosQuery, WildlifePhotosQueryVariables>) {
        return ApolloReactHooks.useQuery<WildlifePhotosQuery, WildlifePhotosQueryVariables>(WildlifePhotosDocument, baseOptions);
      }
export function useWildlifePhotosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WildlifePhotosQuery, WildlifePhotosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WildlifePhotosQuery, WildlifePhotosQueryVariables>(WildlifePhotosDocument, baseOptions);
        }
export type WildlifePhotosQueryHookResult = ReturnType<typeof useWildlifePhotosQuery>;
export type WildlifePhotosLazyQueryHookResult = ReturnType<typeof useWildlifePhotosLazyQuery>;
export type WildlifePhotosQueryResult = ApolloReactCommon.QueryResult<WildlifePhotosQuery, WildlifePhotosQueryVariables>;