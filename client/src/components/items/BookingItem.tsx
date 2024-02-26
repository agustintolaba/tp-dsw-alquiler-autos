import { Reserva, Usuario, Vehiculo } from "@/types";
import { formatAPIDate } from "@/utils/dateFormatter";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import BookingStatusHandler from "./BookingStateHandler";
import apiClient from "@/services/api";
import { useState } from "react";
import { BookingState } from "@/utils/bookingState";
import { AxiosError } from "axios";
import { alertError } from "@/utils/alerts";
import Swal from "sweetalert2";

interface BookingItemProps {
  isAdmin: boolean;
  reserva: Reserva;
}

interface UpdateBookingStatusResponse {
  data: { message: string; updatedBooking: Reserva };
}

const BookingItem: React.FC<BookingItemProps> = ({ isAdmin, reserva }) => {
  const [status, setStatus] = useState<BookingState>(reserva.estado);

  const handleChangeStateClick = (isCancel: boolean) => {
    if (isCancel) {
      Swal.fire({
        icon: "question",
        title: "Desea cancelar la reserva?",
        showDenyButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          changeState(isCancel);
        }
      });
    } else {
      changeState(isCancel);
    }
  };

  const changeState = (isCancel: boolean) => {
    apiClient(true)
      .patch(`alquiler/${reserva.id}`, { isCancel: isCancel })
      .then((res: UpdateBookingStatusResponse) => {
        console.log(res.data);
        setStatus(res.data.updatedBooking.estado);
      })
      .catch((error: AxiosError | Error) => {
        alertError(error);
      });
  };

  return (
    <Box className="flex flex-row w-full flex-wrap justify-center items-center rounded-md bg-slate-700 p-4 gap-4 md:justify-between">
      <Box className="flex flex-wrap gap-4">
        <Image
          src={reserva.vehiculo.image}
          width={128}
          height={128}
          alt="vehículo"
          className="rounded-md object-contain"
        />

        <Box className="flex flex-col flex-wrap justify-evenly">
          <BookingDetail label="ID" value={reserva.id.toString()} />
          {isAdmin && (
            <BookingDetail
              label="Usuario"
              value={`${reserva.usuario.nombre} ${reserva.usuario.apellido}`}
            />
          )}
          <BookingDetail
            label="Vehículo"
            value={`${reserva.vehiculo.marca} ${reserva.vehiculo.modelo} ${reserva.vehiculo.transmision}`}
          />
        </Box>
        <Box className="flex flex-col justify-evenly">
          <BookingDetail
            label="Fecha de realización"
            value={formatAPIDate(reserva.fechaRealizacion)}
          />
          <BookingDetail
            label="Fecha desde"
            value={formatAPIDate(reserva.fechaDesde)}
          />
          <BookingDetail
            label="Fecha hasta"
            value={formatAPIDate(reserva.fechaHasta)}
          />
          <BookingDetail
            label={isAdmin ? "Sucursal" : "Retirar en"}
            value={`${reserva.vehiculo.sucursal.calle} ${reserva.vehiculo.sucursal.numeroCalle}, ${reserva.vehiculo.sucursal.localidad.descripcion}, ${reserva.vehiculo.sucursal.localidad.provincia.descripcion}`}
          />
        </Box>
      </Box>
      <BookingStatusHandler
        isAdmin={isAdmin}
        estado={status}
        onChangeStateClick={handleChangeStateClick}
      />
    </Box>
  );
};

interface BookingDetailProps {
  label: string;
  value: string;
}

const BookingDetail: React.FC<BookingDetailProps> = ({ label, value }) => {
  return (
    <Box className="flex flex-row gap-1">
      <Typography variant="subtitle1" fontWeight="bold">
        {label}:
      </Typography>
      <Typography variant="subtitle1" fontWeight="light">
        {value}
      </Typography>
    </Box>
  );
};

export default BookingItem;
