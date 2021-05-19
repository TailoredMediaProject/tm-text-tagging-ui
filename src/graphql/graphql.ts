import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  URL: any;
  Void: any;
};

/** a annotation that links a target (thing to tag) with body (tag) */
export type Annotation = ResourceI & {
  __typename?: 'Annotation';
  id: Scalars['URL'];
  type: Scalars['URL'];
  /** tag, e.g. the resource 'Mick Schumacher' */
  body: Body;
  /** thing to tag, e.g. a news article or a part of an image */
  target: Target;
};

/** A blank node just have just a *type* */
export type BlankI = {
  type: Scalars['URL'];
};

/** all supported bodies */
export type Body = BodyResource | BodyText;

/** a body represented by an entity, e.g. from an existing taxonomy */
export type BodyResource = ResourceI & {
  __typename?: 'BodyResource';
  id: Scalars['URL'];
  type: Scalars['URL'];
  label?: Maybe<Scalars['String']>;
};

/** a basic body resource, e.g. an entity of an existing taxonomy. Label is optinal and only for demo purposes */
export type BodyResourceInput = {
  id: Scalars['URL'];
  type: Scalars['URL'];
  label?: Maybe<Scalars['String']>;
};

/** a freetext body (more for demo purposes) */
export type BodyText = BlankI & {
  __typename?: 'BodyText';
  type: Scalars['URL'];
  value: Scalars['String'];
};

/** a textual body (like a comment), mostly for demo purposes */
export type BodyTextInput = {
  value: Scalars['String'];
};

/** a filter, currently only targetId (id of target or source of SpecificResource) is supported */
export type Filter = {
  targetId: Scalars['String'];
};

