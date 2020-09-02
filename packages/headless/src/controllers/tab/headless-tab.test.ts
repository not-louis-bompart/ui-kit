import {MockEngine, buildMockEngine} from '../../test/mock-engine';
import {TabProps, buildTab, Tab} from './headless-tab';
import {
  registerConstantQuery,
  updateConstantQuery,
} from '../../features/constant-query/constant-query-actions';

describe('Tab', () => {
  const expression = 'abc123';
  let engine: MockEngine;
  let props: TabProps;
  let tab: Tab;

  function initTab() {
    tab = buildTab(engine, props);
  }

  beforeEach(() => {
    engine = buildMockEngine();
    engine.state.constantQuery = {cq: '', isRegistered: false};
    props = {
      expression,
      initialState: {
        isActive: false,
      },
    };
  });

  describe('initalization', () => {
    it('calls #registerConstantQuery if isActive is false', () => {
      initTab();
      const action = registerConstantQuery(expression);
      expect(engine.actions).toContainEqual(action);
    });

    it('calls #updateConstantQuery if isActive is true', () => {
      props = {
        expression,
        initialState: {
          isActive: true,
        },
      };
      initTab();

      const action = updateConstantQuery(expression);
      expect(engine.actions).toContainEqual(action);
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      initTab();
    });

    it('#select calls #updateConstantQuery', () => {
      tab.select();
      const action = updateConstantQuery(expression);
      expect(engine.actions).toContainEqual(action);
    });
  });
});
