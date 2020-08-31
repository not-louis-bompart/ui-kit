import {Component, h, Prop, State} from '@stencil/core';
import {buildTab, Tab, TabProps, TabState, Unsubscribe} from '@coveo/headless';
import {headlessEngine} from '../../engine';

@Component({
  tag: 'atomic-tab',
  styleUrl: 'atomic-tab.css',
  shadow: true,
})
export class AtomicTab {
  @Prop() expression = '';
  @Prop() isActive = false;
  @State() state!: TabState;

  private tab: Tab;
  private unsubscribe: Unsubscribe;

  constructor() {
    const options: TabProps = {
      expression: this.expression,
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

  private updateState = () => {
    this.state = this.tab.state;
  };

  public handleClick = () => {
    this.tab.select();
  };

  render() {
    return (
      <a class="tab" onClick={this.handleClick}>
        <p>
          <slot/>
        </p>
      </a>
    );
  }
}
