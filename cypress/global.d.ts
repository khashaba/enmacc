/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Navigates to sub menu from the navigation menu
     * @param {string} pageSelector - the selector of the link to the desired page to navigate
     * @param {string} pagePath - the subsection to be clicked from the left menu
     * @param {string} pageHeader - the url of the desired page to assert that the navigation succeeded
     */
    navigateToSubMenu(
      pageSelector: string,
      pagePath: string,
      pageHeader: string
    ): void;

    /**
     * Returns the wrapped body of an iframe
     * @param {string} iframeSelector - the selector of the iframe to get it's body
     */
    getIframeBody(iframeSelector: string): Chainable<any>;
  }
}
