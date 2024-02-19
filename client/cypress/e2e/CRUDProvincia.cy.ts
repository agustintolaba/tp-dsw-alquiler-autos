// Eliminar provincia existente con nombre ProvinciaTest
describe("CRUD Provincia", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
    cy.typeLogin(Cypress.env("userTest"), Cypress.env("passwordTest"));
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

  it("Agregar una provincia ya existente", () => {
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

  it("Editar una provincia", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get('[data-testid="edit-provincia-ProvinciaTest"]').click();
    cy.get('input[name="new-name-provincia-ProvinciaTest"]')
      .clear()
      .type("ProvinciaTest1");
    cy.get('[data-testid="edit-provincia-ProvinciaTest1-save-button"]')
      .contains("Guardar")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Se edito provincia");
      });
  });

  it("Eliminar una provincia", () => {
    cy.get('[data-testid="delete-provincia-ProvinciaTest1"]').click();
    cy.on("window:confirm", () => true);
    cy.get('[data-testid="delete-provincia-ProvinciaTest1"]').should(
      "not.exist"
    );
  });
});
