"use client";

import { Vehiculo } from "@/types";
import { transmisionDescriptions } from "@/utils/constants";
import { Person } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface VehicleListItemProps {
  isAdmin: boolean;
  isBooking: boolean;
  vehicle: Vehiculo;
  remove: (vehicle: Vehiculo) => void;
  edit: (id: number, newKm: number) => void;
}

const VehicleListItem: React.FC<VehicleListItemProps> = ({
  isAdmin,
  isBooking,
  vehicle,
  remove,
  edit,
}) => {
  const { id, image, marca, modelo, capacidad, transmision, km } = vehicle;
  const [newKm, setNewKm] = useState(km);

  const handleRemove = () => {
    if (!confirm(`¿Desea eliminar ${marca} ${modelo}?`)) {
      return;
    }
    remove(vehicle);
  };

  const handleEdit = () => {
    if (
      !confirm(
        `¿Desea actualizar los km de ${marca} ${modelo} de ${km} a ${newKm}?`
      )
    ) {
      return;
    }
    edit(id, newKm);
  };

  const handleKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isNaN(Number(value))) {
      return;
    }
    setNewKm(Number(value));
  };

  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-6 p-6 rounded-2xl bg-slate-900">
      <Image
        src={image}
        alt={"vehiculo"}
        width={200}
        height={200}
        className="object-cover"
      />
      <div className="flex flex-col justify-end items-center gap-6 sm:items-end">
        <div className="flex flex-col items-start gap-4 text-white">
          <span className="font-bold text-2xl tracking-wider">
            {marca} {modelo}
          </span>
          <div className="flex flex-col items-start gap-1 text-white">
            <div className="flex flex-row gap-1 justify-center items-center">
              <span className="font-semibold">Capacidad:</span>
              <span className="flex items-center gap-1">
                {capacidad} <Person fontSize="small" />
              </span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-1 justify-center items-center">
            <span className="font-semibold">Transmisión:</span>
            <span className="">{transmisionDescriptions[transmision]}</span>
          </div>
          <TextField
            variant="outlined"
            onChange={handleKmChange}
            type="number"
            value={newKm}
            name="km"
            label="Kilómetros"
          />
        </div>
      </div>
      {isBooking && (
        <Button variant="outlined" color="success">
          Lo quiero!
        </Button>
      )}
      {isAdmin && (
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleEdit}
            variant="outlined"
            color="warning"
            disabled={(km >= newKm || newKm.toString().length == 0)}
          >
            Actualizar
          </Button>
          <Button onClick={handleRemove} variant="outlined" color="error">
            Eliminar
          </Button>
        </div>
      )}
    </div>
  );
};

export default VehicleListItem;
