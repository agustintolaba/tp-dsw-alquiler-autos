"use client";
import LoadableScreen from "@/components/LoadableScreen";
import { Sucursal, Vehiculo } from "@/types";
import "dayjs/locale/en-gb";
import { useEffect, useState } from "react";
import CreateBookingForm, {
  CreateBookingFormData,
} from "@/components/forms/CreateBookingForm";
import useAdmin from "@/services/userType";
import VehicleListItem from "@/components/items/VehicleItem";
import { Button, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import {
  MAX_WORKING_HOUR,
  NINE_AM,
  transmisionDescriptions,
} from "@/utils/constants";
import Image from "next/image";
import apiClient from "@/services/api";

const getBookingDateDefaultValue = (isDateFrom: boolean): Dayjs => {
  const isLateForToday = dayjs().hour() > MAX_WORKING_HOUR;
  if (isLateForToday)
    return isDateFrom ? NINE_AM.add(1, "day") : NINE_AM.add(2, "day");

  return isDateFrom ? dayjs().add(1, "day") : dayjs().add(2, "day");
};

interface ConfirmModalData {
  formData: CreateBookingFormData;
  vehicle: Vehiculo;
  location: string;
}

const CreateBooking = () => {
  const { isAdmin, isLoadingAdmin } = useAdmin();
  const [confirmModal, setConfirmModal] = useState<ConfirmModalData>();
  const [formData, setFormData] = useState<CreateBookingFormData>({
    fechaDesde: getBookingDateDefaultValue(true),
    fechaHasta: getBookingDateDefaultValue(false),
    transmision: "AT",
    tipoVehiculo: 1,
    sucursal: 1,
  });
  const [availableVehicles, setAvailableVehicles] = useState<Vehiculo[]>();

  useEffect(() => {
    setAvailableVehicles(undefined);
  }, [formData]);

  const onCarSelect = (vehiculo: Vehiculo) => {
    apiClient()
      .get(`/sucursal/${formData.sucursal}`)
      .then((res) => {
        const sucursal: Sucursal = res.data.sucursal;
        setConfirmModal({
          formData,
          vehicle: vehiculo,
          location: `${sucursal.calle} ${sucursal.numeroCalle}, ${sucursal.localidad.descripcion}, ${sucursal.localidad.provincia.descripcion}`,
        });
      });
  };

  return (
    <LoadableScreen isLoading={isLoadingAdmin || isAdmin == null}>
      {confirmModal ? (
        <ConfirmModal
          confirmData={confirmModal}
          cancel={() => setConfirmModal(undefined)}
        />
      ) : (
        <></>
      )}
      <div className="flex flex-col justify-center p-8 gap-8">
        <span className="text-center w-full text-4xl font-extralight md:text-left">
          Elija sus preferencias
        </span>
        <CreateBookingForm
          formData={formData}
          setFormData={setFormData}
          setAvailableVehicles={setAvailableVehicles}
        />

        {availableVehicles ? (
          (availableVehicles.length > 0 && (
            <div className="flex flex-col gap-8">
              <span className="text-center w-full text-4xl font-extralight md:text-left">
                Vehículos disponibles
              </span>
              <div className="flex flex-row gap-4 flex-wrap justify-center">
                {availableVehicles.map((vehicle: Vehiculo) => (
                  <VehicleListItem
                    key={vehicle.id}
                    isAdmin={isAdmin || false}
                    isBooking={true}
                    vehicle={vehicle}
                    select={onCarSelect}
                  />
                ))}
              </div>
            </div>
          )) || (
            <Typography variant="h6" className="text-center mt-4" color="error">
              No se encontraron vehículos disponibles para las preferencias
              elegidas.
            </Typography>
          )
        ) : (
          <Typography variant="h6" className="text-center mt-4 text-yellow-400">
            Aquí se mostrarán los vehículos disponibles.
          </Typography>
        )}
      </div>
    </LoadableScreen>
  );
};

export default CreateBooking;

interface ConfirmModalProps {
  confirmData: ConfirmModalData;
  cancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ confirmData, cancel }) => {
  const { vehicle, formData, location } = confirmData;
  const totalDays = formData.fechaHasta.diff(formData.fechaDesde, "day");
  return (
    <div className="absolute flex items-start pt-12 justify-center w-screen h-screen z-30">
      <span className="absolute top-0 right-0 h-screen w-screen bg-black opacity-60"></span>
      <div className="flex flex-col items-center justify-between p-8 gap-8 w-11/12 max-w-xl bg-slate-800 rounded-md z-40">
        <div className="flex flex-col gap-12 items-center">
          <span className="text-center text-3xl md:text-5xl">
            Confirmación de reserva
          </span>
          <Image
            src={vehicle.image}
            alt="vehicle_selected"
            width={250}
            height={250}
          />
          <span className="text-center text-lg">
            Está a punto de reservar un <br />
            <span className="font-bold text-2xl">
              {vehicle.marca} {vehicle.modelo} <br />
            </span>
            con transmisión {transmisionDescriptions[formData.transmision]}
          </span>
          <div className="flex flex-col gap-6 p-4 w-full">
            <span className="italic font-light text-yellow-400">
              La reserva cuenta con los siguientes datos
            </span>
            <div className="flex flex-row gap-8 items-center">
              <ConfirmModalLabel
                label="Desde:"
                value={formData.fechaDesde.format("DD/MM/YYYY - HH:mm")}
              />
              <ConfirmModalLabel
                label="Hasta:"
                value={formData.fechaHasta.format("DD/MM/YYYY - HH:mm")}
              />
              <span className="text-lg font-bold">
                ({totalDays} {totalDays == 1 ? "día" : "días"})
              </span>
            </div>
            <div className="flex flex-row gap-8">
              <ConfirmModalLabel
                label="Sucursal de retiro:"
                value={`${location}`}
              />
            </div>
          </div>
        </div>
        <div className="w-full space-y-6 flex-row">
          <Button variant="outlined" color="success" fullWidth>
            Confirmar
          </Button>
          <Button onClick={cancel} variant="outlined" color="error" fullWidth>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

const ConfirmModalLabel = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col">
      <span className="font-bold text-md w-36">{label}</span>
      <span className="font-light text-md">{value}</span>
    </div>
  );
};
