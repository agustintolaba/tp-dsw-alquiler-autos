describe('Agregar una nueva provincia', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001')
    cy.get('[id="simple-tab-0"]').click()
    cy.get('[type="email"]').type('agus@gmail.com')
    cy.get('[type="password"]').type('Hola1')
    cy.get('[type="submit"]').should('not.be.disabled').click()
    cy.url().should('eq', 'http://localhost:3001/home')
  })

  it('Agregar una nueva provincia satisfactoriamente', () => {
    cy.get('[data-testid="MenuIcon"]').click()
    cy.get('[role="button"]').contains('Administrar provincias').click()
    cy.url().should('eq', 'http://localhost:3001/home/provincia')
    cy.get('[id=":r0:-label"]').type('ProvinciaTest')
    cy.get('[type="submit"]').contains('Añadir').click()
    /*faltaria agregar la validacion de agregada correctamente, despues de sacar el alert*/
  })

})