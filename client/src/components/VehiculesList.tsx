'use client';

import VehiculoItem from "@/components/items/VehiculeItem";
import { Vehiculo } from "@/types";
import useVehicle, { getVehicles } from "@/services/vehicle";
import LoadableScreen from "./LoadableScreen";

interface IVehiclesListProps {
  isAdmin: boolean;
  vehicleTypeId: number | null;
}

const VehiclesList: React.FC<IVehiclesListProps> = ({
  isAdmin,
  vehicleTypeId,
}) => {
  const { isLoadingVehicle, vehicles, edit, remove } = useVehicle(vehicleTypeId);

  return (
    <LoadableScreen isLoading={isLoadingVehicle}>
      <main className="flex flex-col p-8 gap-12">
        <div className="flex flex-col gap-8">
          {vehicles ? (
            vehicles.map((vehicle: Vehiculo) => (
              <VehiculoItem
                key={vehicle.id}
                isAdmin={isAdmin}
                isBooking={false}
                vehicle={vehicle}
                edit={edit}
                remove={remove}
              />
            ))
          ) : (
            <p>No hay vehículos disponibles por el momento!</p>
          )}
        </div>
      </main>
    </LoadableScreen>
  );
};

export default VehiclesList;
