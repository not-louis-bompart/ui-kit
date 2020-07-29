import {SearchPageState} from '../../../state';
import {getQParam, getOrganizationIdParam} from '../search-api-params';

export const planRequestParams = (state: SearchPageState) => ({
  ...getQParam(state),
  ...getOrganizationIdParam(state),
  context: state.context.contextValues,
  pipeline: state.pipeline,
});

export type PlanRequestParams = ReturnType<typeof planRequestParams>;
