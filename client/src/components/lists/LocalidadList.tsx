/*Para crear el componente de la lista de Localidades*/
'use client';
import { useState, useEffect } from 'react';
import LocalidadItem, { Localidad } from '../items/LocalidadItem';
import apiClient from '@/services/api';

interface LocalidadListProps {
  isAdmin: boolean;
  onLocalidadListChanged: () => void;
}

const LocalidadList: React.FC<LocalidadListProps> = ({
  isAdmin,
  onLocalidadListChanged,
}) => {
  const [localidadItems, setLocalidadItems] = useState<Localidad[]>([]);

  useEffect(() => {
    const fetchLocalidadItems = async () => {
      try {
        const response = apiClient()
          .get('/localidad')
          .then((res) => {
            const list = res.data.data.map((item: Localidad) => {
              return {
                id: item.id.toString(),
                descripcion: item.descripcion,
                provincia: {
                  id: item.provincia.id,
                  descripcion: item.provincia.descripcion,
                },
              };
            });
            setLocalidadItems(list);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchLocalidadItems();
  }, [onLocalidadListChanged]);

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 gap-4 sm:gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {localidadItems.length > 0 ? (
          localidadItems.map((item: Localidad) => (
            <LocalidadItem
              isAdmin={isAdmin}
              onLocalidadListChanged={onLocalidadListChanged}
              key={item.id}
              id={item.id}
              descripcion={item.descripcion}
              provincia={item.provincia}
            />
          ))
        ) : (
          <span>Sin Localidades actualmente en el sistema.</span>
        )}
      </div>
    </div>
  );
};

export default LocalidadList;
