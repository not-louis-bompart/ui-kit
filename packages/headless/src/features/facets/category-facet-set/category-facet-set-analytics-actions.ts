import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  makeSearchActionType,
  searchPageState,
} from '../../analytics/analytics-actions';
import {configureAnalytics} from '../../../api/analytics/analytics';
import {FacetUpdateSortMetadata} from '../facet-set/facet-set-analytics-actions';
import {SearchPageState} from '../../../state';

/**
 * Log a category facet sort change.
 */
export const logCategoryFacetUpdateSort = createAsyncThunk(
  'analytics/categoryFacet/sortChange',
  async (payload: FacetUpdateSortMetadata, {getState}) => {
    const {facetId, criterion} = payload;
    const state = searchPageState(getState);

    const base = buildCategoryFacetBaseMetadata(facetId, state);
    const metadata = {...base, criteria: criterion};

    await configureAnalytics(state).logFacetUpdateSort(metadata);
    return makeSearchActionType();
  }
);

function buildCategoryFacetBaseMetadata(
  facetId: string,
  state: SearchPageState
) {
  const facetField = state.categoryFacetSet[facetId].field;
  const facetTitle = `${facetField}_${facetId}`;

  return {facetId, facetField, facetTitle};
}
