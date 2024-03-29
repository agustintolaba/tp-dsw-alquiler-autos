import { Provincia } from "@/types.js";
const endPoint = `${Cypress.env("apiBaseURL")}/api/provincia`;

let idProv: number = 10;

const newProvincia: Provincia = {
  id: idProv,
  descripcion: "ProvinciaTest6",
  localidades: [],
};

const patchProvincia: Provincia = {
  id: idProv,
  descripcion: "ProvinciaTestPatch6",
  localidades: [],
};

const userLogin = {
  email: Cypress.env("userTest"),
  password: Cypress.env("passwordTest"),
};

let authToken: string;

const addProvincia = (newProvincia: Provincia) => {
  cy.request({
    method: "POST",
    url: endPoint,
    headers: {
      Authorization: authToken,
    },
    body: newProvincia,
  })
    .then((data) => {
      idProv = data.body.id;
    })
    .its("body.message")
    .should("eq", "Se cargo nueva provincia");
};

const addProvinciaWrong = (newProvincia: Provincia) => {
  cy.request({
    method: "POST",
    url: endPoint,
    headers: {
      Authorization: authToken,
    },
    body: newProvincia,
    failOnStatusCode: false,
  })
    .then((data) => {
      idProv = data.body.id;
    })
    .its("body.message")
    .should("eq", "No se pudo cargar la nueva provincia");
};

const updateProvincia = (patchProvincia: Provincia) => {
  cy.request({
    method: "PATCH",
    url: `${endPoint}/${patchProvincia.id}`,
    headers: {
      Authorization: authToken,
    },
    body: patchProvincia,
  })
    .its("body.message")
    .should("eq", "Provincia actualizada correctamente");
};

const updateProvinciaWrong = (patchProvincia: Provincia) => {
  cy.request({
    method: "PATCH",
    url: `${endPoint}/-1`,
    headers: {
      Authorization: authToken,
    },
    body: patchProvincia,
    failOnStatusCode: false,
  })
    .its("body.message")
    .should("eq", "La provincia no existe");
};

const deleteProvincia = (id: number) => {
  cy.request({
    method: "DELETE",
    url: `${endPoint}/${id}`,
    headers: {
      Authorization: authToken,
    },
  })
    .its("body.message")
    .should("eq", "Provincia eliminada correctamente");
};

const deleteProvinciaWrong = (id: number) => {
  cy.request({
    method: "DELETE",
    url: `${endPoint}/${id}`,
    headers: {
      Authorization: authToken,
    },
    failOnStatusCode: false,
  })
    .its("body.message")
    .should("eq", "La provincia no existe");
};

describe("API testing", () => {
  beforeEach(() => {
    cy.request("POST", `${endPoint}/usuario/login`, userLogin)
      .its("body")
      .then((body) => {
        authToken = body.token;
      });
  });

  it("Add a new provincia correctly", () => {
    addProvincia(newProvincia);

    cy.request("GET", `${endPoint}/${newProvincia.id}`)
      .its("body.message")
      .should("eq", "Provincia encontrada");
  });

  it("Add a new provincia wrong", () => {
    addProvinciaWrong(newProvincia);
  });

  it("Update a provincia correctly", () => {
    updateProvincia(patchProvincia);

    cy.request("GET", `${endPoint}/${patchProvincia.id}`)
      .its("body.message")
      .should("eq", "Provincia encontrada");
  });

  it("Update a provincia wrong", () => {
    updateProvinciaWrong(patchProvincia);
  });

  it("Delete a provincia correctly", () => {
    deleteProvincia(newProvincia.id);
    cy.request({
      method: "GET",
      url: `${endPoint}/${newProvincia.id}`,
      failOnStatusCode: false,
    })
      .its("body.message")
      .should("eq", "Provincia no encontrada");
  });

  it("Delete a provincia wrong", () => {
    deleteProvinciaWrong(-1);
  });
});
