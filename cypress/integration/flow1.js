describe("The products list page", () => {
  before(() => {
    cy.visit("/profile/customers/sign_in");
    cy.login("info+qa.f1@b2bwave.com", "qa81923b!");
    Cypress.Cookies.preserveOnce('_b2b_session', '_hjAbsoluteSessionInProgress', '_hjid', 'first_visit_referral', 'first_visit_at')
  });

  it("Should validate unavailable products", () => {
    cy.visit("/products/list?category=14");
    cy.server();
    cy.route("POST", "/order_products/add_multiple_products").as(
      "addMultipleProducts"
    );
    cy.get("#order_product_1quantity").type("1").blur();
    cy.get("#errorModal > .modal-dialog > .modal-content > .modal-body").should(
      "contain.text",
      "Product Cherries is not available"
    );
    cy.get("@addMultipleProducts")
      .its("response.body")
      .should("deep.equal", [
        {
          success: 0,
          message: "Product Cherries is not available",
          quantity: 0,
          product_id: "76",
        },
      ]);
    cy.get(
      "#errorModal > .modal-dialog > .modal-content > .modal-header > .close"
    ).click();
  });

  it("Should add available products", () => {
    cy.clearCart();
    cy.visit("/products/list?category=14");
    cy.server();
    cy.route("POST", "/order_products/add_multiple_products").as(
      "addMultipleProducts"
    );
    cy.get("#order_product_3quantity")
      .clear({ force: true })
      .type("10", { force: true })
      .blur({ force: true });
    cy.wait("@addMultipleProducts");
    cy.get("@addMultipleProducts")
      .its("response.body")
      .should("deep.equal", [
        {
          message: "Green Apples added to order",
          product_id: "74",
          quantity: 10,
          success: 1,
        },
      ]);
  });

  it("Should review and add a request date", () => {
    cy.get("#current-order-total > .btn").click();
    cy.get(":nth-child(4) > .pull-right > .btn").click();
    cy.get("#order_request_delivery_at")
      .type("2020-10-23")
      .then(($el) => {
        cy.get("#ui-datepicker-div").should("be.visible");
      });
    cy.get("#order_request_delivery_at").type('{esc}')  
  });

  it("Should confirm and redirect user to the success page", () => {
    cy.get("#order_request_delivery_at").click()
    cy.get("#order_comments_customer").type('Test');
    cy.get("#confirm-order-form-submit-button").click();
    cy.location('pathname').should('eq', '/orders/confirm_order_success')
  }); 
});
