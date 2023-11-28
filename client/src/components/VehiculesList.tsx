/*Para crear el componente de la lista de vehiculos*/
'use client';
import { useState, useEffect } from 'react';
import VehiculoItem from '@/components/items/VehiculeItem';
import { Vehiculo } from '@/types';
import { getVehicles } from '@/services/vehicle';
import { alertError } from '@/utils/errorHandling';

interface IVehiclesListProps {
  isAdmin: boolean;
  vehicleTypeId: number | null;
}

const VehiclesList: React.FC<IVehiclesListProps> = ({ isAdmin, vehicleTypeId: id }) => {
  const [vehicles, setVehicles] = useState<Vehiculo[]>();

  useEffect(() => {
    const fetchData = async () => {
      getVehicles(id)
        .then((vehicles) => {
          setVehicles(vehicles);
        })
        .catch((error: any) => {
          alertError(error);
        });
    };
    fetchData();
  }, []);

  return (
    <main className="flex flex-col p-8 gap-12">
      <div className="flex flex-col gap-8">
        {vehicles ? (
          vehicles.map((vehicle: Vehiculo) => (
            <VehiculoItem
              key={vehicle.id}
              isAdmin={isAdmin}
              isBooking={false}
              vehicle={vehicle}
            />
          ))
        ) : (
          <p>No hay vehículos disponibles por el momento!</p>
        )}
      </div>
    </main>
  );
};

export default VehiclesList;
