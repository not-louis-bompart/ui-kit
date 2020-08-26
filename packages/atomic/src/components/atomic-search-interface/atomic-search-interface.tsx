import {Component, Prop, h} from '@stencil/core';
import {
  HeadlessEngine,
  searchPageReducers,
  Engine,
  HeadlessConfigurationOptions,
} from '@coveo/headless';
import {Schema, StringValue} from '@coveo/bueno';

@Component({
  tag: 'atomic-search-interface',
  shadow: true,
})
export class AtomicSearchInterface {
  // @Prop() identifier?: string; TODO: add identifier
  @Prop() sample = false;
  @Prop() organizationId?: string;
  @Prop() accessToken?: string;
  @Prop() renewAccessToken?: () => Promise<string>;

  @Prop() engine: Engine;

  private error?: Error;

  constructor() {
    this.engine = new HeadlessEngine({
      configuration: this.configuration,
      reducers: searchPageReducers,
    });
  }

  get configuration(): HeadlessConfigurationOptions {
    if (this.sample && !this.organizationId && !this.accessToken) {
      return HeadlessEngine.getSampleConfiguration();
    }

    try {
      new Schema({
        organizationId: new StringValue({emptyAllowed: false, required: true}),
        accessToken: new StringValue({emptyAllowed: false, required: true}),
      }).validate({
        organizationId: this.organizationId,
        accessToken: this.accessToken,
      });
    } catch (error) {
      this.error = new Error(
        'The atomic-search-interface component configuration is faulty, see the console for more details.'
      );
      throw error;
    }

    return {
      accessToken: this.accessToken!,
      organizationId: this.organizationId!,
      renewAccessToken: this.renewAccessToken,
    };
  }

  render() {
    if (this.error) {
      return (
        <atomic-component-error error={this.error}></atomic-component-error>
      );
    }

    return <slot></slot>;
  }
}
