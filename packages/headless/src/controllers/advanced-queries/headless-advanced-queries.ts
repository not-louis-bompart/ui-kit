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

  return {
    ...controller,

    get state() {
      return engine.state.querySet;
    },

    addAdvancedQuery(expression: string, id = randomID('advanced-query')) {
      dispatch(registerQuerySetAdvancedQuery({id, expression}));
    },

    updateAdvancedQuery(expression: string, id: string) {
      dispatch(updateQuerySetAdvancedQuery({expression, id}));
    },

    removeAdvancedQuery(id: string) {
      dispatch(removeQuerySetAdvancedQuery({id}));
    },

    findAdvancedQueryIDByExpression(expression: string) {
      return findByExpression(this.state, 'aq', expression);
    },

    addConstantQuery(expression: string, id = randomID('constant-query')) {
      dispatch(registerQuerySetConstantQuery({id, expression}));
    },

    updateConstantQuery(expression: string, id: string) {
      dispatch(updateQuerySetConstantQuery({expression, id}));
    },

    removeConstantQuery(id: string) {
      dispatch(removeQuerySetConstantQuery({id}));
    },

    findConstantQueryIDByExpression(expression: string) {
      return findByExpression(this.state, 'cq', expression);
    },

    addDisjunctionQuery(
      expression: string,
      id = randomID('disjunction-query')
    ) {
      dispatch(registerQuerySetDisjunctionQuery({id, expression}));
    },

    updateDisjunctionQuery(expression: string, id: string) {
      dispatch(updateQuerySetDisjunctionQuery({expression, id}));
    },

    removeDisjunctionQuery(id: string) {
      dispatch(removeQuerySetDisjunctionQuery({id}));
    },

    findDisjunctionQueryIDByExpression(expression: string) {
      return findByExpression(this.state, 'dq', expression);
    },

    addLargeQuery(expression: string, id = randomID('large-query')) {
      dispatch(registerQuerySetLargeQuery({id, expression}));
    },

    updateLargeQuery(expression: string, id: string) {
      dispatch(updateQuerySetLargeQuery({expression, id}));
    },

    removeLargeQuery(id: string) {
      dispatch(removeQuerySetLargeQuery({id}));
    },

    findLargeQueryIDByExpression(expression: string) {
      return findByExpression(this.state, 'lq', expression);
    },
  };
}
