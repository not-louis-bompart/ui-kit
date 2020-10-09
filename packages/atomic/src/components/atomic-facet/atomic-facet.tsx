import {Component, h, State, Prop} from '@stencil/core';
import {
  Facet,
  buildFacet,
  FacetState,
  FacetValue,
  Unsubscribe,
  FacetOptions,
  FacetSortCriterion,
  Engine,
} from '@coveo/headless';
import {Initialization} from '../../utils/initialization-utils';
import {randomID} from '../../utils/utils';

@Component({
  tag: 'atomic-facet',
  styleUrl: 'atomic-facet.css',
  shadow: true,
})
export class AtomicFacet {
  @Prop() facetId = randomID('facet');
  @Prop() field = '';
  @Prop() label = 'No label';
  @State() state!: FacetState;
  private engine!: Engine;

  private unsubscribe: Unsubscribe = () => {};
  private facet!: Facet;

  @Initialization()
  public initialize() {
    const options: FacetOptions = {facetId: this.facetId, field: this.field};
    this.facet = buildFacet(this.engine, {options});
    this.subscribe();
  }

  private subscribe() {
    this.unsubscribe = this.facet.subscribe(() => this.updateState());
  }

  public connectedCallback() {
    this.facet && this.subscribe();
  }

  public disconnectedCallback() {
    this.unsubscribe();
  }

  private updateState() {
    this.state = this.facet.state;
  }

  private get values() {
    return this.state.values.map((listItem) => this.buildListItem(listItem));
  }

  private buildListItem(item: FacetValue) {
    const isSelected = this.facet.isValueSelected(item);

    return (
      <div onClick={() => this.facet.toggleSelect(item)}>
        <input type="checkbox" checked={isSelected}></input>
        <span>
          {item.value} {item.numberOfResults}
        </span>
      </div>
    );
  }

  private get resetButton() {
    return this.state.hasActiveValues ? (
      <button onClick={() => this.facet.deselectAll()}>X</button>
    ) : null;
  }

  private get facetSearchInput() {
    return <input onInput={(e) => this.onFacetSearch(e)} />;
  }

  private onFacetSearch(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    const facetSearch = this.facet.facetSearch;

    facetSearch.updateText(value);
    facetSearch.search();
  }

  private get facetSearchResults() {
    const facetSearch = this.facet.facetSearch;
    return facetSearch.state.values.map((searchResult) => (
      <div onClick={() => facetSearch.select(searchResult)}>
        {searchResult.displayValue} {searchResult.count}
      </div>
    ));
  }

  private get showMoreSearchResults() {
    const facetSearch = this.facet.facetSearch;

    if (!facetSearch.state.moreValuesAvailable) {
      return null;
    }

    return (
      <button onClick={() => facetSearch.showMoreResults()}>show more</button>
    );
  }

  private get sortSelector() {
    return (
      <select name="facetSort" onChange={(val) => this.onFacetSortChange(val)}>
        {this.sortOptions}
      </select>
    );
  }

  private get sortOptions() {
    const criteria: FacetSortCriterion[] = [
      'automatic',
      'occurrences',
      'score',
      'alphanumeric',
    ];

    return criteria.map((criterion) => (
      <option value={criterion} selected={this.facet.isSortedBy(criterion)}>
        {criterion}
      </option>
    ));
  }

  private onFacetSortChange(e: Event) {
    const select = e.composedPath()[0] as HTMLSelectElement;
    const criterion = select.value as FacetSortCriterion;

    this.facet.sortBy(criterion);
  }

  private get showMoreButton() {
    if (!this.state.canShowMoreValues) {
      return null;
    }

    return (
      <button onClick={() => this.facet.showMoreValues()}>show more</button>
    );
  }

  private get showLessButton() {
    if (!this.state.canShowLessValues) {
      return null;
    }

    return (
      <button onClick={() => this.facet.showLessValues()}>show less</button>
    );
  }

  render() {
    return (
      <div>
        <div>
          <span>{this.label}</span>
          {this.sortSelector}
          {this.resetButton}
        </div>
        <div>
          {this.facetSearchInput}
          {this.facetSearchResults}
          {this.showMoreSearchResults}
        </div>
        <div>{this.values}</div>
        <div>
          {this.showMoreButton}
          {this.showLessButton}
        </div>
      </div>
    );
  }
}
