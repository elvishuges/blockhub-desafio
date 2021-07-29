const registeredUser = {
  email: "devopsuser@hotmail.com",
  password: "123456",
};

const TokenKey = "blockhub.api.auth";

describe("test initial page login, register and forguet password", () => {
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

  it("go back to login interface and login and acess dashboard", function() {
    // programmatically log us in without needing the UI
    cy.visit("/login"); // programmatically log us in without needing the UI
    window.localStorage.removeItem(TokenKey);
    cy.get("input[name=email]").type(registeredUser.email);
    cy.get("input[name=password]").type(registeredUser.password);
    //cy.get("[data-cy=submit]").click();
    cy.request({
      method: "post",
      url: "https://api-desafio-blockub.herokuapp.com/login",
      failOnStatusCode: false,
      body: {
        email: registeredUser.email,
        password: registeredUser.password,
      },
    }).then((response) => {
      // response.body is automatically serialized into JSON
      console.log("response login", response);
      window.localStorage.setItem(TokenKey, response.body.access_token);
      expect(response.status).to.eq(201);
      expect(response).to.have.property("headers");
      cy.reload();
      cy.url().should("include", "/dashboard");
    });
  });

  it("programmatic login user", function() {});
});
