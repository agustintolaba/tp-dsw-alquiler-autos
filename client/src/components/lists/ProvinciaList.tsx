/*Para crear el componente de la lista de Provincias*/
'use client';
import { useState, useEffect } from 'react';
import ProvinciaItem, { Provincia } from '../items/ProvinciaItem';
import apiClient from '@/services/api';

const ProvinciaList: React.FC<{ onProvinciaListChanged: () => void }> = ({
  onProvinciaListChanged,
}) => {
  const [provinciaItems, setProvinciaItems] = useState<Provincia[]>([]);

  useEffect(() => {
    const fetchProvinciaItems = async () => {
      try {
        const response = apiClient.get('/provincia').then((res) => {
          const list = res.data.data.map((item: Provincia) => {
            return {
              id: item.id.toString(),
              descripcion: item.descripcion,
            };
          });
          setProvinciaItems(list);
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProvinciaItems();
  }, [onProvinciaListChanged]);

  return (
    <main className="flex flex-col items-center p-8 gap-12">
      <div className="grid grid-cols-3 gap-12 max-w-4xl">
        {provinciaItems.length > 0 ? (
          provinciaItems.map((item: Provincia) => (
            <ProvinciaItem
              onProvinciaListChanged={onProvinciaListChanged}
              key={item.id}
              id={item.id}
              descripcion={item.descripcion}
            />
          ))
        ) : (
          <p>Sin provincias en el sistema actualmente!</p>
        )}
      </div>
    </main>
  );
};

export default ProvinciaList;
