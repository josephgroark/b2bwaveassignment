// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, pw) => {
  cy.get("body").then(($body) => {
    if ($body.find("#customer_email").length > 0) {
      cy.get("#customer_email").then(($el) => {
        if ($el.is(":visible")) {
          cy.get("#customer_email").type(email);
          cy.get("#customer_password").type(pw);
          cy.get('[name="commit"]').click();
        }
      });
    } else {
      assert.isOk("Already", "logged in");
    }
  });
});

Cypress.Commands.add("clearCart", () => {
  cy.get('#current-order-total > .btn').click();  
  cy.get("body").then(($body) => {
    if ($body.find(".product-delete").length > 0) {
      cy.get(".product-delete").then(($el) => {
        if ($el.is(":visible")) {
          cy.get(".text-danger").click();
        }
      });
    } else {
      assert.isOk("Already", "cleared");
    }
  });
});
