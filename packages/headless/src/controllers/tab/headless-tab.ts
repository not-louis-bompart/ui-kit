import {Engine} from '../../app/headless-engine';
import {buildController} from '../controller/headless-controller';
import {
  registerConstantQuery,
  updateConstantQuery,
} from '../../features/constant-query/constant-query-actions';

export interface TabProps {
  cq: string;
  initialState: Partial<TabInitialState>;
}

export interface TabInitialState {
  isActive: boolean;
}

export type Tab = ReturnType<typeof buildTab>;

export function buildTab(engine: Engine, props: TabProps) {
  const controller = buildController(engine);
  const {dispatch} = engine;
  const initConstantQuery = () => {
    if (props.initialState.isActive) {
      return dispatch(updateConstantQuery(props.cq));
    }
    return dispatch(registerConstantQuery(props.cq));
  };
  initConstantQuery();

  return {
    ...controller,
    /**
     * Makes this tab the active one
     */
    select() {
      dispatch(updateConstantQuery(props.cq));
    },

    get state() {
      const isActive = engine.state.constantQuery.cq === props.cq;
      return {isActive};
    },
  };
}