/** a selector to identify a part of a media resource. the value must be interpreted via the specified standard */
export type FragmentSelector = BlankI & {
  __typename?: 'FragmentSelector';
  type: Scalars['URL'];
  /** the standard that is used to interpret the value */
  conformsTo: Scalars['URL'];
  /** the value based on the standard */
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** add a annotation: select *one* type of body and *one* type of target (will be improved as soon as interfaces for inputs are supported */
  addAnnotation?: Maybe<Annotation>;
  /** delete one annotation by id */
  deleteAnnotation?: Maybe<Scalars['Void']>;
  /** delete all annotations that match the filter criteria */
  deleteAnnotations?: Maybe<Scalars['Void']>;
};


export type MutationAddAnnotationArgs = {
  bodyResource?: Maybe<BodyResourceInput>;
  bodyText?: Maybe<BodyTextInput>;
  targetResource?: Maybe<TargetResourceInput>;
  targetTextSelector?: Maybe<TargetTextSelectorInput>;
  targetFragmentSelector?: Maybe<TargetFragmentSelectorInput>;
};


export type MutationDeleteAnnotationArgs = {
  id: Scalars['URL'];
};


export type MutationDeleteAnnotationsArgs = {
  filter: Filter;
};

export type Query = {
  __typename?: 'Query';
  /** return all annotations that match the filter criteria */
  annotations: Array<Maybe<Annotation>>;
  /** return one annotation by id */
  annotation?: Maybe<Annotation>;
};


export type QueryAnnotationsArgs = {
  filter?: Maybe<Filter>;
};


export type QueryAnnotationArgs = {
  id: Scalars['URL'];
};

/** All resources must have at least *id* and *type* */
export type ResourceI = {
  id: Scalars['URL'];
  type: Scalars['URL'];
};

/** all supported selectors */
export type Selector = TextPositionSelector | TextQuoteSelector | FragmentSelector;

/** a part of an entity, e.g. a fragment of an image or a part of a text */
export type SpecificResource = BlankI & {
  __typename?: 'SpecificResource';
  type: Scalars['URL'];
  /** the base of the selector, e.g. the image resource */
  source: Scalars['URL'];
  /** one or more specifications, e.g. a rectangular area that determines a part of the image */
  selector: Array<Selector>;
};

/** all supported targets */
export type Target = TargetResource | SpecificResource;

/** a part of an entity, selection is done using a choosable standard */
export type TargetFragmentSelectorInput = {
  source: Scalars['URL'];
  /** the standard that is used to interpret the value */
  conformsTo: Scalars['String'];
  /** a value using the specified standard */
  value: Scalars['String'];
};

/** a body represented by an entity, e.g. a news artile or an image */
export type TargetResource = ResourceI & {
  __typename?: 'TargetResource';
  id: Scalars['URL'];
  type: Scalars['URL'];
};

/** a target resource, e.g. an image */
export type TargetResourceInput = {
  id: Scalars['URL'];
  type: Scalars['URL'];
};

/** a part on a text; at least one selector has to be set */
export type TargetTextSelectorInput = {
  source: Scalars['URL'];
  textPositionSelector?: Maybe<TextPositionSelectorInput>;
  textQuoteSelector?: Maybe<TextQuoteSelectorInput>;
};

/** a selector to identify part of textual resources via start and end character */
export type TextPositionSelector = BlankI & {
  __typename?: 'TextPositionSelector';
  type: Scalars['URL'];
  start?: Maybe<Scalars['Int']>;
  end?: Maybe<Scalars['Int']>;
};

/** a part of a text; start and end are specified via character position; exact text included, prefix and suffix optional */
export type TextPositionSelectorInput = {
  start: Scalars['Int'];
  end: Scalars['Int'];
};

/** a selector to identify part of textual resources by exact mention, prefix and suffix are optional */
export type TextQuoteSelector = BlankI & {
  __typename?: 'TextQuoteSelector';
  type: Scalars['URL'];
  exact: Scalars['String'];
  prefix?: Maybe<Scalars['String']>;
  suffix?: Maybe<Scalars['String']>;
};

/** a part of a text; exact text included, prefix and suffix optional */
export type TextQuoteSelectorInput = {
  exact: Scalars['String'];
  prefix?: Maybe<Scalars['String']>;
  suffix?: Maybe<Scalars['String']>;
};



export type AddAnnotationMutationVariables = Exact<{
  bodyResource?: Maybe<BodyResourceInput>;
  bodyText?: Maybe<BodyTextInput>;
  targetResource?: Maybe<TargetResourceInput>;
  targetTextSelector?: Maybe<TargetTextSelectorInput>;
  targetFragmentSelector?: Maybe<TargetFragmentSelectorInput>;
}>;


export type AddAnnotationMutation = (
  { __typename?: 'Mutation' }
  & { addAnnotation?: Maybe<(
    { __typename?: 'Annotation' }
    & Pick<Annotation, 'id'>
    & { body: (
      { __typename?: 'BodyResource' }
      & Pick<BodyResource, 'id' | 'type' | 'label'>
    ) | (
      { __typename?: 'BodyText' }
      & Pick<BodyText, 'type' | 'value'>
    ), target: (
      { __typename?: 'TargetResource' }
      & Pick<TargetResource, 'id'>
    ) | (
      { __typename?: 'SpecificResource' }
      & Pick<SpecificResource, 'source'>
      & { selector: Array<(
        { __typename?: 'TextPositionSelector' }
        & Pick<TextPositionSelector, 'start' | 'end' | 'type'>
      ) | (
        { __typename?: 'TextQuoteSelector' }
        & Pick<TextQuoteSelector, 'exact'>
      ) | (
        { __typename?: 'FragmentSelector' }
        & Pick<FragmentSelector, 'type' | 'value'>
      )> }
    ) }
  )> }
);

export type AnnotationListQueryVariables = Exact<{ [key: string]: never; }>;


export type AnnotationListQuery = (
  { __typename?: 'Query' }
  & { annotations: Array<Maybe<(
    { __typename?: 'Annotation' }
    & Pick<Annotation, 'id'>
    & { body: (
      { __typename?: 'BodyResource' }
      & Pick<BodyResource, 'id' | 'type' | 'label'>
    ) | (
      { __typename?: 'BodyText' }
      & Pick<BodyText, 'type' | 'value'>
    ), target: (
      { __typename?: 'TargetResource' }
      & Pick<TargetResource, 'id'>
    ) | (
      { __typename?: 'SpecificResource' }
      & Pick<SpecificResource, 'source'>
      & { selector: Array<(
        { __typename?: 'TextPositionSelector' }
        & Pick<TextPositionSelector, 'start' | 'end' | 'type'>
      ) | { __typename?: 'TextQuoteSelector' } | (
        { __typename?: 'FragmentSelector' }
        & Pick<FragmentSelector, 'type' | 'value'>
      )> }
    ) }
  )>> }
);

export type DeleteAnnotationMutationVariables = Exact<{
  id: Scalars['URL'];
}>;


export type DeleteAnnotationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAnnotation'>
);

