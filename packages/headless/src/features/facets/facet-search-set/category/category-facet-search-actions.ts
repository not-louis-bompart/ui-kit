import {createAction} from '@reduxjs/toolkit';
import {FacetSearchOptions} from '../facet-search-request-options';
import {CategoryFacetSearchResult} from '../../../../api/search/facet-search/category-facet-search/category-facet-search-response';

/** Selects the corresponding category facet value for the provided
 * category facet search result */
export const selectCategoryFacetSearchResult = createAction<{
  facetId: string;
  value: CategoryFacetSearchResult;
}>('categoryFacet/selectSearchResult');

/**
 * Register a category facet search in the category facet search set.
 * @param {FacetSearchOptions} FacetSearchOptions The options to register the facet search with.
 */
export const registerCategoryFacetSearch = createAction<FacetSearchOptions>(
  'categoryFacetSearch/register'
);
