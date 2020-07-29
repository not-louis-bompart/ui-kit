import {QuerySuggestCompletion} from './api/search/query-suggest/query-suggest-response';
import {SearchState} from './features/search/search-slice';
import {SearchParametersState} from './search-parameters-state';
import {StateWithHistory} from './app/undoable';
import {DidYouMeanState} from './features/did-you-mean/did-you-mean-slice';
import {FacetSearchSetState} from './features/facets/facet-search-set/facet-search-set-slice';
import {SearchAPIErrorWithStatusCode} from './api/search/search-api-error-response';
import {FieldsState} from './features/fields/fields-slice';

export interface SearchPageState extends SearchParametersState {
  /**
   * The global headless engine configuration.
   */
  configuration: ConfigurationState;
  /**
   * The set of facet searches.
   */
  facetSearchSet: FacetSearchSetState;
  /**
   * The URL redirection triggered by the preprocessed query.
   */
  redirection: RedirectionState;
  /**
   * The query suggestions returned by Coveo ML.
   */
  querySuggest: QuerySuggestSet;
  /**
   * The information related to the search endpoint.
   */
  search: SearchState;
  /**
   * DidYouMean allows to retrieve query corrections from the index related to end user mispelling.
   */
  didYouMean: DidYouMeanState;
  /**
   * The information related to the history navigation.
   */
  history: StateWithHistory<SearchParametersState>;
  /**
   * The information related to fields used in the engine.
   */
  fields: FieldsState;
}

export interface ConfigurationState {
  /**
   * The unique identifier of the target Coveo Cloud organization (e.g., `mycoveocloudorganizationg8tp8wu3`)
   */
  organizationId: string;
  /**
   * The access token to use to authenticate requests against the Coveo Cloud endpoints. Typically, this will be an API key or search token that grants the privileges to execute queries and push usage analytics data in the target Coveo Cloud organization.
   */
  accessToken: string;
  /**
   * The global headless engine Search API configuration.
   */
  search: {
    /**
     * The Search API base URL to use (e.g., https://globalplatform.cloud.coveo.com/rest/search/v2).
     */
    searchApiBaseUrl: string;
  };
  /**
   * Specifies if analytics tracking should be enabled. By default analytics events are tracked.
   */
  analyticsEnabled: boolean;
}

export interface QueryState {
  /**
   * The basic query expression, typically the keywords entered by the end user in a query box.
   */
  q: string;
  /**
   * The advanced query expression, typically generated by code
   */
  aq: string;
  /**
   * The constant query expression, typically populated with expressions that must apply to all queries sent from a specific search interface.
   *
   * Once evaluated, the result sets of those expressions are kept in a special cache.
   * Tip: Avoid including dynamic content in the constant query expression. Otherwise you risk filling up the cache with useless data, which can have a negative impact on performance.
   */
  cq: string;
  /**
   * The disjunction query expression, typically populated by Coveo ML automatic relevance tuning models to ensure that relevant items are included in the query results.
   *
   * The disjunction query expression is merged with the other parts of the query expression using an OR operator. The resulting query expression is (((q aq) OR (dq)) cq).
   */
  dq: string;
  /**
   * The large query expression, typically populated with a case description, long textual query, or any other form of text that can help refine a query.
   *
   * The Coveo ML Intelligent Term Detection (ITD) feature can extract relevant keywords from the large query expression and inject those keywords in the basic query expression (see the q parameter).
   */
  lq: string;
}

export interface RedirectionState {
  /**
   * The URL to redirect the user to.
   */
  redirectTo: string | null;
}

export type QuerySuggestSet = Record<string, QuerySuggestState | undefined>;

export interface QuerySuggestState {
  /**
   * The unique identifier of the query suggest entity (e.g., `b953ab2e-022b-4de4-903f-68b2c0682942`).
   */
  id: string;
  /**
   * The current list of query suggestions.
   */
  completions: QuerySuggestCompletion[];
  /**
   * The partial basic query expression for which query suggestions were requested (e.g., `cov`).
   */
  q: string;
  /**
   * The number of query suggestions requested from Coveo ML (e.g., `3`).
   */
  count: number;
  /**
   * The unique identifier of the current query suggestion request.
   */
  currentRequestId: string;
  error: SearchAPIErrorWithStatusCode | null;
}
