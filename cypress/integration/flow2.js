describe("The user", () => {
  before(() => {
    cy.visit("/profile/customers/sign_in")
    cy.login("info+qa.f2@b2bwave.com", "qa81923b!");
  });

  it("Should be redirected from unaccessible url's to base url ", () => {
      cy.visit('https://phyllis.b2bwave.com/products/list?category=9').then(() => {
        cy.location('pathname').should('eq', '/')
    });;
  });
});
