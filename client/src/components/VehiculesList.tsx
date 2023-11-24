/*Para crear el componente de la lista de vehiculos*/
'use client';
import { useState, useEffect } from 'react';
import VehiculoItem from '@/components/VehiculeItem';
import { Vehiculo } from '@/types';
import { verifyAdmin } from '@/services/user';
import { getVehicleTypes } from '@/services/vehicleTypes';
import { getVehicles } from '@/services/vehicle';

interface ShowVehiculosProps {
  id: number | null;
}

const VehiculoList: React.FC<ShowVehiculosProps> = ({ id }) => {
  const [vehicles, setVehicles] = useState<Vehiculo[]>()
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      verifyAdmin()
        .then((isAdmin) => {
          setIsAdmin(isAdmin)
        })
        .catch((error: any) => {
          alert('Error al verificar acceso')
          history.back()
        })
    }
    fetchData()
  })

  useEffect(() => {
    const fetchVehiculoItems = async () => {
      try {
        const vehicles = await getVehicles(id)
        setVehicles(vehicles)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchVehiculoItems()
  }, [id])

  return (
    <main className="flex flex-col p-8 gap-12">
      <div className="flex flex-col gap-12 max-w-4xl">
        {vehicles ? (
          vehicles.map((vehicle: Vehiculo) => (
            <VehiculoItem
              key={vehicle.id}
              isAdmin={isAdmin}
              vehicle={vehicle}              
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
