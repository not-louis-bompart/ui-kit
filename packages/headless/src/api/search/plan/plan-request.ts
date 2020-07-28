import {SearchPageState} from '../../../state';
import {
  getQParam,
  getOrganizationIdParam,
  getAdvancedQueries,
} from '../search-request';

export const planRequestParams = (state: SearchPageState) => ({
  ...getQParam(state),
  ...getOrganizationIdParam(state),
  ...getAdvancedQueries(state),
  context: state.context.contextValues,
  pipeline: state.pipeline,
});

export type PlanRequestParams = ReturnType<typeof planRequestParams>;
