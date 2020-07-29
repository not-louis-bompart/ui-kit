import {createAction} from '@reduxjs/toolkit';
import {validatePayloadSchema} from '../../utils/validate-payload';
import {StringValue} from '@coveo/bueno';

const requiredStringDefinition = () => new StringValue({required: true});

/**
 * Update the basic query expression.
 * @param q The new basic query expression.
 */
export const updateQuery = createAction(
  'query/update/q',
  (payload: {q: string}) =>
    validatePayloadSchema(payload, {
      q: requiredStringDefinition(),
    })
);

/**
 * Update the advanced query expression.
 * @param aq The new advanced query expression.
 */
export const updateAdvancedQuery = createAction(
  'query/update/aq',
  (payload: {aq: string}) =>
    validatePayloadSchema(payload, {
      aq: requiredStringDefinition(),
    })
);

/**
 * Update the constant query expression.
 * @param cq The new constant query expression.
 */
export const updateConstantQuery = createAction(
  'query/update/cq',
  (payload: {cq: string}) =>
    validatePayloadSchema(payload, {
      cq: requiredStringDefinition(),
    })
);

/**
 * Update the disjunction query expression.
 * @param dq The new disjunction query expression
 */
export const updateDisjunctionQuery = createAction(
  'query/update/dq',
  (payload: {dq: string}) =>
    validatePayloadSchema(payload, {
      dq: requiredStringDefinition(),
    })
);

/**
 * Update the large query expression.
 * @param lq The new large query expression.
 */
export const updateLargeQuery = createAction(
  'query/update/lq',
  (payload: {lq: string}) =>
    validatePayloadSchema(payload, {
      lq: requiredStringDefinition(),
    })
);
