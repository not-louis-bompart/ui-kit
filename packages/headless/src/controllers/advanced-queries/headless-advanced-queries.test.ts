import {buildAdvancedQueries} from './headless-advanced-queries';
import {buildMockEngine} from '../../test/mock-engine';
import {
  registerQuerySetAdvancedQuery,
  registerQuerySetConstantQuery,
  registerQuerySetDisjunctionQuery,
  registerQuerySetLargeQuery,
  removeQuerySetAdvancedQuery,
  removeQuerySetConstantQuery,
  removeQuerySetDisjunctionQuery,
  removeQuerySetLargeQuery,
} from '../../features/query-set/query-set-actions';

describe('advanced queries', () => {
  it('allows to add an advanced query', () => {
    const e = buildMockEngine();
    buildAdvancedQueries(e).addAdvancedQuery('foo', 'bar');
    expect(e.actions).toContainEqual(
      registerQuerySetAdvancedQuery({expression: 'foo', id: 'bar'})
    );
  });

  it('allows to add a constant query', () => {
    const e = buildMockEngine();
    buildAdvancedQueries(e).addConstantQuery('foo', 'bar');
    expect(e.actions).toContainEqual(
      registerQuerySetConstantQuery({expression: 'foo', id: 'bar'})
    );
  });

  it('allows to add a disjunction query', () => {
    const e = buildMockEngine();
    buildAdvancedQueries(e).addDisjunctionQuery('foo', 'bar');
    expect(e.actions).toContainEqual(
      registerQuerySetDisjunctionQuery({expression: 'foo', id: 'bar'})
    );
  });

  it('allows to add a large query', () => {
    const e = buildMockEngine();
    buildAdvancedQueries(e).addLargeQuery('foo', 'bar');
    expect(e.actions).toContainEqual(
      registerQuerySetLargeQuery({expression: 'foo', id: 'bar'})
    );
  });

  it('allows to remove an advanced query', () => {
    const e = buildMockEngine();
    buildAdvancedQueries(e).removeAdvancedQuery('bar');
    expect(e.actions).toContainEqual(removeQuerySetAdvancedQuery({id: 'bar'}));
  });

  it('allows to remove a constant query', () => {
    const e = buildMockEngine();
    buildAdvancedQueries(e).removeConstantQuery('bar');
    expect(e.actions).toContainEqual(removeQuerySetConstantQuery({id: 'bar'}));
  });

  it('allows to remove a disjunction query', () => {
    const e = buildMockEngine();
    buildAdvancedQueries(e).removeDisjunctionQuery('bar');
    expect(e.actions).toContainEqual(
      removeQuerySetDisjunctionQuery({id: 'bar'})
    );
  });

  it('allows to remove a large query', () => {
    const e = buildMockEngine();
    buildAdvancedQueries(e).removeLargeQuery('bar');
    expect(e.actions).toContainEqual(removeQuerySetLargeQuery({id: 'bar'}));
  });

  it('allows to find an advanced query by expression', () => {
    const e = buildMockEngine();
    e.state.querySet.aq['foo'] = 'bar';
    e.state.querySet.aq['world'] = 'hello';

    expect(
      buildAdvancedQueries(e).findAdvancedQueryIDByExpression('hello')
    ).toBe('world');
  });

  it('allows to find a constant query by expression', () => {
    const e = buildMockEngine();
    e.state.querySet.cq['foo'] = 'bar';
    e.state.querySet.cq['world'] = 'hello';

    expect(
      buildAdvancedQueries(e).findConstantQueryIDByExpression('hello')
    ).toBe('world');
  });

  it('allows to find a disjunction query by expression', () => {
    const e = buildMockEngine();
    e.state.querySet.dq['foo'] = 'bar';
    e.state.querySet.dq['world'] = 'hello';

    expect(
      buildAdvancedQueries(e).findDisjunctionQueryIDByExpression('hello')
    ).toBe('world');
  });

  it('allows to find a large query by expression', () => {
    const e = buildMockEngine();
    e.state.querySet.lq['foo'] = 'bar';
    e.state.querySet.lq['world'] = 'hello';

    expect(buildAdvancedQueries(e).findLargeQueryIDByExpression('hello')).toBe(
      'world'
    );
  });
});
