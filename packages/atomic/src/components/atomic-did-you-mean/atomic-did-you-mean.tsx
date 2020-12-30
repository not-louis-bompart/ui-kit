import {Component, h, Prop, State} from '@stencil/core';
import {
  DidYouMean,
  DidYouMeanState,
  Unsubscribe,
  buildDidYouMean,
  Engine,
} from '@coveo/headless';
import {Initialization} from '../../utils/initialization-utils';

@Component({
  tag: 'atomic-did-you-mean',
  styleUrl: 'atomic-did-you-mean.css',
  shadow: true,
})
export class AtomicDidYouMean {
  @Prop({mutable: true}) engine?: Engine;
  @State() state!: DidYouMeanState;

  private didYouMean!: DidYouMean;
  private unsubscribe: Unsubscribe = () => {};

  @Initialization()
  public initialize() {
    this.didYouMean = buildDidYouMean(this.engine!);
    this.unsubscribe = this.didYouMean.subscribe(() => this.updateState());
  }

  public disconnectedCallback() {
    this.unsubscribe();
  }

  public render() {
    if (!this.state.hasQueryCorrection) {
      return '';
    }

    if (this.state.wasAutomaticallyCorrected) {
      return [
        <p>
          No results for{' '}
          <b>{this.state.queryCorrection.wordCorrections[0].originalWord}</b>
        </p>,
        <p>
          Query was automatically corrected to{' '}
          <b>{this.state.wasCorrectedTo}</b>
        </p>,
      ];
    }

    return (
      <button onClick={() => this.applyCorrection()}>
        Did you mean: {this.state.queryCorrection.correctedQuery} ?
      </button>
    );
  }

  private applyCorrection() {
    this.didYouMean.applyCorrection();
  }

  private updateState() {
    this.state = this.didYouMean.state;
  }
}
