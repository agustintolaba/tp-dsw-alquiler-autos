"use client";

import { Vehiculo } from "@/types";
import {
  NEW_PATENTE_FORMAT,
  NO_ACCESS,
  OLD_PATENTE_FORMAT,
  transmisionDescriptions,
} from "@/utils/constants";
import { Person } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

interface VehicleListItemProps {
  isAdmin: boolean;
  isBooking: boolean;
  vehicle: Vehiculo;
  remove?: (vehicle: Vehiculo) => void;
  edit?: (id: number, newKm: number) => void;
  select?: (vehicle: Vehiculo) => void;
}

const VehicleListItem: React.FC<VehicleListItemProps> = ({
  isAdmin,
  isBooking,
  vehicle,
  remove,
  edit,
  select,
}) => {
  const {
    id,
    patente,
    image,
    marca,
    modelo,
    capacidad,
    transmision,
    km,
    sucursal,
  } = vehicle;
  const [newKm, setNewKm] = useState(km);

  const handleRemove = () => {
    Swal.fire({
      icon: "question",
      title: `¿Desea eliminar ${marca} ${modelo}?`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        remove ? remove(vehicle) : alert(NO_ACCESS);
      }
    });
  };

  const handleEdit = () => {
    Swal.fire({
      icon: "question",
      title: `¿Desea actualizar los km de ${marca} ${modelo} de ${km} a ${newKm}?`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        edit ? edit(id, newKm) : alert(NO_ACCESS);
      }
    });
  };

  const handleBook = () => {
    select ? select(vehicle) : alert(NO_ACCESS);
  };

  const handleKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isNaN(Number(value))) {
      return;
    }
    setNewKm(Number(value));
  };

  const getFormattedLicensePlate = (plate: string): string => {
    if (OLD_PATENTE_FORMAT.test(plate.toLowerCase())) {
      return `${plate.slice(0, 3)} ${plate.slice(3, 6)}`;
    }
    if (NEW_PATENTE_FORMAT.test(plate.toLowerCase())) {
      return `${plate.slice(0, 2)} ${plate.slice(2, 5)} ${plate.slice(5, 7)}`;
    }
    return plate;
  };

  return (
    <Box
      className={`relative w-full flex flex-col gap-6 pt-12 p-6 md:p-6 rounded-md ${
        isAdmin ? "justify-between  max-w-5xl" : "justify-center  max-w-xl"
      } items-center bg-slate-900 md:flex-row`}
    >
      {isAdmin && (
        <span
          className={`absolute top-0 w-24 flex items-center bg-white justify-center rounded-sm ${
            OLD_PATENTE_FORMAT.test(patente.toLowerCase())
              ? "h-9 scale-90 md:-right-1"
              : "h-8"
          } font-light md:right-0`}
        >
          {NEW_PATENTE_FORMAT.test(patente.toLowerCase()) && (
            <span className="absolute top-0 right-0 w-full bg-sky-800 h-1.5 text-center"></span>
          )}
          <span
            className={`absolute font-semibold ${
              OLD_PATENTE_FORMAT.test(patente.toLowerCase())
                ? "bg-black text-white rounded-md px-3.5 py-0.5"
                : " text-black bottom-0.5"
            }`}
          >
            {getFormattedLicensePlate(patente)}
          </span>
        </span>
      )}
      <Box className="flex flex-col gap-6 items-center sm:flex-row">
        <Image
          src={image}
          alt={"vehiculo"}
          width={200}
          height={200}
          className="object-contain"
        />
        <Box className="flex flex-col justify-end items-center gap-6 sm:items-end">
          <Box className="flex flex-col items-start gap-4 text-white">
            <span className="font-bold text-2xl tracking-wider">
              {marca} {modelo}
            </span>
            <Box className="flex flex-col items-start gap-1 text-white">
              <Box className="flex flex-row gap-1 justify-start items-center">
                <span className="font-semibold">Capacidad:</span>
                <span className="flex items-center gap-1">
                  {capacidad} <Person fontSize="small" />
                </span>
              </Box>
            </Box>
            <Box className="flex flex-row flex-wrap gap-1 justify-start items-center">
              <span className="font-semibold">Transmisión:</span>
              <span className="">{transmisionDescriptions[transmision]}</span>
            </Box>
            {isAdmin && (
              <Box className="flex flex-row flex-wrap gap-1 justify-start items-center">
                <span className="font-semibold">Sucursal:</span>
                <span className="">{`${sucursal.calle} ${sucursal.numeroCalle}, ${sucursal.localidad.descripcion}, ${sucursal.localidad.provincia.descripcion}`}</span>
              </Box>
            )}
            {isAdmin && (
              <TextField
                variant="outlined"
                className="w-full sm:w-auto"
                onChange={handleKmChange}
                type="number"
                value={newKm}
                name="km"
                label="Kilómetros"
              />
            )}
          </Box>
        </Box>
      </Box>
      {isBooking && (
        <Button onClick={handleBook} variant="outlined" color="success">
          RESERVAR
        </Button>
      )}
      {isAdmin && (
        <Box className="flex flex-col gap-4">
          <Button
            onClick={handleEdit}
            variant="outlined"
            color="warning"
            disabled={km >= newKm || newKm.toString().length == 0}
          >
            Actualizar
          </Button>
          <Button onClick={handleRemove} variant="outlined" color="error">
            Eliminar
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VehicleListItem;
