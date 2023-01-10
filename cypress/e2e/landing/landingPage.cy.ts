import { customer, subPages } from "../../fixtures/data/consts";
Cypress._.times(10, () => {
  describe("Enmacc landing page test suite", () => {
    beforeEach(() => {
      // visits the base url
      cy.visit("");
      cy.title().should(
        "eq",
        "OTC Energy Trading Platform for Professional Traders - enmacc.com"
      );
      cy.get("#logo").should("be.visible");
    });
    context("Navigate to menu sub pages", () => {
      subPages.forEach((page) => {
        it(`User should be able to navigate to ${page.name}`, () => {
          cy.navigateToSubMenu(
            page.pageSelector,
            page.pagePath,
            page.pageHeader
          );
        });
      });
    });
    context("Fill 'Get in touch' form", () => {
      it("User should not be able to proceed without filling all the required fields", () => {
        cy.get(".wpb_wrapper").contains("Request Live demo").click();
        // Filling First Name
        cy.getIframeBody(".col-sm-12 > iframe")
          .as("iframe")
          .find("[elname='submit']")
          .eq(0)
          .click();
        cy.get("@iframe")
          .find("#error-Name")
          .contains("Enter a value for this field.")
          .should("be.visible");
        cy.get("@iframe")
          .find("#error-SingleLine1")
          .contains("Enter a value for this field.")
          .should("be.visible");
      });

      it("User should be able to proceed after filling all the fields", () => {
        cy.get(".wpb_wrapper").contains("Request Live demo").click();
        // Filling First Name
        cy.getIframeBody(".col-sm-12 > iframe")
          .as("iframe")
          .find("[elname='First']")
          .type(customer.firstName);
        // Filling company
        cy.get("@iframe").find("[name='SingleLine1']").type(customer.company);
        // Filling email
        cy.get("@iframe").find("[name='Email']").type(customer.email);
        // Filling wrong Phone
        cy.get("@iframe").find("#PhoneNumber").type("asdf");
        // Filling commodities
        cy.get("@iframe")
          .find("#Checkbox-li")
          .contains(customer.commodities)
          .click();
        // Filling comment section
        cy.get("@iframe").find("[name='MultiLine']").type(customer.message);
        cy.get("@iframe")
          .find("[elname='submit']")
          .eq(0)
          .as("submitBtn")
          .click();
        // Error should be displayed for not filling last name
        cy.get("@iframe")
          .find("#error-Name")
          .contains("Enter a value for this field.")
          .should("be.visible");
        // Filling Last Name
        cy.get("@iframe").find("[elname='Last']").type(customer.lastName);

        cy.get("@submitBtn").click();
        // Error should be displayed for not filling wron phone.
        cy.get("@iframe")
          .find("[elname='phoneFormatElem']")
          .contains(
            "Enter a valid phone number. Allowed special characters: + - . ( ) space"
          )
          .should("be.visible");
        // Filling correct phone
        cy.get("@iframe").find("#PhoneNumber").clear().type(customer.phone);

        /* 
      !commented to not submit the application in production

      cy.get("@submitBtn").click();
      // Explicit wait is needed to get the new frame 
      cy.wait(500)
      cy.getIframeBody(".col-sm-12 > iframe").contains(
        "Thank you! Your response has been submitted."
      );
      */
      });
    });
    context("Footer", () => {
      it("User should be able to scroll to the end of the screen", () => {
        cy.scrollTo("bottom");
        cy.window().its("scrollY").should("not.equal", 0);
        cy.get("footer").should("be.visible");
      });

      it("User should be able to download Media Kit for Press", () => {
        cy.get("#menu-item-15452 a")
          .invoke("attr", "href")
          .then((href) => {
            href = href.trim();
            console.log(href);
            cy.request(href).then((resp) => {
              expect(resp.status).to.eq(200);
              expect(resp.headers).to.have.property(
                "content-type",
                "application/zip"
              );
            });
          });
      });
    });
  });
});