export type DeleteAnnotationByTargetIdMutationVariables = Exact<{
  filter: Filter;
}>;


export type DeleteAnnotationByTargetIdMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAnnotations'>
);

export type AllAnnotationsQueryVariables = Exact<{
  filter?: Maybe<Filter>;
}>;


export type AllAnnotationsQuery = (
  { __typename?: 'Query' }
  & { annotations: Array<Maybe<(
    { __typename?: 'Annotation' }
    & Pick<Annotation, 'id'>
    & { body: (
      { __typename?: 'BodyResource' }
      & Pick<BodyResource, 'id' | 'type' | 'label'>
    ) | (
      { __typename?: 'BodyText' }
      & Pick<BodyText, 'type' | 'value'>
    ), target: (
      { __typename?: 'TargetResource' }
      & Pick<TargetResource, 'id'>
    ) | (
      { __typename?: 'SpecificResource' }
      & Pick<SpecificResource, 'source'>
      & { selector: Array<(
        { __typename?: 'TextPositionSelector' }
        & Pick<TextPositionSelector, 'start' | 'end' | 'type'>
      ) | (
        { __typename?: 'TextQuoteSelector' }
        & Pick<TextQuoteSelector, 'exact'>
      ) | (
        { __typename?: 'FragmentSelector' }
        & Pick<FragmentSelector, 'type' | 'value'>
      )> }
    ) }
  )>> }
);


export const AddAnnotationDocument = gql`
    mutation addAnnotation($bodyResource: BodyResourceInput, $bodyText: BodyTextInput, $targetResource: TargetResourceInput, $targetTextSelector: TargetTextSelectorInput, $targetFragmentSelector: TargetFragmentSelectorInput) {
  addAnnotation(
    bodyResource: $bodyResource
    bodyText: $bodyText
    targetResource: $targetResource
    targetTextSelector: $targetTextSelector
    targetFragmentSelector: $targetFragmentSelector
  ) {
    id
    body {
      ... on BodyResource {
        id
        type
        label
      }
      ... on BodyText {
        type
        value
      }
    }
    target {
      ... on TargetResource {
        id
      }
      ... on SpecificResource {
        source
        selector {
          ... on FragmentSelector {
            type
            value
          }
          ... on TextPositionSelector {
            start
            end
            type
          }
          ... on TextQuoteSelector {
            exact
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAddAnnotationMutation__
 *
 * To run a mutation, you first call `useAddAnnotationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddAnnotationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddAnnotationMutation({
 *   variables: {
 *     bodyResource: // value for 'bodyResource'
 *     bodyText: // value for 'bodyText'
 *     targetResource: // value for 'targetResource'
 *     targetTextSelector: // value for 'targetTextSelector'
 *     targetFragmentSelector: // value for 'targetFragmentSelector'
 *   },
 * });
 */
export function useAddAnnotationMutation(options: VueApolloComposable.UseMutationOptions<AddAnnotationMutation, AddAnnotationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddAnnotationMutation, AddAnnotationMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<AddAnnotationMutation, AddAnnotationMutationVariables>(AddAnnotationDocument, options);
}
export type AddAnnotationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AddAnnotationMutation, AddAnnotationMutationVariables>;
export const AnnotationListDocument = gql`
    query AnnotationList {
  annotations {
    id
    body {
      ... on BodyResource {
        id
        type
        label
      }
      ... on BodyText {
        type
        value
      }
    }
    target {
      ... on TargetResource {
        id
      }
      ... on SpecificResource {
        source
        selector {
          ... on FragmentSelector {
            type
            value
          }
          ... on TextPositionSelector {
            start
            end
            type
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAnnotationListQuery__
 *
 * To run a query within a Vue component, call `useAnnotationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnnotationListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAnnotationListQuery();
 */
