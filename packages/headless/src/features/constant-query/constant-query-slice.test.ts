import {ConstantQueryState} from '../../state';
import {
  registerConstantQuery,
  updateConstantQuery,
} from './constant-query-actions';
import {
  constantQueryReducer,
  getInitialConstantQueryState,
} from './constant-query-slice';

describe('constant query slice', () => {
  const cq = 'hello';
  let state: ConstantQueryState;

  beforeEach(() => {
    state = getInitialConstantQueryState();
  });

  it('#updateConstantQuery sets cq to the correct value', () => {
    const action = updateConstantQuery(cq);
    state = constantQueryReducer(state, action);

    expect(state.cq).toEqual(cq);
  });

  it('#registerConstantQuery updates cq and isInitialized if isInitialized is false', () => {
    const action = registerConstantQuery(cq);
    state = constantQueryReducer(state, action);
    const finalState: ConstantQueryState = {
      isInitialized: true,
      cq,
    };
    expect(state).toEqual(finalState);
  });

  it('#registerConstantQuery does nothing if isInitialized is true', () => {
    const action = registerConstantQuery(cq);
    state.isInitialized = true;
    state = constantQueryReducer(state, action);

    expect(state.cq).not.toEqual(cq);
  });
});
