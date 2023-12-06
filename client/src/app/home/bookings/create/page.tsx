"use client";
import LoadableScreen from "@/components/LoadableScreen";
import { Vehiculo } from "@/types";
import "dayjs/locale/en-gb";
import { useEffect, useState } from "react";
import CreateBookingForm, {
  CreateBookingFormData,
} from "@/components/forms/CreateBookingForm";
import useAdmin from "@/services/userType";
import VehicleListItem from "@/components/items/VehicleItem";
import { Divider, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { MAX_WORKING_HOUR, NINE_AM } from "@/utils/constants";

const getBookingDateDefaultValue = (isDateFrom: boolean): Dayjs => {
  const isLateForToday = dayjs().hour() > MAX_WORKING_HOUR;
  if (isLateForToday)
    return isDateFrom ? NINE_AM.add(1, "day") : NINE_AM.add(2, "day");

  return isDateFrom ? dayjs().add(1, "day") : dayjs().add(2, "day");
};

const CreateBooking = () => {
  const { isAdmin, isLoadingAdmin } = useAdmin();
  const [formData, setFormData] = useState<CreateBookingFormData>({
    fechaDesde: getBookingDateDefaultValue(true),
    fechaHasta: getBookingDateDefaultValue(false),
    transmision: "AT",
    tipoVehiculo: 1,
    sucursal: 1,
  });
  const [availableVehicles, setAvailableVehicles] = useState<Vehiculo[]>();

  useEffect(() => {
    setAvailableVehicles(undefined)
  }, [formData])

  const book = (vehicle: Vehiculo) => {
    console.log(vehicle)
    console.log(formData.fechaDesde.toISOString())
    console.log(formData.fechaHasta.toISOString())
  }

  return (
    <LoadableScreen isLoading={isLoadingAdmin || isAdmin == null}>
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
                    book={book}
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
