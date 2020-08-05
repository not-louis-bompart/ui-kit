import {platformUrl} from './platform-client';

describe('platform client', () => {
  it('should return https://platform.cloud.coveo.com/rest/search/v2 by default', () => {
    expect(platformUrl()).toBe(
      'https://platform.cloud.coveo.com/rest/search/v2'
    );
  });

  it(`when the environment is prod
  should not return it in the url e.g. https://platform.cloud.coveo.com/rest/search/v2`, () => {
    expect(platformUrl({environment: 'prod'})).toBe(
      'https://platform.cloud.coveo.com/rest/search/v2'
    );
  });

  it(`when the environment is not prod
  should return it in the url e.g. https://platformdev.cloud.coveo.com/rest/search/v2`, () => {
    expect(platformUrl({environment: 'dev'})).toBe(
      'https://platformdev.cloud.coveo.com/rest/search/v2'
    );
  });

  it(`when the region is us-east-1
  should not return it in the url e.g. https://platform.cloud.coveo.com/rest/search/v2`, () => {
    expect(platformUrl({region: 'us-east-1'})).toBe(
      'https://platform.cloud.coveo.com/rest/search/v2'
    );
  });

  it(`when the region is not us-east-1
  should return it in the url e.g. https://platform-us-west-2.cloud.coveo.com/rest/search/v2`, () => {
    expect(platformUrl({region: 'us-west-2'})).toBe(
      'https://platform-us-west-2.cloud.coveo.com/rest/search/v2'
    );
  });
});