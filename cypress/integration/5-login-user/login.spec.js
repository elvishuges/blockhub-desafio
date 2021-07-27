const registeredUser = {
  email: "devopsuser@hotmail.com",
  password: "123456",
};

const TokenKey = "blockhub.api.auth";

it("programmatic login user", function() {
  // programmatically log us in without needing the UI
  window.localStorage.removeItem(TokenKey);
  cy.visit("/login");
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
