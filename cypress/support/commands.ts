Cypress.Commands.add(
  "navigateToSubMenu",
  (pageSelector: string, pagePath: string, pageHeader: string) => {
    cy.get(pageSelector).click({ force: true });
    cy.location("pathname").should("eq", pagePath);
    // cy.get(".wpb_wrapper").contains(pageHeader).should("be.visible");
  }
);

Cypress.Commands.add("getIframeBody", (iframeSelector: string) => {
  const getIframeDocument = () => {
    return (
      cy
        .get(iframeSelector)
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        .its("0.contentDocument")
        .should("exist")
    );
  };

  // get the document
  return (
    getIframeDocument()
      // automatically retries until body is loaded
      .its("body")
      .should("not.be.undefined")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  );
});
