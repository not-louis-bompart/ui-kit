import {createReducer} from '@reduxjs/toolkit';
import {QueryState} from '../../state';
import {
  updateQuery,
  updateAdvancedQuery,
  updateConstantQuery,
  updateDisjunctionQuery,
  updateLargeQuery,
} from './query-actions';
import {selectQuerySuggestion} from '../query-suggest/query-suggest-actions';
import {change} from '../history/history-actions';
import {didYouMeanCorrection} from '../did-you-mean/did-you-mean-actions';

export const getQueryInitialState: () => QueryState = () => ({
  q: '',
  aq: '',
  cq: '',
  dq: '',
  lq: '',
});

export const queryReducer = createReducer(getQueryInitialState(), (builder) =>
  builder
    .addCase(updateQuery, (state, action) => {
      state.q = action.payload.q;
    })
    .addCase(updateAdvancedQuery, (state, action) => {
      state.aq = action.payload.aq;
    })
    .addCase(updateConstantQuery, (state, action) => {
      state.cq = action.payload.cq;
    })
    .addCase(updateDisjunctionQuery, (state, action) => {
      state.dq = action.payload.dq;
    })
    .addCase(updateLargeQuery, (state, action) => {
      state.lq = action.payload.lq;
    })
    .addCase(didYouMeanCorrection, (state, action) => {
      state.q = action.payload;
    })
    .addCase(selectQuerySuggestion, (state, action) => {
      state.q = action.payload.expression;
    })
    .addCase(change.fulfilled, (state, action) => {
      state.q = action.payload.query.q;
    })
);
