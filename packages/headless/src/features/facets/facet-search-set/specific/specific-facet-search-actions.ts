import {createAction} from '@reduxjs/toolkit';
import {SpecificFacetSearchResult} from '../../../../api/search/facet-search/specific-facet-search/specific-facet-search-response';
import {FacetSearchOptions} from '../facet-search-request-options';
import {RecordValue, NumberValue, StringValue} from '@coveo/bueno';
import {
  facetIdDefinition,
  requiredNonEmptyString,
} from '../../generic/facet-actions-validation';
import {validatePayloadSchema} from '../../../../utils/validate-payload';

const facetSearchOptionsDefinition = {
  facetId: facetIdDefinition,
  captions: new RecordValue(),
  numberOfValues: new NumberValue({required: false, min: 1}),
  query: new StringValue({required: false, emptyAllowed: true}),
};

const selectFacetSearchResultPayloadDefinition = {
  facetId: facetIdDefinition,
  value: new RecordValue({
    displayValue: requiredNonEmptyString,
    rawValue: requiredNonEmptyString,
    count: new NumberValue({required: true, min: 0}),
  }),
};

type selectFacetSearchResultPayload = {
  facetId: string;
  value: SpecificFacetSearchResult;
};

/**
 * Registers a facet search box with the specified options.
 * @param (FacetSearchOptions) An object specifying the target facet and facet search box options.
 */
export const registerFacetSearch = createAction(
  'facetSearch/register',
  (payload: FacetSearchOptions) =>
    validatePayloadSchema(
      {captions: {}, ...payload},
      facetSearchOptionsDefinition
    )
);

/**
 * Updates the options of a facet search box.
 * @param (FacetSearchOptions) An object specifying the target facet and facet search box options.
 */
export const updateFacetSearch = createAction(
  'facetSearch/update',
  (payload: FacetSearchOptions) =>
    validatePayloadSchema(
      {captions: {}, ...payload},
      facetSearchOptionsDefinition
    )
);

/**
 * Selects a facet search result.
 * @param (selectFacetSearchResultPayload) An object that specifies the target facet and facet search result.
 */
export const selectFacetSearchResult = createAction(
  'facetSearch/toggleSelectValue',
  (payload: selectFacetSearchResultPayload) =>
    validatePayloadSchema(payload, selectFacetSearchResultPayloadDefinition)
);
