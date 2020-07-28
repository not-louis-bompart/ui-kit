import {
  querySetReducer,
  QuerySetState,
  getQuerySetInitialState,
} from './query-set-slice';
import {
  registerQuerySetQuery,
  registerQuerySetAdvancedQuery,
  registerQuerySetConstantQuery,
  registerQuerySetDisjunctionQuery,
  registerQuerySetLargeQuery,
  updateQuerySetQuery,
  updateQuerySetAdvancedQuery,
  updateQuerySetConstantQuery,
  updateQuerySetDisjunctionQuery,
  updateQuerySetLargeQuery,
  removeQuerySetAdvancedQuery,
  removeQuerySetConstantQuery,
  removeQuerySetDisjunctionQuery,
  removeQuerySetLargeQuery,
  removeQuerySetQuery,
} from './query-set-actions';
import {selectQuerySuggestion} from '../query-suggest/query-suggest-actions';
import {getHistoryEmptyState} from '../history/history-slice';
import {change} from '../history/history-actions';

describe('querySet slice', () => {
  let state: QuerySetState;

  function registerEmptyQueryWithId(id: string) {
    const action = registerQuerySetQuery({id, expression: ''});
    state = querySetReducer(state, action);
  }

  const advancedQueriesTestCases = {
    q: {
      register: registerQuerySetQuery,
      update: updateQuerySetQuery,
      remove: removeQuerySetQuery,
    },
    aq: {
      register: registerQuerySetAdvancedQuery,
      update: updateQuerySetAdvancedQuery,
      remove: removeQuerySetAdvancedQuery,
    },
    cq: {
      register: registerQuerySetConstantQuery,
      update: updateQuerySetConstantQuery,
      remove: removeQuerySetConstantQuery,
    },
    dq: {
      register: registerQuerySetDisjunctionQuery,
      update: updateQuerySetDisjunctionQuery,
      remove: removeQuerySetDisjunctionQuery,
    },
    lq: {
      register: registerQuerySetLargeQuery,
      update: updateQuerySetLargeQuery,
      remove: removeQuerySetLargeQuery,
    },
  };

  beforeEach(() => {
    state = getQuerySetInitialState();
  });

  it('initializes the reducer with the initial state', () => {
    const finalState = querySetReducer(undefined, {type: ''});
    expect(finalState).toEqual(getQuerySetInitialState());
  });

  it('registers all advanced queries', () => {
    for (const [section, {register}] of Object.entries(
      advancedQueriesTestCases
    )) {
      const param = section as keyof QuerySetState;
      const id = '1';
      const expression = 'query';

      const finalState = querySetReducer(state, register({id, expression}));

      expect(finalState[param][id]).toBe(expression);
    }
  });

  it('does not register a second advanced query on the same id', () => {
    for (const [section, {register}] of Object.entries(
      advancedQueriesTestCases
    )) {
      const param = section as keyof QuerySetState;
      const id = '1';
      const expression = 'query';

      state = querySetReducer(state, register({id, expression: ''}));
      const finalState = querySetReducer(state, register({id, expression}));

      expect(finalState[param][id]).toBe(state[param][id]);
    }
  });

  it('does not update the advanced query if the id does not exist', () => {
    for (const [section, {update}] of Object.entries(
      advancedQueriesTestCases
    )) {
      const param = section as keyof QuerySetState;
      const id = '1';
      const expression = 'query';

      const finalState = querySetReducer(state, update({id, expression}));
      expect(finalState[param][id]).toBe(undefined);
    }
  });

  it('updates the advanced query if the id exists', () => {
    for (const [section, {register, update}] of Object.entries(
      advancedQueriesTestCases
    )) {
      const param = section as keyof QuerySetState;
      const id = '1';
      const expression = 'query';

      state = querySetReducer(state, register({id, expression: ''}));
      const finalState = querySetReducer(state, update({id, expression}));

      expect(finalState[param][id]).toBe(expression);
    }
  });

  it('removes the advanced query if the id exists', () => {
    for (const [section, {register, remove}] of Object.entries(
      advancedQueriesTestCases
    )) {
      const param = section as keyof QuerySetState;
      const id = '1';

      state = querySetReducer(state, register({id, expression: ''}));
      const finalState = querySetReducer(state, remove({id}));

      expect(finalState[param][id]).toBe(undefined);
    }
  });

  it('does nothing when removing an advanced query that does not exists', () => {
    for (const [section, {remove}] of Object.entries(
      advancedQueriesTestCases
    )) {
      const param = section as keyof QuerySetState;
      const id = '1';

      const finalState = querySetReducer(state, remove({id}));
      expect(finalState[param][id]).toEqual(state[param][id]);
    }
  });

  it(`when a query suggestion is selected,
  it updates the query if the id exists`, () => {
    const id = '1';
    const expression = 'query';

    registerEmptyQueryWithId(id);
    const action = selectQuerySuggestion({id, expression});
    const finalState = querySetReducer(state, action);

    expect(finalState.q[id]).toBe(expression);
  });

  it(`when a query suggestion is selected,
  it does not update the query if the id does not exist`, () => {
    const id = '1';

    const action = selectQuerySuggestion({id, expression: 'query'});
    const finalState = querySetReducer(state, action);

    expect(finalState.q[id]).toBe(undefined);
  });

  it('allows to restore a query set on history change', () => {
    registerEmptyQueryWithId('foo');
    registerEmptyQueryWithId('hello');

    const expectedQuerySet = {
      ...getQuerySetInitialState(),
      q: {foo: 'bar', hello: 'world'},
    };
    const historyChange = {
      ...getHistoryEmptyState(),
      querySet: expectedQuerySet,
    };

    const nextState = querySetReducer(
      state,
      change.fulfilled(historyChange, '')
    );

    expect(nextState).toEqual(expectedQuerySet);
  });
});
