/*Para crear el componente de la lista de TipoVehiculo*/
'use client';
import { useState, useEffect } from 'react';
import TipoVehiculoItem from '../items/TipoVehiculoItem';
import { TipoVehiculo } from '@/types';
import apiClient from '@/services/api';

interface TipoVehiculoListProps {
  isAdmin: boolean;
  onTipoVehiculoListChanged: () => void;
}

const TipoVehiculoList: React.FC<TipoVehiculoListProps> = ({
  isAdmin,
  onTipoVehiculoListChanged,
}) => {
  const [tipoVehiculoItems, setTipoVehiculoItems] = useState<TipoVehiculo[]>(
    []
  );

  useEffect(() => {
    const fetchTipoVehiculoItems = async () => {
      try {
        const response = apiClient()
          .get('/tipoVehiculo')
          .then((res) => {
            const list = res.data.types.map((item: TipoVehiculo) => {
              return {
                id: item.id.toString(),
                nombre: item.nombre,
                descripcion: item.descripcion,
                precio: item.precio,
              };
            });
            setTipoVehiculoItems(list);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTipoVehiculoItems();
  }, [onTipoVehiculoListChanged]);

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 gap-4 sm:gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {tipoVehiculoItems.length > 0 ? (
          tipoVehiculoItems.map((item: TipoVehiculo) => (
            <TipoVehiculoItem
              isAdmin={isAdmin}
              onTipoVehiculoListChanged={onTipoVehiculoListChanged}
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              precio={item.precio}
            />
          ))
        ) : (
          <span>Sin Tipos de Vehiculo actualmente en el sistema.</span>
        )}
      </div>
    </div>
  );
};

export default TipoVehiculoList;
