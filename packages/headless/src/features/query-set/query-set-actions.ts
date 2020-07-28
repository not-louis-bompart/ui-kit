import {createAction} from '@reduxjs/toolkit';
import {validatePayloadSchema} from '../../utils/validate-payload';
import {StringValue} from '@coveo/bueno';

const idQuerySetDefinition = {
  id: new StringValue({required: true, emptyAllowed: false}),
};

const querySetDefinition = {
  ...idQuerySetDefinition,
  expression: new StringValue({required: true, emptyAllowed: true}),
};

/**
 * Register a query in the query set.
 * @param id The unique identifier of the target query.
 * @param expression The initial query expression.
 */
export const registerQuerySetQuery = createAction(
  'querySet/register/q',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Register an advanced query in the query set.
 * @param id The unique identifier of the target advanced query.
 * @param expression The initial advanced query expression.
 */
export const registerQuerySetAdvancedQuery = createAction(
  'querySet/register/aq',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Register a constant query in the query set.
 * @param id The unique identifier of the target constant query.
 * @param expression The initial constant query expression.
 */
export const registerQuerySetConstantQuery = createAction(
  'querySet/register/cq',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Register a disjunction query in the query set.
 * @param id The unique identifier of the target disjunction query.
 * @param expression The initial disjunction query expression.
 */
export const registerQuerySetDisjunctionQuery = createAction(
  'querySet/register/dq',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Register a large query in the query set.
 * @param id The unique identifier of the target large query.
 * @param expression The initial large query expression.
 */
export const registerQuerySetLargeQuery = createAction(
  'querySet/register/lq',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Update a query in the query set.
 * @param id The unique identifier of the target query.
 * @param expression The updated basic query expression.
 */
export const updateQuerySetQuery = createAction(
  'querySet/update/q',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Update an advanced query in the query set.
 * @param id The unique identifier of the target advanced query.
 * @param expression The updated advanced query expression.
 */
export const updateQuerySetAdvancedQuery = createAction(
  'querySet/update/aq',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Update a constant query in the query set.
 * @param id The unique identifier of the target constant query.
 * @param expression The updated constant query expression.
 */
export const updateQuerySetConstantQuery = createAction(
  'querySet/update/cq',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Update a disjunction query in the query set.
 * @param id The unique identifier of the target disjunction query.
 * @param expression The updated disjunction query expression.
 */
export const updateQuerySetDisjunctionQuery = createAction(
  'querySet/update/dq',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Update a large query in the query set.
 * @param id The unique identifier of the target large query.
 * @param expression The updated large query expression.
 */
export const updateQuerySetLargeQuery = createAction(
  'querySet/update/lq',
  (payload: {id: string; expression: string}) =>
    validatePayloadSchema(payload, querySetDefinition)
);

/**
 * Remove a query in the query set.
 * @param id The unique identifier of the target query.
 */
export const removeQuerySetQuery = createAction(
  'querySet/remove/q',
  (payload: {id: string}) =>
    validatePayloadSchema(payload, idQuerySetDefinition)
);

/**
 * Remove an advanced query in the query set.
 * @param id The unique identifier of the target advanced query.
 */
export const removeQuerySetAdvancedQuery = createAction(
  'querySet/remove/aq',
  (payload: {id: string}) =>
    validatePayloadSchema(payload, idQuerySetDefinition)
);

/**
 * Remove an constant query in the query set.
 * @param id The unique identifier of the target advanced query.
 */
export const removeQuerySetConstantQuery = createAction(
  'querySet/remove/cq',
  (payload: {id: string}) =>
    validatePayloadSchema(payload, idQuerySetDefinition)
);

/**
 * Remove an disjunction query in the query set.
 * @param id The unique identifier of the target disjunction query.
 */
export const removeQuerySetDisjunctionQuery = createAction(
  'querySet/remove/dq',
  (payload: {id: string}) =>
    validatePayloadSchema(payload, idQuerySetDefinition)
);

/**
 * Remove an large query in the query set.
 * @param id The unique identifier of the target large query.
 */
export const removeQuerySetLargeQuery = createAction(
  'querySet/remove/lq',
  (payload: {id: string}) =>
    validatePayloadSchema(payload, idQuerySetDefinition)
);
