import { Provincia } from "@/types.js"
const endPoint = 'http://localhost:3000/api/provincia'

let idProv: number = 10

const newProvincia: Provincia = {
  "id": idProv,
  "descripcion": "ProvinciaTest2",
  "localidades": []
}

const patchProvincia: Provincia ={
  "id": idProv,
  "descripcion": "ProvinciaTestPatch2",
  "localidades": []
}

const userLogin= { 
  "email": Cypress.env("userTest"),
  "password": Cypress.env("passwordTest")
}

let authToken: string

const addProvincia = (newProvincia: Provincia) =>{
cy.request({
    method: 'POST',
    url: endPoint,
    headers: {
      Authorization: authToken
    },
    body: newProvincia
  })
  .then((data) => {
      authToken = data.id;
    })
}

const updateProvincia = (patchProvincia: Provincia) =>{
cy.request(
  {
    method: 'PATCH',
    url: `${endPoint}/${patchProvincia.id}`,
    headers: {
      Authorization: authToken
    },
    body: patchProvincia
  })}


const deleteProvincia = (deleteProvincia: Provincia) =>{
  cy.request(
    {
    method: 'DELETE',
    url: `${endPoint}/${deleteProvincia.id}`,
    headers: {
      Authorization: authToken
    },
  })
}

describe('API testing', ()=>{
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3000/api/usuario/login', userLogin)
    .its('body')
    .then((body) => {
      authToken = body.token;
    });
  });


  it('Add a new provincia', ()=>{
    addProvincia(newProvincia)

    cy.request('GET', `${endPoint}/${newProvincia.id}`)
    .its('body')
    .should('deep.equal', newProvincia)
  })

  it('Update a provincia', ()=>{
    updateProvincia(patchProvincia)

    cy.request('GET', `${endPoint}/${patchProvincia.id}`)
    .its('body')
    .should('deep.equal', patchProvincia)
  })

  it('Delete a provincia', ()=>{
    deleteProvincia(patchProvincia)
    cy.request('GET', `${endPoint}/${patchProvincia.id}`)
    .its('body')
    .its('message')
    .should('Provincia no encontrada')
  })

})
