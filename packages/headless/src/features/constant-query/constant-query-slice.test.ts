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

  it('#registerConstantQuery updates cq if it is empty && isRegistered is false', () => {
    const action = registerConstantQuery(cq);
    state = constantQueryReducer(state, action);

    expect(state.cq).toEqual(cq);
  });

  it('#registerConstantQuery does nothing if cq is not empty', () => {
    state.cq = 'world';
    const action = registerConstantQuery(cq);
    state = constantQueryReducer(state, action);

    expect(state.cq).not.toEqual(cq);
  });

  it('#registerConstantQuery does nothing if cq is empty but isRegisted is true', () => {
    const action = registerConstantQuery(cq);
    state = constantQueryReducer(state, action);

    expect(state.cq).not.toEqual(cq);
  });
});
