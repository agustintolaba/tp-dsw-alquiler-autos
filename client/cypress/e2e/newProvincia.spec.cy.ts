describe("Agregar una nueva provincia", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
    cy.get('[id="simple-tab-0"]').click();
    cy.get('[type="email"]').type("nino@gmail.com");
    cy.get('[type="password"]').type("ntell");
    cy.get('[type="submit"]').should("not.be.disabled").click();
    cy.url().should("eq", "http://localhost:3001/home");
  });

  it("Agregar una nueva provincia satisfactoriamente", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get('[data-testid="MenuIcon"]').click();
    cy.get('[role="button"]').contains("Administrar provincias").click();
    cy.url().should("eq", "http://localhost:3001/home/provincia");
    cy.get('[data-testid="input-new-provincia"]').type("ProvinciaTest");
    cy.get('[type="submit"]')
      .contains("Añadir")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Se cargó una nueva provincia"
        );
      });
  });

  it("Eliminar una provincia", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get('[data-testid="MenuIcon"]').click();
    cy.get('[role="button"]').contains("Administrar provincias").click();
    cy.url().should("eq", "http://localhost:3001/home/provincia");
    cy.get('[data-testid="delete-provincia-ProvinciaTest"]').click();
    cy.get('[data-testid="delete-provincia-ProvinciaTest"]').should(
      "not.exist"
    );
  });
});
