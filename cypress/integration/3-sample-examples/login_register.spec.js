describe("direct to login and register page", () => {
  it("try to login with invalids fields", () => {
    cy.visit("/");
    cy.get("input[name=email]").type("elvishuges@");
    cy.get("input[name=password]").type("12");
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/login");
  });

  it("try to register with invalids fields", () => {
    cy.visit("/register");
    cy.get("input[name=name]").type("elvis");
    cy.get("input[name=email]").type("invalid@");
    cy.get("input[name=password]").type("123123");
    cy.get("input[name=confirmpassword]").type("321321");
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/register");
  });

  it("programmatic login without using the UI and using wrong creadencials", function() {
    // programmatically log us in without needing the UI
    cy.request({
      method: "post",
      url: `${Cypress.env("EXTERNAL_API")}/login`,
      failOnStatusCode: false,
      body: {
        email: "emailNotRegistered@hotmail.com",
        password: "123456",
      },
    }).then((response) => {
      // response.body is automatically serialized into JSON
      console.log("response", response);
      expect(response.status).to.eq(403);
      expect(response).to.have.property("headers");
    });
  });

  it("programmatic login using the UI and using wrong creadencials", () => {
    // Alias the route to wait for its response
    cy.visit("/login");
    cy.get("input[name=email]").type("emailNotRegistered@hotmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("[data-cy=submit]").click();
    cy.intercept("POST", `${Cypress.env("EXTERNAL_API")}/login`).as("login");

    // https://on.cypress.io/wait
    cy.wait("@login")
      .its("response.statusCode")
      .should("eq", 403);
  });

  it("go back to login interface", function() {
    // programmatically log us in without needing the UI
    cy.visit("/login");
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/login");
  });
});
