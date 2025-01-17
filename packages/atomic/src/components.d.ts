/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Engine, HeadlessConfigurationOptions, LogLevel, Result, ResultTemplateCondition } from "@coveo/headless";
export namespace Components {
    interface AtomicBreadcrumbManager {
        "categoryDivider": string;
        "collapseThreshold": number;
    }
    interface AtomicCategoryFacet {
        "facetId": string;
        "field": string;
        "label": string;
    }
    interface AtomicComponentError {
        "error": Error;
    }
    interface AtomicContextProvider {
        "context": string;
    }
    interface AtomicDateFacet {
        "facetId": string;
        "field": string;
        "label": string;
    }
    interface AtomicDidYouMean {
    }
    interface AtomicFacet {
        "facetId": string;
        "field": string;
        "label": string;
    }
    interface AtomicFacetManager {
    }
    interface AtomicFieldCondition {
        "conditions": ResultTemplateCondition[];
        "getFields": () => Promise<string[]>;
        "ifDefined"?: string;
        "ifNotDefined"?: string;
    }
    interface AtomicFrequentlyBoughtTogether {
    }
    interface AtomicHistory {
    }
    interface AtomicNumericFacet {
        "facetId": string;
        "field": string;
        "label": string;
    }
    interface AtomicPager {
    }
    interface AtomicQueryError {
    }
    interface AtomicQuerySummary {
    }
    interface AtomicRelevanceInspector {
        "engine": Engine;
    }
    interface AtomicResult {
        "engine": Engine;
        "result": Result;
    }
    interface AtomicResultLink {
    }
    interface AtomicResultList {
        /**
          * Whether to automatically retrieve an additional page of results and append it to the current results when the user scrolls down to the bottom of element
         */
        "enableInfiniteScroll": boolean;
        "fieldsToInclude": string;
        /**
          * Css class for the list wrapper
         */
        "listClass": string;
        /**
          * Css class for a list element
         */
        "listElementClass": string;
    }
    interface AtomicResultTemplate {
        "conditions": ResultTemplateCondition[];
        "fieldsToInclude"?: string;
        "getConditions": () => Promise<ResultTemplateCondition[]>;
        "getFields": () => Promise<string[]>;
    }
    interface AtomicResultValue {
        "value": string;
    }
    interface AtomicResultsPerPage {
        /**
          * Initial value of the result per page option
         */
        "initialOption": number;
        /**
          * List of possible results per page options, separated by commas
         */
        "options": string;
    }
    interface AtomicSearchBox {
        "_id": string;
        "enableQuerySyntax": boolean;
        /**
          * Wether the submit button should be place before the input
         */
        "leadingSubmitButton": boolean;
        /**
          * Maximum number of suggestions to display
         */
        "numberOfSuggestions": number;
    }
    interface AtomicSearchInterface {
        "initialize": (options: Pick<HeadlessConfigurationOptions, 'accessToken' | 'organizationId' | 'renewAccessToken' | 'platformUrl'>) => Promise<void>;
        "logLevel"?: LogLevel;
        "pipeline": string;
        "sample": boolean;
        "searchHub": string;
    }
    interface AtomicSortDropdown {
    }
    interface AtomicTab {
        "expression": string;
        "isActive": boolean;
    }
}
declare global {
    interface HTMLAtomicBreadcrumbManagerElement extends Components.AtomicBreadcrumbManager, HTMLStencilElement {
    }
    var HTMLAtomicBreadcrumbManagerElement: {
        prototype: HTMLAtomicBreadcrumbManagerElement;
        new (): HTMLAtomicBreadcrumbManagerElement;
    };
    interface HTMLAtomicCategoryFacetElement extends Components.AtomicCategoryFacet, HTMLStencilElement {
    }
    var HTMLAtomicCategoryFacetElement: {
        prototype: HTMLAtomicCategoryFacetElement;
        new (): HTMLAtomicCategoryFacetElement;
    };
    interface HTMLAtomicComponentErrorElement extends Components.AtomicComponentError, HTMLStencilElement {
    }
    var HTMLAtomicComponentErrorElement: {
        prototype: HTMLAtomicComponentErrorElement;
        new (): HTMLAtomicComponentErrorElement;
    };
    interface HTMLAtomicContextProviderElement extends Components.AtomicContextProvider, HTMLStencilElement {
    }
    var HTMLAtomicContextProviderElement: {
        prototype: HTMLAtomicContextProviderElement;
        new (): HTMLAtomicContextProviderElement;
    };
    interface HTMLAtomicDateFacetElement extends Components.AtomicDateFacet, HTMLStencilElement {
    }
    var HTMLAtomicDateFacetElement: {
        prototype: HTMLAtomicDateFacetElement;
        new (): HTMLAtomicDateFacetElement;
    };
    interface HTMLAtomicDidYouMeanElement extends Components.AtomicDidYouMean, HTMLStencilElement {
    }
    var HTMLAtomicDidYouMeanElement: {
        prototype: HTMLAtomicDidYouMeanElement;
        new (): HTMLAtomicDidYouMeanElement;
    };
    interface HTMLAtomicFacetElement extends Components.AtomicFacet, HTMLStencilElement {
    }
    var HTMLAtomicFacetElement: {
        prototype: HTMLAtomicFacetElement;
        new (): HTMLAtomicFacetElement;
    };
    interface HTMLAtomicFacetManagerElement extends Components.AtomicFacetManager, HTMLStencilElement {
    }
    var HTMLAtomicFacetManagerElement: {
        prototype: HTMLAtomicFacetManagerElement;
        new (): HTMLAtomicFacetManagerElement;
    };
    interface HTMLAtomicFieldConditionElement extends Components.AtomicFieldCondition, HTMLStencilElement {
    }
    var HTMLAtomicFieldConditionElement: {
        prototype: HTMLAtomicFieldConditionElement;
        new (): HTMLAtomicFieldConditionElement;
    };
    interface HTMLAtomicFrequentlyBoughtTogetherElement extends Components.AtomicFrequentlyBoughtTogether, HTMLStencilElement {
    }
    var HTMLAtomicFrequentlyBoughtTogetherElement: {
        prototype: HTMLAtomicFrequentlyBoughtTogetherElement;
        new (): HTMLAtomicFrequentlyBoughtTogetherElement;
    };
    interface HTMLAtomicHistoryElement extends Components.AtomicHistory, HTMLStencilElement {
    }
    var HTMLAtomicHistoryElement: {
        prototype: HTMLAtomicHistoryElement;
        new (): HTMLAtomicHistoryElement;
    };
    interface HTMLAtomicNumericFacetElement extends Components.AtomicNumericFacet, HTMLStencilElement {
    }
    var HTMLAtomicNumericFacetElement: {
        prototype: HTMLAtomicNumericFacetElement;
        new (): HTMLAtomicNumericFacetElement;
    };
    interface HTMLAtomicPagerElement extends Components.AtomicPager, HTMLStencilElement {
    }
    var HTMLAtomicPagerElement: {
        prototype: HTMLAtomicPagerElement;
        new (): HTMLAtomicPagerElement;
    };
    interface HTMLAtomicQueryErrorElement extends Components.AtomicQueryError, HTMLStencilElement {
    }
    var HTMLAtomicQueryErrorElement: {
        prototype: HTMLAtomicQueryErrorElement;
        new (): HTMLAtomicQueryErrorElement;
    };
    interface HTMLAtomicQuerySummaryElement extends Components.AtomicQuerySummary, HTMLStencilElement {
    }
    var HTMLAtomicQuerySummaryElement: {
        prototype: HTMLAtomicQuerySummaryElement;
        new (): HTMLAtomicQuerySummaryElement;
    };
    interface HTMLAtomicRelevanceInspectorElement extends Components.AtomicRelevanceInspector, HTMLStencilElement {
    }
    var HTMLAtomicRelevanceInspectorElement: {
        prototype: HTMLAtomicRelevanceInspectorElement;
        new (): HTMLAtomicRelevanceInspectorElement;
    };
    interface HTMLAtomicResultElement extends Components.AtomicResult, HTMLStencilElement {
    }
    var HTMLAtomicResultElement: {
        prototype: HTMLAtomicResultElement;
        new (): HTMLAtomicResultElement;
    };
    interface HTMLAtomicResultLinkElement extends Components.AtomicResultLink, HTMLStencilElement {
    }
    var HTMLAtomicResultLinkElement: {
        prototype: HTMLAtomicResultLinkElement;
        new (): HTMLAtomicResultLinkElement;
    };
    interface HTMLAtomicResultListElement extends Components.AtomicResultList, HTMLStencilElement {
    }
    var HTMLAtomicResultListElement: {
        prototype: HTMLAtomicResultListElement;
        new (): HTMLAtomicResultListElement;
    };
    interface HTMLAtomicResultTemplateElement extends Components.AtomicResultTemplate, HTMLStencilElement {
    }
    var HTMLAtomicResultTemplateElement: {
        prototype: HTMLAtomicResultTemplateElement;
        new (): HTMLAtomicResultTemplateElement;
    };
    interface HTMLAtomicResultValueElement extends Components.AtomicResultValue, HTMLStencilElement {
    }
    var HTMLAtomicResultValueElement: {
        prototype: HTMLAtomicResultValueElement;
        new (): HTMLAtomicResultValueElement;
    };
    interface HTMLAtomicResultsPerPageElement extends Components.AtomicResultsPerPage, HTMLStencilElement {
    }
    var HTMLAtomicResultsPerPageElement: {
        prototype: HTMLAtomicResultsPerPageElement;
        new (): HTMLAtomicResultsPerPageElement;
    };
    interface HTMLAtomicSearchBoxElement extends Components.AtomicSearchBox, HTMLStencilElement {
    }
    var HTMLAtomicSearchBoxElement: {
        prototype: HTMLAtomicSearchBoxElement;
        new (): HTMLAtomicSearchBoxElement;
    };
    interface HTMLAtomicSearchInterfaceElement extends Components.AtomicSearchInterface, HTMLStencilElement {
    }
    var HTMLAtomicSearchInterfaceElement: {
        prototype: HTMLAtomicSearchInterfaceElement;
        new (): HTMLAtomicSearchInterfaceElement;
    };
    interface HTMLAtomicSortDropdownElement extends Components.AtomicSortDropdown, HTMLStencilElement {
    }
    var HTMLAtomicSortDropdownElement: {
        prototype: HTMLAtomicSortDropdownElement;
        new (): HTMLAtomicSortDropdownElement;
    };
    interface HTMLAtomicTabElement extends Components.AtomicTab, HTMLStencilElement {
    }
    var HTMLAtomicTabElement: {
        prototype: HTMLAtomicTabElement;
        new (): HTMLAtomicTabElement;
    };
    interface HTMLElementTagNameMap {
        "atomic-breadcrumb-manager": HTMLAtomicBreadcrumbManagerElement;
        "atomic-category-facet": HTMLAtomicCategoryFacetElement;
        "atomic-component-error": HTMLAtomicComponentErrorElement;
        "atomic-context-provider": HTMLAtomicContextProviderElement;
        "atomic-date-facet": HTMLAtomicDateFacetElement;
        "atomic-did-you-mean": HTMLAtomicDidYouMeanElement;
        "atomic-facet": HTMLAtomicFacetElement;
        "atomic-facet-manager": HTMLAtomicFacetManagerElement;
        "atomic-field-condition": HTMLAtomicFieldConditionElement;
        "atomic-frequently-bought-together": HTMLAtomicFrequentlyBoughtTogetherElement;
        "atomic-history": HTMLAtomicHistoryElement;
        "atomic-numeric-facet": HTMLAtomicNumericFacetElement;
        "atomic-pager": HTMLAtomicPagerElement;
        "atomic-query-error": HTMLAtomicQueryErrorElement;
        "atomic-query-summary": HTMLAtomicQuerySummaryElement;
        "atomic-relevance-inspector": HTMLAtomicRelevanceInspectorElement;
        "atomic-result": HTMLAtomicResultElement;
        "atomic-result-link": HTMLAtomicResultLinkElement;
        "atomic-result-list": HTMLAtomicResultListElement;
        "atomic-result-template": HTMLAtomicResultTemplateElement;
        "atomic-result-value": HTMLAtomicResultValueElement;
        "atomic-results-per-page": HTMLAtomicResultsPerPageElement;
        "atomic-search-box": HTMLAtomicSearchBoxElement;
        "atomic-search-interface": HTMLAtomicSearchInterfaceElement;
        "atomic-sort-dropdown": HTMLAtomicSortDropdownElement;
        "atomic-tab": HTMLAtomicTabElement;
    }
}
declare namespace LocalJSX {
    interface AtomicBreadcrumbManager {
        "categoryDivider"?: string;
        "collapseThreshold"?: number;
    }
    interface AtomicCategoryFacet {
        "facetId"?: string;
        "field"?: string;
        "label"?: string;
    }
    interface AtomicComponentError {
        "error": Error;
    }
    interface AtomicContextProvider {
        "context"?: string;
    }
    interface AtomicDateFacet {
        "facetId"?: string;
        "field"?: string;
        "label"?: string;
    }
    interface AtomicDidYouMean {
    }
    interface AtomicFacet {
        "facetId"?: string;
        "field"?: string;
        "label"?: string;
    }
    interface AtomicFacetManager {
    }
    interface AtomicFieldCondition {
        "conditions"?: ResultTemplateCondition[];
        "ifDefined"?: string;
        "ifNotDefined"?: string;
    }
    interface AtomicFrequentlyBoughtTogether {
    }
    interface AtomicHistory {
    }
    interface AtomicNumericFacet {
        "facetId"?: string;
        "field"?: string;
        "label"?: string;
    }
    interface AtomicPager {
    }
    interface AtomicQueryError {
    }
    interface AtomicQuerySummary {
    }
    interface AtomicRelevanceInspector {
        "engine": Engine;
    }
    interface AtomicResult {
        "engine": Engine;
        "result": Result;
    }
    interface AtomicResultLink {
    }
    interface AtomicResultList {
        /**
          * Whether to automatically retrieve an additional page of results and append it to the current results when the user scrolls down to the bottom of element
         */
        "enableInfiniteScroll"?: boolean;
        "fieldsToInclude"?: string;
        /**
          * Css class for the list wrapper
         */
        "listClass"?: string;
        /**
          * Css class for a list element
         */
        "listElementClass"?: string;
    }
    interface AtomicResultTemplate {
        "conditions"?: ResultTemplateCondition[];
        "fieldsToInclude"?: string;
    }
    interface AtomicResultValue {
        "value"?: string;
    }
    interface AtomicResultsPerPage {
        /**
          * Initial value of the result per page option
         */
        "initialOption"?: number;
        /**
          * List of possible results per page options, separated by commas
         */
        "options"?: string;
    }
    interface AtomicSearchBox {
        "_id"?: string;
        "enableQuerySyntax"?: boolean;
        /**
          * Wether the submit button should be place before the input
         */
        "leadingSubmitButton"?: boolean;
        /**
          * Maximum number of suggestions to display
         */
        "numberOfSuggestions"?: number;
    }
    interface AtomicSearchInterface {
        "logLevel"?: LogLevel;
        "pipeline"?: string;
        "sample"?: boolean;
        "searchHub"?: string;
    }
    interface AtomicSortDropdown {
    }
    interface AtomicTab {
        "expression"?: string;
        "isActive"?: boolean;
    }
    interface IntrinsicElements {
        "atomic-breadcrumb-manager": AtomicBreadcrumbManager;
        "atomic-category-facet": AtomicCategoryFacet;
        "atomic-component-error": AtomicComponentError;
        "atomic-context-provider": AtomicContextProvider;
        "atomic-date-facet": AtomicDateFacet;
        "atomic-did-you-mean": AtomicDidYouMean;
        "atomic-facet": AtomicFacet;
        "atomic-facet-manager": AtomicFacetManager;
        "atomic-field-condition": AtomicFieldCondition;
        "atomic-frequently-bought-together": AtomicFrequentlyBoughtTogether;
        "atomic-history": AtomicHistory;
        "atomic-numeric-facet": AtomicNumericFacet;
        "atomic-pager": AtomicPager;
        "atomic-query-error": AtomicQueryError;
        "atomic-query-summary": AtomicQuerySummary;
        "atomic-relevance-inspector": AtomicRelevanceInspector;
        "atomic-result": AtomicResult;
        "atomic-result-link": AtomicResultLink;
        "atomic-result-list": AtomicResultList;
        "atomic-result-template": AtomicResultTemplate;
        "atomic-result-value": AtomicResultValue;
        "atomic-results-per-page": AtomicResultsPerPage;
        "atomic-search-box": AtomicSearchBox;
        "atomic-search-interface": AtomicSearchInterface;
        "atomic-sort-dropdown": AtomicSortDropdown;
        "atomic-tab": AtomicTab;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "atomic-breadcrumb-manager": LocalJSX.AtomicBreadcrumbManager & JSXBase.HTMLAttributes<HTMLAtomicBreadcrumbManagerElement>;
            "atomic-category-facet": LocalJSX.AtomicCategoryFacet & JSXBase.HTMLAttributes<HTMLAtomicCategoryFacetElement>;
            "atomic-component-error": LocalJSX.AtomicComponentError & JSXBase.HTMLAttributes<HTMLAtomicComponentErrorElement>;
            "atomic-context-provider": LocalJSX.AtomicContextProvider & JSXBase.HTMLAttributes<HTMLAtomicContextProviderElement>;
            "atomic-date-facet": LocalJSX.AtomicDateFacet & JSXBase.HTMLAttributes<HTMLAtomicDateFacetElement>;
            "atomic-did-you-mean": LocalJSX.AtomicDidYouMean & JSXBase.HTMLAttributes<HTMLAtomicDidYouMeanElement>;
            "atomic-facet": LocalJSX.AtomicFacet & JSXBase.HTMLAttributes<HTMLAtomicFacetElement>;
            "atomic-facet-manager": LocalJSX.AtomicFacetManager & JSXBase.HTMLAttributes<HTMLAtomicFacetManagerElement>;
            "atomic-field-condition": LocalJSX.AtomicFieldCondition & JSXBase.HTMLAttributes<HTMLAtomicFieldConditionElement>;
            "atomic-frequently-bought-together": LocalJSX.AtomicFrequentlyBoughtTogether & JSXBase.HTMLAttributes<HTMLAtomicFrequentlyBoughtTogetherElement>;
            "atomic-history": LocalJSX.AtomicHistory & JSXBase.HTMLAttributes<HTMLAtomicHistoryElement>;
            "atomic-numeric-facet": LocalJSX.AtomicNumericFacet & JSXBase.HTMLAttributes<HTMLAtomicNumericFacetElement>;
            "atomic-pager": LocalJSX.AtomicPager & JSXBase.HTMLAttributes<HTMLAtomicPagerElement>;
            "atomic-query-error": LocalJSX.AtomicQueryError & JSXBase.HTMLAttributes<HTMLAtomicQueryErrorElement>;
            "atomic-query-summary": LocalJSX.AtomicQuerySummary & JSXBase.HTMLAttributes<HTMLAtomicQuerySummaryElement>;
            "atomic-relevance-inspector": LocalJSX.AtomicRelevanceInspector & JSXBase.HTMLAttributes<HTMLAtomicRelevanceInspectorElement>;
            "atomic-result": LocalJSX.AtomicResult & JSXBase.HTMLAttributes<HTMLAtomicResultElement>;
            "atomic-result-link": LocalJSX.AtomicResultLink & JSXBase.HTMLAttributes<HTMLAtomicResultLinkElement>;
            "atomic-result-list": LocalJSX.AtomicResultList & JSXBase.HTMLAttributes<HTMLAtomicResultListElement>;
            "atomic-result-template": LocalJSX.AtomicResultTemplate & JSXBase.HTMLAttributes<HTMLAtomicResultTemplateElement>;
            "atomic-result-value": LocalJSX.AtomicResultValue & JSXBase.HTMLAttributes<HTMLAtomicResultValueElement>;
            "atomic-results-per-page": LocalJSX.AtomicResultsPerPage & JSXBase.HTMLAttributes<HTMLAtomicResultsPerPageElement>;
            "atomic-search-box": LocalJSX.AtomicSearchBox & JSXBase.HTMLAttributes<HTMLAtomicSearchBoxElement>;
            "atomic-search-interface": LocalJSX.AtomicSearchInterface & JSXBase.HTMLAttributes<HTMLAtomicSearchInterfaceElement>;
            "atomic-sort-dropdown": LocalJSX.AtomicSortDropdown & JSXBase.HTMLAttributes<HTMLAtomicSortDropdownElement>;
            "atomic-tab": LocalJSX.AtomicTab & JSXBase.HTMLAttributes<HTMLAtomicTabElement>;
        }
    }
}
