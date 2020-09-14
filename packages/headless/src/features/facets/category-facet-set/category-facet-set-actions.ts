import {createAction} from '@reduxjs/toolkit';
import {CategoryFacetRegistrationOptions} from './interfaces/options';
import {CategoryFacetValue} from './interfaces/response';
import {
  deselectAllFacetValues,
  updateFacetNumberOfValues,
} from '../facet-set/facet-set-actions';
import {CategoryFacetSortCriterion} from './interfaces/request';
import {CategoryFacetSearchResult} from '../../../api/search/facet-search/category-facet-search/category-facet-search-response';

/**
 * Register a category facet in the category facet set.
 * @param {CategoryFacetRegistrationOptions} CategoryFacetRegistrationOptions The options to register the category facet with.
 */
export const registerCategoryFacet = createAction<
  CategoryFacetRegistrationOptions
>('categoryFacet/register');

/**
 * Select (unselect) a category facet value if unselected (selected).
 */
export const toggleSelectCategoryFacetValue = createAction<{
  facetId: string;
  selection: CategoryFacetValue;
}>('categoryFacet/toggleSelectValue');

/** Deselects all values of a category facet.*/
export const deselectAllCategoryFacetValues = deselectAllFacetValues;

/** Updates the number of values of a category facet. */
export const updateCategoryFacetNumberOfValues = updateFacetNumberOfValues;

/** Selects the corresponding category facet value for the provided
 * category facet search result */
export const selectCategoryFacetSearchResult = createAction<{
  facetId: string;
  numberOfValues: number;
  searchResult: CategoryFacetSearchResult;
}>('categoryFacet/selectSearchResult');

/**
 * Updates the the sort criterion for the category facet
 */
export const updateCategoryFacetSortCriterion = createAction<{
  facetId: string;
  criterion: CategoryFacetSortCriterion;
}>('categoryFacet/updateSortCriterion');
