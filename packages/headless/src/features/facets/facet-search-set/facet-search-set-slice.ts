import {createReducer} from '@reduxjs/toolkit';
import {
  registerFacetSearch,
  updateFacetSearch,
  executeFacetSearch,
} from './facet-search-actions';
import {FacetSearchRequestOptions} from './facet-search-request-options';
import {FacetSearchResponse} from '../../../api/search/facet-search/api/response';

type FacetSearch = {
  options: FacetSearchRequestOptions;
  response: FacetSearchResponse;
};

export type FacetSearchSetState = Record<string, FacetSearch>;

export function getFacetSearchSetInitialState(): FacetSearchSetState {
  return {};
}

export const facetSearchSetReducer = createReducer(
  getFacetSearchSetInitialState(),
  (builder) => {
    builder
      .addCase(registerFacetSearch, (state, action) => {
        const payload = action.payload;
        const {facetId} = payload;

        if (state[facetId]) {
          return;
        }

        const options = buildFacetSearchOptions(payload);
        state[facetId] = buildFacetSearch({options});
      })
      .addCase(updateFacetSearch, (state, action) => {
        const {facetId, ...rest} = action.payload;
        const search = state[facetId];

        if (!search) {
          return;
        }

        search.options = {...search.options, ...rest};
      })
      .addCase(executeFacetSearch.fulfilled, (state, action) => {
        const {facetId, response} = action.payload;
        const search = state[facetId];

        if (!search) {
          return;
        }

        search.response = response;
      });
  }
);

export function buildFacetSearch(
  config: Partial<FacetSearch> = {}
): FacetSearch {
  return {
    options: buildFacetSearchOptions(),
    response: buildNullFacetSearchResponse(),
    ...config,
  };
}

export function buildFacetSearchOptions(
  config: Partial<FacetSearchRequestOptions> = {}
): FacetSearchRequestOptions {
  return {
    captions: {},
    numberOfValues: 10,
    query: '',
    ...config,
  };
}

function buildNullFacetSearchResponse(): FacetSearchResponse {
  return {
    moreValuesAvailable: false,
    values: [],
  };
}
