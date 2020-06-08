import {SearchBox, SearchBoxOptions} from './headless-search-box';
import {
  registerQuerySuggest,
  clearQuerySuggest,
  clearQuerySuggestCompletions,
  fetchQuerySuggestions,
  selectQuerySuggestion,
} from '../../features/query-suggest/query-suggest-actions';
import {checkForRedirection} from '../../features/redirection/redirection-actions';
import {createMockState} from '../../test/mock-state';
import {executeSearch} from '../../features/search/search-actions';
import {updateQuery} from '../../features/query/query-actions';
import {
  registerQuerySetQuery,
  updateQuerySetQuery,
} from '../../features/query-set/query-set-actions';
import {buildMockQuerySuggest} from '../../test/mock-query-suggest';
import {buildMockEngine, MockEngine} from '../../test/mock-engine';
import {HeadlessState} from '../../state';

describe('headless searchBox', () => {
  const id = 'search-box-123';
  let state: HeadlessState;

  let engine: MockEngine;
  let searchBox: SearchBox;
  let searchBoxOptions: SearchBoxOptions;

  beforeEach(() => {
    searchBoxOptions = {
      id,
      isStandalone: true,
      numberOfSuggestions: 10,
    };

    initState();
    initComponent();
  });

  function initState() {
    state = createMockState();
    state.redirection.redirectTo = 'coveo.com';
    state.querySet[id] = 'query';
    state.querySuggest[id] = buildMockQuerySuggest({id, q: 'some value'});
  }

  function initComponent() {
    engine = buildMockEngine({state});
    searchBox = new SearchBox(engine, searchBoxOptions);
  }

  it('should return the right state', () => {
    expect(searchBox.state).toEqual({
      value: state.querySet[id],
      suggestions: state.querySuggest[id]!.completions.map((completion) => ({
        value: completion.expression,
      })),
      redirectTo: state.redirection.redirectTo,
    });
  });

  it('should dispatch a registerQuerySetQuery action at initialization', () => {
    const action = registerQuerySetQuery({id: searchBox.id, query: ''});
    expect(engine.actions).toContainEqual(action);
  });

  it('should dispatch a registerQuerySuggest action at initialization', () => {
    expect(engine.actions).toContainEqual(
      registerQuerySuggest({
        id: searchBox.id,
        q: state.query.q,
        count: searchBoxOptions.numberOfSuggestions,
      })
    );
  });

  describe('when calling updateText', () => {
    it('updates the search box query in the querySet', () => {
      const text = 'query';
      searchBox.updateText(text);

      const action = updateQuerySetQuery({id: searchBox.id, query: text});
      expect(engine.actions).toContainEqual(action);
    });

    it(`when the numberOfQuerySuggestions option is higher than 0
    should call the showSuggestions method`, () => {
      jest.spyOn(searchBox, 'showSuggestions');
      searchBox.updateText('how can i fix');

      expect(searchBox.showSuggestions).toHaveBeenCalled();
    });

    it(`when the numberOfQuerySuggestions option is 0
    should not call the showSuggestions method`, () => {
      searchBoxOptions.numberOfSuggestions = 0;
      initComponent();

      jest.spyOn(searchBox, 'showSuggestions');
      searchBox.updateText('how can i fix');

      expect(searchBox.showSuggestions).not.toHaveBeenCalled();
    });
  });

  it(`when calling clear
    should dispatch a clearQuerySuggest action`, () => {
    searchBox.clear();
    expect(engine.actions).toContainEqual(
      clearQuerySuggest({id: searchBox.id})
    );
  });

  it(`when calling hideSuggestions
    should dispatch a clearQuerySuggestCompletions action`, () => {
    searchBox.hideSuggestions();
    expect(engine.actions).toContainEqual(
      clearQuerySuggestCompletions({id: searchBox.id})
    );
  });

  it(`when calling showSuggestions
    should dispatch a fetchQuerySuggestions action`, async () => {
    searchBox.showSuggestions();

    const action = engine.actions.find(
      (a) => a.type === fetchQuerySuggestions.pending.type
    );
    expect(action).toEqual(
      fetchQuerySuggestions.pending(action!.meta.requestId, {id: searchBox.id})
    );
  });

  it(`when calling selectSuggestion
    should dispatch a selectQuerySuggestion action`, () => {
    const value = 'i like this expression';
    searchBox.selectSuggestion(value);

    expect(engine.actions).toContainEqual(
      selectQuerySuggestion({id: searchBox.id, expression: value})
    );
  });

  describe('when calling submit', () => {
    it('sets the query to the search box value kept in the querySet', () => {
      const expectedQuery = state.querySet[searchBox.id];
      searchBox.submit();

      expect(engine.actions).toContainEqual(updateQuery({q: expectedQuery}));
    });

    it(`when the isStandalone option is true
    should dispatch a checkForRedirection action`, () => {
      searchBox.submit();

      const action = engine.actions.find(
        (a) => a.type === checkForRedirection.pending.type
      );
      expect(action).toBeTruthy();
    });

    it(`when the isStandalone option is false
    it dispatches an executeSearch action`, () => {
      searchBoxOptions.isStandalone = false;
      initComponent();
      searchBox.submit();

      const action = engine.actions.find(
        (a) => a.type === executeSearch.pending.type
      );
      expect(action).toBeTruthy();
    });
  });
});