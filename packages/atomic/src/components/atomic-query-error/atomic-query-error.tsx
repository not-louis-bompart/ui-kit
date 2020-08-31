import {Component, h, State} from '@stencil/core';
import {
  QueryError,
  QueryErrorState,
  Unsubscribe,
  buildQueryError,
  Engine,
} from '@coveo/headless';
import {EngineProvider, EngineProviderError} from '../../utils/engine-utils';

@Component({
  tag: 'atomic-query-error',
  styleUrl: 'atomic-query-error.css',
  shadow: true,
})
export class AtomicQueryError {
  @State() state!: QueryErrorState;
  @EngineProvider() engine!: Engine;

  private queryError!: QueryError;
  private error?: Error;
  private unsubscribe: Unsubscribe = () => {};

  public componentWillLoad() {
    try {
      this.configure();
    } catch (error) {
      this.error = error;
    }
  }

  private configure() {
    if (!this.engine) {
      throw new EngineProviderError('atomic-query-error');
    }

    this.queryError = buildQueryError(this.engine);
    this.unsubscribe = this.queryError.subscribe(() => this.updateState());
  }

  public disconnectedCallback() {
    this.unsubscribe();
  }

  private updateState() {
    this.state = this.queryError.state;
  }

  private get results() {
    return this.state.hasError ? (
      <div>
        <div>Oops {this.state.error?.message}</div>
        <code>{JSON.stringify(this.state.error)}</code>
      </div>
    ) : (
      ''
    );
  }

  public render() {
    if (this.error) {
      return (
        <atomic-component-error error={this.error}></atomic-component-error>
      );
    }

    return this.results;
  }
}
