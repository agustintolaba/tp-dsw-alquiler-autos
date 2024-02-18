describe("CRUD provincia", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
    cy.typeLogin(Cypress.env('userTest'), Cypress.env('passwordTest'));
    cy.url().should("eq", "http://localhost:3001/home");
    cy.get('[data-testid="MenuIcon"]').click();
    cy.get('[role="button"]').contains("Administrar provincias").click();
    cy.url().should("eq", "http://localhost:3001/home/provincia");
  });

  it("Agregar una nueva provincia satisfactoriamente", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub); 
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

  it('Agregar una provincia ya existente', ()=>{
    const stub = cy.stub();
    cy.on("window:alert", stub); 
    cy.get('[data-testid="input-new-provincia"]').type("ProvinciaTest");
    cy.get('[type="submit"]')
      .contains("Añadir")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "No se pudo cargar la nueva provincia"
        );
      });
  });

  it('Editar una provincia',()=>{
    const stub = cy.stub();
    cy.on("window:alert", stub); 
    cy.get('[data-testid="edit-provincia-ProvinciaTest"]').click();
    cy.get('[data-testid="new-name-provincia-ProvinciaTest"]').type('Edit-ProvinciaTest');
    cy.get('[data-testid="edit-provincia-ProvinciaTest"]')
      .contains("Guardar")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Se edito provincia"
        );
      });
  });

  it("Eliminar una provincia", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get('[data-testid="delete-provincia-ProvinciaTest"]').click();
    cy.get('[data-testid="delete-provincia-ProvinciaTest"]').should(
      "not.exist"
    );
  });
});
