import {SpecificFacetSearchRequest} from '../../../api/search/facet-search/specific-facet-search-request';

export type FacetSearchRequestOptions = {
  pageSize: number;
  currentPage: number;
} & Pick<SpecificFacetSearchRequest, 'captions' | 'query'>;
