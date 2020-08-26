import {createAction} from '@reduxjs/toolkit';
/**
 * Register a category facet in the category facet set.
 * @param {CategoryFacetRegistrationOptions} CategoryFacetRegistrationOptions The options to register the category facet with.
 */
export const registerConstantQuery = createAction<string>(
  'constantQuery/register'
);

export const updateConstantQuery = createAction<string>('constantQuery/update');