export function useAnnotationListQuery(options: VueApolloComposable.UseQueryOptions<AnnotationListQuery, AnnotationListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AnnotationListQuery, AnnotationListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AnnotationListQuery, AnnotationListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AnnotationListQuery, AnnotationListQueryVariables>(AnnotationListDocument, {}, options);
}
export type AnnotationListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AnnotationListQuery, AnnotationListQueryVariables>;
export const DeleteAnnotationDocument = gql`
    mutation deleteAnnotation($id: URL!) {
  deleteAnnotation(id: $id)
}
    `;

/**
 * __useDeleteAnnotationMutation__
 *
 * To run a mutation, you first call `useDeleteAnnotationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAnnotationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteAnnotationMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAnnotationMutation(options: VueApolloComposable.UseMutationOptions<DeleteAnnotationMutation, DeleteAnnotationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteAnnotationMutation, DeleteAnnotationMutationVariables>>) {
  return VueApolloComposable.useMutation<DeleteAnnotationMutation, DeleteAnnotationMutationVariables>(DeleteAnnotationDocument, options);
}
export type DeleteAnnotationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteAnnotationMutation, DeleteAnnotationMutationVariables>;
export const DeleteAnnotationByTargetIdDocument = gql`
    mutation deleteAnnotationByTargetId($filter: Filter!) {
  deleteAnnotations(filter: $filter)
}
    `;

/**
 * __useDeleteAnnotationByTargetIdMutation__
 *
 * To run a mutation, you first call `useDeleteAnnotationByTargetIdMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAnnotationByTargetIdMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteAnnotationByTargetIdMutation({
 *   variables: {
 *     filter: // value for 'filter'
 *   },
 * });
 */
export function useDeleteAnnotationByTargetIdMutation(options: VueApolloComposable.UseMutationOptions<DeleteAnnotationByTargetIdMutation, DeleteAnnotationByTargetIdMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteAnnotationByTargetIdMutation, DeleteAnnotationByTargetIdMutationVariables>>) {
  return VueApolloComposable.useMutation<DeleteAnnotationByTargetIdMutation, DeleteAnnotationByTargetIdMutationVariables>(DeleteAnnotationByTargetIdDocument, options);
}
export type DeleteAnnotationByTargetIdMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteAnnotationByTargetIdMutation, DeleteAnnotationByTargetIdMutationVariables>;
export const AllAnnotationsDocument = gql`
    query allAnnotations($filter: Filter) {
  annotations(filter: $filter) {
    id
    body {
      ... on BodyResource {
        id
        type
        label
      }
      ... on BodyText {
        type
        value
      }
    }
    target {
      ... on TargetResource {
        id
      }
      ... on SpecificResource {
        source
        selector {
          ... on FragmentSelector {
            type
            value
          }
          ... on TextPositionSelector {
            start
            end
            type
          }
          ... on TextQuoteSelector {
            exact
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAllAnnotationsQuery__
 *
 * To run a query within a Vue component, call `useAllAnnotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAnnotationsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAllAnnotationsQuery({
 *   filter: // value for 'filter'
 * });
 */
export function useAllAnnotationsQuery(variables: AllAnnotationsQueryVariables | VueCompositionApi.Ref<AllAnnotationsQueryVariables> | ReactiveFunction<AllAnnotationsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<AllAnnotationsQuery, AllAnnotationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AllAnnotationsQuery, AllAnnotationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AllAnnotationsQuery, AllAnnotationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AllAnnotationsQuery, AllAnnotationsQueryVariables>(AllAnnotationsDocument, variables, options);
}
export type AllAnnotationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AllAnnotationsQuery, AllAnnotationsQueryVariables>;