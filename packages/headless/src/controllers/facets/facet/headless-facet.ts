import {Schema, StringValue} from '@coveo/bueno';
import {Controller} from '../../controller/headless-controller';
import {Engine} from '../../../app/headless-engine';
import {
  registerFacet,
  toggleSelectFacetValue,
} from '../../../features/facets/facet-set/facet-set-actions';
import {randomID} from '../../../utils/utils';
import {facetSelector} from '../../../features/facets/facet-set/facet-set-selectors';
import {FacetValue} from '../../../features/facets/facet-set/facet-set-interfaces';
import {executeSearch} from '../../../features/search/search-actions';
import {
  FacetSelectionChangeMetadata,
  logFacetDeselect,
  logFacetSelect,
} from '../../../features/facets/facet-set/facet-set-analytics-actions';

export type FacetState = Facet['state'];

export type FacetProps = {
  options: FacetOptions;
};

const schema = new Schema({
  /**
   * A unique identifier for the controller.
   * By default, a unique random identifier is generated.
   */
  facetId: new StringValue({default: () => randomID('facet')}),
  /** The field whose values you want to display in the facet.*/
  field: new StringValue({required: true}),
});

export type FacetOptions = {
  field: string;
  facetId?: string;
};

export class Facet extends Controller {
  private options: Required<FacetOptions>;

  constructor(engine: Engine, props: FacetProps) {
    super(engine);
    this.options = schema.validate(props.options) as Required<FacetOptions>;

    this.register();
  }

  /**
   * Selects (deselects) the passed value if unselected (selected).
   * @param selection The facet value to select or deselect.
   */
  public toggleSelect(selection: FacetValue) {
    const facetId = this.options.facetId;
    const analyticsAction = this.getAnalyticsActionForToggleSelect(selection);

    this.dispatch(toggleSelectFacetValue({facetId, selection}));
    this.dispatch(executeSearch(analyticsAction));
  }

  /**
   * Returns `true` is the passed facet value is selected and `false` otherwise.
   * @param facetValue The facet value to check.
   */
  public isValueSelected(value: FacetValue) {
    return value.state === 'selected';
  }

  /**
   * @returns The state of the `Facet` controller.
   */
  public get state() {
    const response = facetSelector(this.engine.state, this.options.facetId);
    const values = response ? response.values : [];

    return {
      values,
    };
  }

  private register() {
    this.dispatch(registerFacet(this.options));
  }

  private getAnalyticsActionForToggleSelect(selection: FacetValue) {
    const payload: FacetSelectionChangeMetadata = {
      facetId: this.options.facetId,
      selection,
    };

    return this.isValueSelected(selection)
      ? logFacetDeselect(payload)
      : logFacetSelect(payload);
  }
}