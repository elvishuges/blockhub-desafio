describe("direct to login and register page", () => {
  it("try to login with invalids fields", () => {
    cy.visit("/");
    cy.get(".v-btn.login").click();
    cy.get("input[name=email]").type("elvishuges@");
    cy.get("input[name=password]").type("12");
    cy.url().should("include", "/login");
  });

  it("try to register with invalids fields", () => {
    cy.visit("/");
    cy.get(".v-btn.register").click();
    cy.get("input[name=name]").type("elvis");
    cy.get("input[name=email]").type("invalid@");
    cy.get("input[name=password]").type("123123");
    cy.get("input[name=password]").type("321321");
    cy.url().should("include", "/register");
  });

  it("logs in programmatically without using the UI and wrong creadencials", function() {
    // programmatically log us in without needing the UI
    cy.request(
      {
        method: "post",
        url: "https://api-desafio-blockub.herokuapp.com/login",
        failOnStatusCode: false,
      },
      {
        email: "elvishuges@hotmail.com",
        password: "123456",
      }
    ).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(400);
    });
  });
});
