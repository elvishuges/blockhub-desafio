const newUserCredentials = {
  name: "devopsuser",
  email: "devopsuser@hotmail.com",
  password: "123456",
};

describe("direct to login and register page", () => {
  it("programmatic register user", function() {
    // programmatically log us in without needing the UI
    cy.visit("/register");
    cy.get("input[name=name]").type(newUserCredentials.name);
    cy.get("input[name=email]").type(newUserCredentials.email);
    cy.get("input[name=password]").type(newUserCredentials.password);
    cy.get("input[name=confirmpassword]").type(newUserCredentials.password);
    //cy.get("[data-cy=submit]").click();
    cy.request({
      method: "post",
      url: "https://api-desafio-blockub.herokuapp.com/register",
      failOnStatusCode: false,
      body: {
        name: newUserCredentials.name,
        email: newUserCredentials.email,
        password: newUserCredentials.password,
      },
    }).then((response) => {
      // response.body is automatically serialized into JSON
      console.log("response", response);
      expect(response.status).to.eq(201);
      expect(response).to.have.property("headers");
    });
  });
});
