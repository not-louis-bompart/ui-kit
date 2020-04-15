import { Component, h, Build } from '@stencil/core';
import { HeadlessResultList } from '../../headless/result-list';

@Component({
  tag: 'result-list',
  styleUrl: 'result-list.css',
  shadow: true
})

export class ResultList {
  private resultList: HeadlessResultList;

  async componentWillLoad() {
    if (Build.isBrowser) {
      console.log('running in browser');
    } else {
      const script = document.createElement('script');
      script.src = 'ssr';
      window.document.body.append(script);
    }

    this.resultList = new HeadlessResultList();
  }

  private buildResult(result) {
    return <div class="result"><a href={result.clickUri} target="_blank">{result.title}</a></div>;
  }

  private get resultElements() {
    return this.resultList.results.map(result => this.buildResult(result));
  }

  render() {
    return <div>{this.resultElements}</div>;
  }
}
