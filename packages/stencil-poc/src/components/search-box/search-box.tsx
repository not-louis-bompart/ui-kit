import { Component, Prop, h, State } from '@stencil/core';
import { HeadlessSearchbox } from '../../headless/search-box';

@Component({
  tag: 'search-box',
  styleUrl: 'search-box.css',
  shadow: true
})

export class SearchBox {
  @Prop() searchAsYouType = false;

  @State() value = '';
  
  private searchBox: HeadlessSearchbox;

  async componentWillLoad() {
    this.searchBox = new HeadlessSearchbox({ searchAsYouType: this.searchAsYouType });
  }
  
  private onChange(e: any) {
    this.value = e.target ? e.target.value : '';
    this.searchBox.text = this.value;
  }

  private onKeyDown(e: KeyboardEvent) {
    const isEnterKey = e.keyCode == 13;
    isEnterKey && this.search();
  }

  private search() {
    this.searchBox.search();
  }
  
  render() {
    return <input type="text" value={this.value} onInput={e => this.onChange(e)} onKeyDown={e => this.onKeyDown(e)}></input>;
  }
}
