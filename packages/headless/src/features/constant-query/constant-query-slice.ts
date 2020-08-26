import {ConstantQueryState} from '../../state';
import {createReducer} from '@reduxjs/toolkit';
import {
  registerConstantQuery,
  updateConstantQuery,
} from './constant-query-actions';

export const getInitialConstantQueryState: () => ConstantQueryState = () => ({
  cq: '',
});

export const constantQueryReducer = createReducer(
  getInitialConstantQueryState(),
  (builder) => {
    builder
      .addCase(registerConstantQuery, (state, action) => {
        const cq = action.payload;
        if (state.cq === '') {
          state.cq = cq;
        }
      })
      .addCase(updateConstantQuery, (state, action) => {
        state.cq = action.payload;
      });
  }
);
