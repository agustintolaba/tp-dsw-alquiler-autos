/*Para crear el componente de la lista de vehiculos*/
'use client';
import { useState, useEffect } from 'react';
import VehiculoItem, {VehiculoItemProps} from '@/components/VehiculeItem';

interface ShowVehiculosProps {
  id: string | null;
}

const VehiculoList: React.FC<ShowVehiculosProps> = ({ id }) =>{
  const [vehiculoItems, setVehiculoItems] = useState([])
  
  useEffect(() => {
    const fetchVehiculoItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/tipovehiculo/${id}/vehiculo`)
            const data = await response.json()
            const list = data.data
                .map((item: any) => {
                    return {
                        id: item.id.toString(),
                        nombre: item.nombre,
                        trasmision: item.trasmision,
                        capacidad: item.capacidad.toString(),
                        disponible: item.disponible.toString(),
                        image: item.image,
                        tipoVehiculo: {
                            id: item.tipoVehiculo.id.toString(),
                            nombre: item.tipoVehiculo.nombre,
                            descripcion: item.tipoVehiculo.descripcion,
                            precio: item.tipoVehiculo.precio,
                            image: item.tipoVehiculo.image
                        }
                    }
                })
              
            setVehiculoItems(list)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    fetchVehiculoItems()
}, [id])

  return (
    <main className="flex flex-col p-8 gap-12">      
       <div className="flex flex-col gap-12 max-w-4xl">
          {vehiculoItems.length > 0 ? (
                vehiculoItems.map((item: VehiculoItemProps) => (
                      <VehiculoItem
                        key={item.id}
                        id={item.id}
                        nombre={item.nombre}
                        trasmision={item.trasmision}
                        capacidad={item.capacidad}
                        disponible={item.disponible}
                        image={item.image} 
                        tipoVehiculo={item.tipoVehiculo}      
                      />
                ))
                ) : (
                    <p>No hay vehículos disponibles por el momento!</p>
                )}
        </div> 
    </main>
  );
}

export default VehiculoList
