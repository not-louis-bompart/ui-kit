import {Component, h, ComponentInterface, Prop, State} from '@stencil/core';
import {buildTab, Tab, TabProps, TabState, Unsubscribe} from '@coveo/headless';
import {headlessEngine} from '../../engine';

@Component({
  tag: 'atomic-tab',
  styleUrl: 'atomic-tab.css',
  shadow: true,
})
export class AtomicSearchBox implements ComponentInterface {
  @Prop() cq = '';
  @Prop() isActive = false;
  @State() state!: TabState;

  private tab: Tab;
  private unsubscribe: Unsubscribe;

  constructor() {
    const options: TabProps = {
      cq: this.cq,
      initialState: {
        isActive: this.isActive,
      },
    };
    this.tab = buildTab(headlessEngine, options);
    this.unsubscribe = this.tab.subscribe(this.updateState);
  }

  public disconnectedCallback() {
    this.unsubscribe();
  }

  updateState = () => {
    this.state = this.tab.state;
  };

  handleClick = () => {
    this.tab.select();
  };

  render() {
    return (
      <div class="tab" onClick={this.handleClick}>
        <h3>
          <slot />
        </h3>
      </div>
    );
  }
}
