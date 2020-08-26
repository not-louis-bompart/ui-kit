import {
  buildCategoryFacet,
  CategoryFacet,
  CategoryFacetOptions,
} from './headless-category-facet';
import {SearchPageState} from '../../../state';
import {buildMockEngine, createMockState, MockEngine} from '../../../test';
import {
  registerCategoryFacet,
  toggleSelectCategoryFacetValue,
  updateCategoryFacetSortCriterion,
} from '../../../features/facets/category-facet-set/category-facet-set-actions';
import {buildMockCategoryFacetValue} from '../../../test/mock-category-facet-value';
import {buildMockCategoryFacetResponse} from '../../../test/mock-category-facet-response';
import {executeSearch} from '../../../features/search/search-actions';
import {
  CategoryFacetRequest,
  CategoryFacetSortCriterion,
} from '../../../features/facets/category-facet-set/interfaces/request';
import {buildMockCategoryFacetRequest} from '../../../test/mock-category-facet-request';

describe('category facet', () => {
  const facetId = '1';
  let options: CategoryFacetOptions;
  let state: SearchPageState;
  let engine: MockEngine;
  let categoryFacet: CategoryFacet;

  function initCategoryFacet() {
    engine = buildMockEngine({state});
    categoryFacet = buildCategoryFacet(engine, {options});
  }

  function setFacetRequest(config: Partial<CategoryFacetRequest> = {}) {
    state.categoryFacetSet[facetId] = buildMockCategoryFacetRequest({
      facetId,
      ...config,
    });
  }

  beforeEach(() => {
    options = {
      facetId,
      field: 'geography',
    };

    state = createMockState();
    setFacetRequest();
    initCategoryFacet();
  });

  it('registers a category facet with the passed options', () => {
    const action = registerCategoryFacet({facetId, ...options});
    expect(engine.actions).toContainEqual(action);
  });

  it('is subscribable', () => {
    expect(categoryFacet.subscribe).toBeDefined();
  });

  describe('when the search response is empty', () => {
    it('#state.values is an empty array', () => {
      expect(state.search.response.facets).toEqual([]);
      expect(categoryFacet.state.values).toEqual([]);
    });

    it('#state.parents is an empty array', () => {
      expect(categoryFacet.state.parents).toEqual([]);
    });
  });

  it(`when the search response has a category facet with a single level of values,
  #state.values contains the same values`, () => {
    const values = [buildMockCategoryFacetValue()];
    const response = buildMockCategoryFacetResponse({facetId, values});

    state.search.response.facets = [response];
    expect(categoryFacet.state.values).toBe(values);
  });

  describe('when the search response has a category facet with nested values', () => {
    const innerValues = [
      buildMockCategoryFacetValue({value: 'C'}),
      buildMockCategoryFacetValue({value: 'D'}),
    ];
    const middleValue = buildMockCategoryFacetValue({
      value: 'B',
      children: innerValues,
    });
    const outerValue = buildMockCategoryFacetValue({
      value: 'A',
      children: [middleValue],
    });

    beforeEach(() => {
      const response = buildMockCategoryFacetResponse({
        facetId,
        values: [outerValue],
      });
      state.search.response.facets = [response];
    });

    it('#state.values contains the innermost values', () => {
      expect(categoryFacet.state.values).toBe(innerValues);
    });

    it('#state.parents contains the outer and middle values', () => {
      expect(categoryFacet.state.parents).toEqual([outerValue, middleValue]);
    });
  });

  describe('#toggleSelect', () => {
    it('dispatches #toggleCategoryFacetValue with the passed selection', () => {
      const selection = buildMockCategoryFacetValue({value: 'A'});
      categoryFacet.toggleSelect(selection);

      const action = toggleSelectCategoryFacetValue({facetId, selection});
      expect(engine.actions).toContainEqual(action);
    });

    it('executes a search', () => {
      const selection = buildMockCategoryFacetValue({value: 'A'});
      categoryFacet.toggleSelect(selection);

      const action = engine.actions.find(
        (a) => a.type === executeSearch.pending.type
      );
      expect(action).toBeTruthy();
    });
  });

  it('#sortBy dispatches #toggleCategoryFacetValue with the passed selection', () => {
    const sortCriterion: CategoryFacetSortCriterion = 'alphanumeric';
    categoryFacet.sortBy(sortCriterion);
    const action = updateCategoryFacetSortCriterion({
      facetId,
      criterion: sortCriterion,
    });
    expect(engine.actions).toContainEqual(action);
  });

  it('#isSortedBy returns correct value', () => {
    expect(categoryFacet.isSortedBy('alphanumeric')).toBeFalsy();
    expect(categoryFacet.isSortedBy('occurrences')).toBeTruthy();
  });
});
