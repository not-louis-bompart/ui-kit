import {Engine} from '../../../app/headless-engine';
import {
  FacetSearchOptions,
  registerFacetSearch,
  updateFacetSearch,
  executeFacetSearch,
  selectFacetSearchResult,
  incrementPagingFacetSearch,
} from '../../../features/facets/facet-search-set/facet-search-actions';
import {FacetSearchResult} from '../../../api/search/facet-search/facet-search-response';
import {executeSearch} from '../../../features/search/search-actions';
import {logFacetSelect} from '../../../features/facets/facet-set/facet-set-analytics-actions';

export interface FacetSearchProps {
  options: FacetSearchOptions;
}

export type FacetSearch = ReturnType<typeof buildFacetSearch>;

export function buildFacetSearch(engine: Engine, props: FacetSearchProps) {
  const dispatch = engine.dispatch;
  const facetId = props.options.facetId;

  dispatch(registerFacetSearch(props.options));

  return {
    /** Updates the facet search query.
     * @param text The new query.
     */
    updateText(text: string) {
      const query = `*${text}*`;
      dispatch(updateFacetSearch({facetId, query}));
    },
    /**
     * Increases number of results returned by facet search by pageSize
     */
    showMoreResults() {
      dispatch(incrementPagingFacetSearch({facetId, pageIncrement: 1}));
    },
    /**
     * Decreases number of results returned by facet search by pageSize
     */
    showLessResults() {
      dispatch(incrementPagingFacetSearch({facetId, pageIncrement: -1}));
    },
    /**
     * Resets number of results returned by facet search to pageSize
     */
    resetResults() {
      dispatch(updateFacetSearch({facetId, currentPage: 1}));
    },
    /**
     * Update the facet search page size
     * @param pageSize number of results to be returned per page
     */
    setPageSize(pageSize: number) {
      dispatch(updateFacetSearch({facetId, pageSize}));
    },
    /** Executes a facet search to update the values.*/
    search() {
      dispatch(executeFacetSearch(facetId));
    },
    /** Selects a search result.*/
    select(value: FacetSearchResult) {
      dispatch(selectFacetSearchResult({facetId, value}));
      dispatch(
        executeSearch(logFacetSelect({facetId, facetValue: value.rawValue}))
      );
    },
    get state() {
      const facetSearch = engine.state.facetSearchSet[facetId];
      return {
        ...facetSearch.response,
        currentPage: facetSearch.options.currentPage,
        pageSize: facetSearch.options.pageSize,
      };
    },
  };
}
