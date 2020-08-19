import {Engine} from '../../../app/headless-engine';
import {
  FacetSearchOptions,
  registerFacetSearch,
  updateFacetSearch,
  executeFacetSearch,
  selectFacetSearchResult,
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

  const getFacetSearch = () => {
    return engine.state.facetSearchSet[facetId];
  };

  return {
    /** Updates the facet search query.
     * @param text The new query.
     */
    updateText(text: string) {
      const {numberOfValues: pageSize} = props.options;
      const initialNumber = pageSize || 10; // hard coded default value of 10

      const query = `*${text}*`;
      dispatch(
        updateFacetSearch({facetId, query, numberOfValues: initialNumber})
      );
    },
    /**
     * Increases number of results returned by numberOfResults
     */
    showMoreResults() {
      const {numberOfValues: pageSize} = props.options;
      const {numberOfValues} = getFacetSearch().options;

      const increment = pageSize || 10; // hard coded default value of 10

      dispatch(
        updateFacetSearch({facetId, numberOfValues: numberOfValues + increment})
      );
      dispatch(executeFacetSearch(facetId));
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
      const facetSearch = getFacetSearch();
      return {
        ...facetSearch.response,
      };
    },
  };
}
