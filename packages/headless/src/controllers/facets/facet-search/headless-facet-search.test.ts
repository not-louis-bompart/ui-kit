import {
  buildFacetSearch,
  FacetSearch,
  FacetSearchProps,
} from './headless-facet-search';
import {buildMockEngine, MockEngine} from '../../../test/mock-engine';
import {
  registerFacetSearch,
  updateFacetSearch,
  executeFacetSearch,
  selectFacetSearchResult,
  incrementPagingFacetSearch,
} from '../../../features/facets/facet-search-set/facet-search-actions';
import {buildMockFacetSearchResponse} from '../../../test/mock-facet-search-response';
import {buildFacetSearchState} from '../../../features/facets/facet-search-set/facet-search-set-slice';
import {buildMockFacetSearchResult} from '../../../test/mock-facet-search-result';
import {executeSearch} from '../../../features/search/search-actions';

describe('FacetSearch', () => {
  let props: FacetSearchProps;
  let engine: MockEngine;
  let controller: FacetSearch;

  function initFacetSearch() {
    controller = buildFacetSearch(engine, props);
  }

  function getFacetId() {
    return props.options.facetId;
  }

  beforeEach(() => {
    props = {
      options: {
        facetId: '',
      },
    };

    engine = buildMockEngine();
    initFacetSearch();
  });

  it('on init, it dispatches a #registerFacetSearch action with the specified options', () => {
    expect(engine.actions).toContainEqual(registerFacetSearch(props.options));
  });

  it('#updateText dispatches #updateFacetSearch with the text wrapped by asterixes', () => {
    const text = 'apple';
    controller.updateText(text);

    const facetId = getFacetId();
    const action = updateFacetSearch({facetId, query: `*${text}*`});

    expect(engine.actions).toContainEqual(action);
  });

  it('#showMoreResults, dispatches #incrementPagingFacetSearch action with the specified options', () => {
    const pageIncrement = 1;
    controller.showMoreResults();

    const facetId = getFacetId();
    const action = incrementPagingFacetSearch({
      facetId,
      pageIncrement,
    });

    expect(engine.actions).toContainEqual(action);
  });

  it('#showLessResults, dispatches #incrementPagingFacetSearch action with the specified options', () => {
    const pageIncrement = -1;
    controller.showLessResults();

    const facetId = getFacetId();
    const action = incrementPagingFacetSearch({
      facetId,
      pageIncrement,
    });

    expect(engine.actions).toContainEqual(action);
  });

  it('#resetResults, dispatches #updateFacetSearch action with the specified options', () => {
    const currentPage = 1;
    controller.resetResults();
    const facetId = getFacetId();
    const action = updateFacetSearch({
      facetId,
      currentPage,
    });

    expect(engine.actions).toContainEqual(action);
  });

  it('#setPageSize, dispatches #updateFacetSearch action with the specified options', () => {
    const pageSize = 7;
    controller.setPageSize(pageSize);
    const facetId = getFacetId();
    const action = updateFacetSearch({
      facetId,
      pageSize,
    });

    expect(engine.actions).toContainEqual(action);
  });

  it('#search dispatches #executeFacetSearch action', () => {
    controller.search();
    const action = engine.actions.find(
      (a) => a.type === executeFacetSearch.pending.type
    );

    expect(action).toBeTruthy();
  });

  it('#select dispatches #selectFacetSearchResult action', () => {
    const value = buildMockFacetSearchResult();
    controller.select(value);

    const action = selectFacetSearchResult({facetId: getFacetId(), value});
    expect(engine.actions).toContainEqual(action);
  });

  it('#select dispatches #executeSearch', () => {
    const value = buildMockFacetSearchResult();
    controller.select(value);

    const action = engine.actions.find(
      (a) => a.type === executeSearch.pending.type
    );
    expect(action).toBeTruthy();
  });

  it('calling #state returns the response', () => {
    const facetId = getFacetId();
    const response = {
      ...buildMockFacetSearchResponse(),
      pageSize: 10,
      currentPage: 1,
    };

    engine.state.facetSearchSet[facetId] = buildFacetSearchState({response});
    expect(controller.state).toEqual(response);
  });
});
