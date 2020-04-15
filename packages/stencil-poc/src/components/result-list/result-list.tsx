import { Component, h, Build, State } from '@stencil/core';
import { headlessEngine } from '../../headless/store'

@Component({
  tag: 'result-list',
  styleUrl: 'result-list.css',
  shadow: true
})

export class ResultList {
  @State() state: any = undefined;
  private unsubscribe = () => {};

  async componentWillLoad() {
    if (Build.isBrowser) {
      console.log('running in browser');
    } else {
      const script = document.createElement('script');
      script.src = 'ssr';
      window.document.body.append(script);
    }
    
    this.unsubscribe = headlessEngine.reduxStore.subscribe(() => this.updateState());
  }

  private updateState() {
    this.state = headlessEngine.reduxStore.getState();
  }

  async componentDidUnload() {
    this.unsubscribe();
  }

  private buildResult(result) {
    return <div class="result"><a href={result.clickUri} target="_blank">{result.title}</a></div>;
  }

  private get resultElements() {
    return this.state ? this.state.results.list.map(result => this.buildResult(result)) : [];
  }

  render() {
    return <div>{this.resultElements}</div>;
  }
}
