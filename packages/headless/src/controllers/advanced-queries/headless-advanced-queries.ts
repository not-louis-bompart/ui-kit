import {Engine} from '../../app/headless-engine';
import {buildController} from '../controller/headless-controller';
import {
  registerQuerySetAdvancedQuery,
  removeQuerySetAdvancedQuery,
  updateQuerySetAdvancedQuery,
  registerQuerySetConstantQuery,
  updateQuerySetConstantQuery,
  removeQuerySetConstantQuery,
  registerQuerySetDisjunctionQuery,
  removeQuerySetDisjunctionQuery,
  updateQuerySetDisjunctionQuery,
  registerQuerySetLargeQuery,
  updateQuerySetLargeQuery,
  removeQuerySetLargeQuery,
} from '../../features/query-set/query-set-actions';
import {randomID} from '../../utils/utils';
import {QuerySetState} from '../../features/query-set/query-set-slice';
import {
  updateAdvancedQuery,
  updateConstantQuery,
  updateDisjunctionQuery,
  updateLargeQuery,
} from '../../features/query/query-actions';

export function buildAdvancedQueries(engine: Engine) {
  const controller = buildController(engine);
  const {dispatch} = engine;

  const findByExpression = (
    s: QuerySetState,
    section: keyof QuerySetState,
    expression: string
  ) => {
    for (const [id, currentExpression] of Object.entries(s[section])) {
      if (currentExpression === expression) {
        return id;
      }
    }
    return null;
  };

  const getFilter = (s: QuerySetState, section: keyof QuerySetState) => {
    return Object.values(s[section]).join(' ');
  };

  return {
    ...controller,

    get state() {
      return engine.state.querySet;
    },

    addAdvancedQuery(expression: string, id = randomID('advanced-query')) {
      dispatch(registerQuerySetAdvancedQuery({id, expression}));
      dispatch(updateAdvancedQuery({aq: getFilter(this.state, 'aq')}));
    },

    updateAdvancedQuery(expression: string, id: string) {
      dispatch(updateQuerySetAdvancedQuery({expression, id}));
      dispatch(updateAdvancedQuery({aq: getFilter(this.state, 'aq')}));
    },

    removeAdvancedQuery(id: string) {
      dispatch(removeQuerySetAdvancedQuery({id}));
      dispatch(updateAdvancedQuery({aq: getFilter(this.state, 'aq')}));
    },

    findAdvancedQueryIDByExpression(expression: string) {
      return findByExpression(this.state, 'aq', expression);
    },

    addConstantQuery(expression: string, id = randomID('constant-query')) {
      dispatch(registerQuerySetConstantQuery({id, expression}));
      dispatch(updateConstantQuery({cq: getFilter(this.state, 'cq')}));
    },

    updateConstantQuery(expression: string, id: string) {
      dispatch(updateQuerySetConstantQuery({expression, id}));
      dispatch(updateConstantQuery({cq: getFilter(this.state, 'cq')}));
    },

    removeConstantQuery(id: string) {
      dispatch(removeQuerySetConstantQuery({id}));
      dispatch(updateConstantQuery({cq: getFilter(this.state, 'cq')}));
    },

    findConstantQueryIDByExpression(expression: string) {
      return findByExpression(this.state, 'cq', expression);
    },

    addDisjunctionQuery(
      expression: string,
      id = randomID('disjunction-query')
    ) {
      dispatch(registerQuerySetDisjunctionQuery({id, expression}));
      dispatch(updateDisjunctionQuery({dq: getFilter(this.state, 'dq')}));
    },

    updateDisjunctionQuery(expression: string, id: string) {
      dispatch(updateQuerySetDisjunctionQuery({expression, id}));
      dispatch(updateDisjunctionQuery({dq: getFilter(this.state, 'dq')}));
    },

    removeDisjunctionQuery(id: string) {
      dispatch(removeQuerySetDisjunctionQuery({id}));
      dispatch(updateDisjunctionQuery({dq: getFilter(this.state, 'dq')}));
    },

    findDisjunctionQueryIDByExpression(expression: string) {
      return findByExpression(this.state, 'dq', expression);
    },

    addLargeQuery(expression: string, id = randomID('large-query')) {
      dispatch(registerQuerySetLargeQuery({id, expression}));
      dispatch(updateLargeQuery({lq: getFilter(this.state, 'lq')}));
    },

    updateLargeQuery(expression: string, id: string) {
      dispatch(updateQuerySetLargeQuery({expression, id}));
      dispatch(updateLargeQuery({lq: getFilter(this.state, 'lq')}));
    },

    removeLargeQuery(id: string) {
      dispatch(removeQuerySetLargeQuery({id}));
      dispatch(updateLargeQuery({lq: getFilter(this.state, 'lq')}));
    },

    findLargeQueryIDByExpression(expression: string) {
      return findByExpression(this.state, 'lq', expression);
    },
  };
}
