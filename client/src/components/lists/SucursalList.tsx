/*Para crear el componente de la lista de Sucursales*/
'use client';
import { useState, useEffect } from 'react';
import SucursalItem, { Sucursal } from '../items/SucursalItem';
import apiClient from '@/services/api';

interface SucursalListProps {
  isAdmin: boolean;
  onSucursalListChanged: () => void;
}

const SucursalList: React.FC<SucursalListProps> = ({
  isAdmin,
  onSucursalListChanged,
}) => {
  const [sucursalesItems, setSucursalesItems] = useState<Sucursal[]>([]);

  useEffect(() => {
    const fetchSucursalItems = async () => {
      try {
        const response = apiClient()
          .get('/sucursal')
          .then((res) => {
            console.log(res.data.branches);
            const list = res.data.branches.map((item: Sucursal) => {
              return {
                id: item.id.toString(),
                calle: item.calle,
                numeroCalle: item.numeroCalle,
                localidad: {
                  id: item.localidad.id.toString(),
                  descripcion: item.localidad.descripcion,
                  provincia: {
                    id: item.localidad.provincia.id,
                    descripcion: item.localidad.provincia.descripcion,
                  },
                },
              };
            });
            console.log(list);
            setSucursalesItems(list);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchSucursalItems();
  }, [onSucursalListChanged]);

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 gap-4 sm:gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {sucursalesItems.length > 0 ? (
          sucursalesItems.map((item: Sucursal) => (
            <SucursalItem
              isAdmin={isAdmin}
              onSucursalListChanged={onSucursalListChanged}
              key={item.id}
              id={item.id}
              sucursal={item}
            />
          ))
        ) : (
          <span>Sin sucursales actualmente en el sistema.</span>
        )}
      </div>
    </div>
  );
};

export default SucursalList;
