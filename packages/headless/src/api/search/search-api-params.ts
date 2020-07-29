import {SearchPageState} from '../../state';
import {HttpMethods, HTTPContentTypes} from '../platform-client';

export const getOrganizationIdParam = (state: SearchPageState) => ({
  /**
   * The unique identifier of the target Coveo Cloud organization.
   */
  organizationId: state.configuration.organizationId,
});

export const getQParam = (state: SearchPageState) => ({
  /**
   * The basic query expression, typically the keywords entered by the end user in a query box.
   */
  q: state.query.q,
  /**
   * The advanced query expression, typically generated by code
   */
  aq: state.query.aq,
  /**
   * The constant query expression, typically populated with expressions that must apply to all queries sent from a specific search interface.
   *
   * Once evaluated, the result sets of those expressions are kept in a special cache.
   * Tip: Avoid including dynamic content in the constant query expression. Otherwise you risk filling up the cache with useless data, which can have a negative impact on performance.
   */
  cq: state.query.cq,
  /**
   * The disjunction query expression, typically populated by Coveo ML automatic relevance tuning models to ensure that relevant items are included in the query results.
   *
   * The disjunction query expression is merged with the other parts of the query expression using an OR operator. The resulting query expression is (((q aq) OR (dq)) cq).
   */
  dq: state.query.dq,
  /**
   * The large query expression, typically populated with a case description, long textual query, or any other form of text that can help refine a query.
   *
   * The Coveo ML Intelligent Term Detection (ITD) feature can extract relevant keywords from the large query expression and inject those keywords in the basic query expression (see the q parameter).
   */
  lq: state.query.lq,
});

const getAccessToken = (state: SearchPageState) =>
  state.configuration.accessToken;
const getSearchApiBaseUrl = (state: SearchPageState) =>
  state.configuration.search.searchApiBaseUrl;

export const baseSearchParams = (
  state: SearchPageState,
  method: HttpMethods,
  contentType: HTTPContentTypes,
  path: string
) => ({
  accessToken: getAccessToken(state),
  method,
  contentType,
  url: `${getSearchApiBaseUrl(state)}${path}`,
});
