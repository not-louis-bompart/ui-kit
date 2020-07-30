import {AutomaticRanges} from './request';
import {RangeFacetRequest} from './range-facet';

type RangeFacetRequiredParameters = Pick<
  RangeFacetRequest,
  'facetId' | 'field'
>;

type RangeFacetOptionalParameters = Partial<
  Pick<
    RangeFacetRequest,
    'filterFacetCount' | 'injectionDepth' | 'numberOfValues' | 'sortCriteria'
  >
>;

export type ManualRangeFacetOptions<
  T extends RangeFacetRequest
> = RangeFacetRequiredParameters &
  Pick<T, 'currentValues'> &
  AutomaticRanges<false> &
  RangeFacetOptionalParameters;

export type AutomaticRangeFacetOptions<
  T extends RangeFacetRequest
> = RangeFacetRequiredParameters &
  Partial<Pick<T, 'currentValues'>> &
  AutomaticRanges<true> &
  RangeFacetOptionalParameters;
