import {createAsyncThunk} from '@reduxjs/toolkit';
import {DateFacetValue} from './interfaces/response';
import {AsyncThunkSearchOptions} from '../../../../api/search/search-api-client';
import {
  ConfigurationSection,
  DateFacetSection,
} from '../../../../state/state-sections';
import {executeToggleRangeFacetSelect} from '../generic/range-facet-controller-actions';
import {toggleSelectDateFacetValue} from './date-facet-actions';

/**
 * Toggles the date facet value and then executes a search with the appropriate analytics tag.
 * @param facetId (string) The unique identifier of the facet (e.g., `"1"`).
 * @param selection (DateFacetValue) The target date facet value.
 */
export const executeToggleDateFacetSelect = createAsyncThunk<
  void,
  {
    facetId: string;
    selection: DateFacetValue;
  },
  AsyncThunkSearchOptions<ConfigurationSection & DateFacetSection>
>('dateFacet/executeToggleSelect', ({facetId, selection}, {dispatch}) => {
  dispatch(toggleSelectDateFacetValue({facetId, selection}));
  dispatch(executeToggleRangeFacetSelect({facetId, selection}));
});
