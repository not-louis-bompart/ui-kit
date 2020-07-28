import {createReducer} from '@reduxjs/toolkit';
import {
  registerQuerySetQuery,
  updateQuerySetQuery,
  updateQuerySetAdvancedQuery,
  updateQuerySetConstantQuery,
  updateQuerySetDisjunctionQuery,
  updateQuerySetLargeQuery,
  registerQuerySetAdvancedQuery,
  registerQuerySetConstantQuery,
  registerQuerySetDisjunctionQuery,
  registerQuerySetLargeQuery,
  removeQuerySetQuery,
  removeQuerySetAdvancedQuery,
  removeQuerySetConstantQuery,
  removeQuerySetDisjunctionQuery,
  removeQuerySetLargeQuery,
} from './query-set-actions';
import {selectQuerySuggestion} from '../query-suggest/query-suggest-actions';
import {change} from '../history/history-actions';

export interface QuerySetState {
  q: Record<string, string>;
  aq: Record<string, string>;
  cq: Record<string, string>;
  dq: Record<string, string>;
  lq: Record<string, string>;
}

export function getQuerySetInitialState(): QuerySetState {
  return {
    q: {},
    aq: {},
    cq: {},
    dq: {},
    lq: {},
  };
}

export const querySetReducer = createReducer(
  getQuerySetInitialState(),
  (builder) => {
    builder
      .addCase(registerQuerySetQuery, (state, action) =>
        registerQuerySet(state, 'q', action)
      )
      .addCase(registerQuerySetAdvancedQuery, (state, action) =>
        registerQuerySet(state, 'aq', action)
      )
      .addCase(registerQuerySetConstantQuery, (state, action) =>
        registerQuerySet(state, 'cq', action)
      )
      .addCase(registerQuerySetDisjunctionQuery, (state, action) =>
        registerQuerySet(state, 'dq', action)
      )
      .addCase(registerQuerySetLargeQuery, (state, action) =>
        registerQuerySet(state, 'lq', action)
      )
      .addCase(updateQuerySetQuery, (state, action) =>
        updateQuerySet(state, 'q', action)
      )
      .addCase(updateQuerySetAdvancedQuery, (state, action) =>
        updateQuerySet(state, 'aq', action)
      )
      .addCase(updateQuerySetConstantQuery, (state, action) =>
        updateQuerySet(state, 'cq', action)
      )
      .addCase(updateQuerySetDisjunctionQuery, (state, action) =>
        updateQuerySet(state, 'dq', action)
      )
      .addCase(updateQuerySetLargeQuery, (state, action) =>
        updateQuerySet(state, 'lq', action)
      )
      .addCase(removeQuerySetQuery, (state, action) =>
        removeQuerySet(state, 'q', action)
      )
      .addCase(removeQuerySetAdvancedQuery, (state, action) =>
        removeQuerySet(state, 'aq', action)
      )
      .addCase(removeQuerySetConstantQuery, (state, action) =>
        removeQuerySet(state, 'cq', action)
      )
      .addCase(removeQuerySetDisjunctionQuery, (state, action) =>
        removeQuerySet(state, 'dq', action)
      )
      .addCase(removeQuerySetLargeQuery, (state, action) =>
        removeQuerySet(state, 'lq', action)
      )
      .addCase(selectQuerySuggestion, (state, action) => {
        updateQuerySet(state, 'q', action);
      })
      .addCase(change.fulfilled, (state, action) => {
        for (const [section, entry] of Object.entries(
          action.payload.querySet
        )) {
          for (const [id, expression] of Object.entries(
            entry as Record<string, string>
          )) {
            updateQuerySet(state, section as keyof QuerySetState, {
              payload: {id, expression},
            });
          }
        }
      });
  }
);

interface QuerySetAction {
  payload: {
    id: string;
    expression: string;
  };
}

const updateQuerySet = (
  state: QuerySetState,
  section: keyof QuerySetState,
  p: QuerySetAction
) => {
  const {id, expression} = p.payload;
  if (id in state[section]) {
    state[section][id] = expression;
  }
};

const registerQuerySet = (
  state: QuerySetState,
  section: keyof QuerySetState,
  p: QuerySetAction
) => {
  const {id, expression} = p.payload;

  if (id in state[section]) {
    return;
  }

  state[section][id] = expression;
};

const removeQuerySet = (
  state: QuerySetState,
  section: keyof QuerySetState,
  p: {payload: {id: string}}
) => {
  const {id} = p.payload;
  if (id in state[section]) {
    delete state[section][id];
  }
};
