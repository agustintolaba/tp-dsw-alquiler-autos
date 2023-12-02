"use client";

import VehiculoItem from "@/components/items/VehicleItem";
import { Vehiculo } from "@/types";
import useVehicle, { getVehicles } from "@/services/vehicle";
import LoadableScreen from "../LoadableScreen";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface IVehiclesListProps {
  isAdmin: boolean;
  vehicleTypeId: number | null;
}

const VehiclesList: React.FC<IVehiclesListProps> = ({
  isAdmin,
  vehicleTypeId,
}) => {
  const { isLoadingVehicle, vehicles, edit, remove, filter } =
    useVehicle(vehicleTypeId);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    filter(search);
  }, [search]);

  return (
    <LoadableScreen isLoading={isLoadingVehicle}>
      <div className="w-full flex flex-col p-8 gap-12 items-center">
        <TextField
          className="w-96"
          label="Búsqueda por marca o modelo"
          value={search}
          onChange={handleSearchChange}
        />
        <div className="flex flex-row flex-wrap justify-center gap-8">
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
      </div>
    </LoadableScreen>
  );
};

export default VehiclesList;
