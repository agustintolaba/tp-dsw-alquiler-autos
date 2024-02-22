import React from 'react';
import ProvinciaItem from './ProvinciaItem';
import { ProvinciaProps } from './ProvinciaItem';

const item: ProvinciaProps = {
  isAdmin: true,
  onProvinciaListChanged: () => {
    console.log('Aqui va una funcion, como la uso?');
  },
  //"key": 1
  id: 1,
  descripcion: 'Santa Fe',
};

describe('<ProvinciaItem />', () => {
  it('renders ProvinciaItem', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ProvinciaItem
        isAdmin={item.isAdmin}
        onProvinciaListChanged={item.onProvinciaListChanged}
        key={item.id}
        id={item.id}
        descripcion={item.descripcion}
      />
    );
    cy.get('span').should('have.text', item.descripcion);
    cy.get(`[data-testid="edit-provincia-${item.descripcion}"]`).should(
      'have.text',
      'Editar'
    );
    cy.get(`[data-testid="delete-provincia-${item.descripcion}"`).should(
      'have.text',
      'Eliminar'
    );
  });
});
