"use client";

import VehiculoItem from "@/components/items/VehicleItem";
import { Vehiculo } from "@/types";
import useVehicle, { getVehicles } from "@/services/vehicle";
import LoadableScreen from "../LoadableScreen";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ALPHANUMERIC_FORMAT } from "@/utils/constants";

interface IVehiclesListProps {
  isAdmin: boolean;
  vehicleTypeId?: number;
}

const VehiclesList: React.FC<IVehiclesListProps> = ({
  isAdmin,
  vehicleTypeId,
}) => {
  const { isLoadingVehicle, vehicles, edit, remove, filter } =
    useVehicle(vehicleTypeId);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setSearch(value);
      return;
    }
    if (value === " " || !ALPHANUMERIC_FORMAT.test(value)) {
      return;
    }
    setSearch(value);
  };

  const onSearchClick = () => {
    filter(search);
  };

  return (
    <LoadableScreen isLoading={isLoadingVehicle}>
      <Box className="w-full flex flex-col p-8 gap-12 items-center">
        {isAdmin && (
          <Box className="flex flex-row flex-wrap gap-2 justify-center md:items-start md:justify-start">
            <Box className="flex flex-col gap-2 justify-center items-start">
              <TextField
                className="w-48 sm:w-96"
                label="Búsqueda por patente"
                value={search}
                onChange={handleSearchChange}
                maxRows={1}
              />
              <Typography variant="caption">
                Formato: ABC123 o AB123CD
              </Typography>
            </Box>
            <Button variant="outlined" className="h-14" onClick={onSearchClick}>
              Buscar
            </Button>
          </Box>
        )}
        <Box className="flex flex-row flex-wrap justify-center gap-8">
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
        </Box>
      </Box>
    </LoadableScreen>
  );
};

export default VehiclesList;
