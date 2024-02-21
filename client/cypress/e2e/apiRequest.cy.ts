import { Provincia } from "@/types.js"
const endPoint = 'http://localhost:3000/api/provincia'

const newProvincia: Provincia = {
  "id": 0,
  "descripcion": "ProvinciaTest",
  "localidades": []
}

const patchProvincia: Provincia ={
  "id": 0,
  "descripcion": "ProvinciaTestPatch",
  "localidades": []
}

const addProvincia = (newProvincia: Provincia) =>{
cy.request({
    method: 'POST',
    url: endPoint,
    headers: {
      Authorization: 'Bearer yourAuthTokenHere' // Reemplaza con tu token???
    },
    body: newProvincia
  })
}

const updateProvincia = (patchProvincia: Provincia) =>{
cy.request('PATCH', `${endPoint}/${patchProvincia.id}`, patchProvincia) //agregat token tambien
}

const deleteProvincia = (deleteProvincia: Provincia) =>{
  cy.request('DELETE', `${endPoint}/${deleteProvincia.id}`) //agregat token tambien
}

describe('API testing', ()=>{
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
