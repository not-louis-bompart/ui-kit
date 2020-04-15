import { Component, Prop, h, State } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  @State() counter = 0;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  private increment() {
    this.counter++;
  }

  render() {
    return <div>
      <p>Hello, World! I'm {this.getText()}</p>
      <button onClick={() => this.increment()}>{this.counter}</button>
      </div>;
  }
}
