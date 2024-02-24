import { Vehiculo } from "@/types";
import { transmisionDescriptions } from "@/utils/constants";
import { Button, Dialog } from "@mui/material";
import { CreateBookingFormData } from "../forms/CreateBookingForm";
import Image from "next/image";
import { useState } from "react";
import apiClient from "@/services/api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface ConfirmModalProps {
  open: boolean;
  confirmData: ConfirmModalData;
  cancel: () => void;
}

export interface ConfirmModalData {
  formData: CreateBookingFormData;
  vehicle: Vehiculo;
  location: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  confirmData,
  cancel,
}) => {
  const router = useRouter();
  const [confirming, setConfirming] = useState<boolean>(false);
  const { vehicle, formData, location } = confirmData;
  const totalDays = formData.fechaHasta.diff(formData.fechaDesde, "day");

  const onConfirm = () => {
    setConfirming(true);
    apiClient(true)
      .post("/alquiler", {
        fechaDesde: formData.fechaDesde.toISOString(),
        fechaHasta: formData.fechaHasta.toISOString(),
        precioTotal: vehicle.tipoVehiculo.precio * totalDays, // TODO!!
        vehiculo: vehicle.id,
      })
      .then(() => {
        Swal.fire({
          title: "¡FELICIDADES!",
          text: "¡Se realizó la reserva correctamente!",
          icon: "success",
        });
        router.push("/home");
      });
  };

  return (
    <Dialog open={open}>
      <div className="flex flex-col items-center justify-between p-8 gap-8">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-center text-3xl mb-4 md:text-4xl">
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
              <span className="text-center text-sm font-bold">
                {totalDays} {totalDays == 1 ? "día" : "días"}
              </span>
            </div>
            <div className="flex flex-row gap-8">
              <ConfirmModalLabel
                label="Sucursal de retiro:"
                value={`${location}`}
              />
            </div>
            <div className="flex flex-row gap-8">
              <ConfirmModalLabel
                label="Precio total:"
                value={`$${vehicle.tipoVehiculo.precio * totalDays}`}
              />
            </div>
          </div>
        </div>
        <div className="w-full space-y-6 flex-row">
          <Button
            onClick={onConfirm}
            variant="outlined"
            color="success"
            disabled={confirming}
            fullWidth
          >
            {confirming ? "Generando reserva..." : "Confirmar"}
          </Button>
          <Button
            onClick={cancel}
            disabled={confirming}
            variant="outlined"
            color="error"
            fullWidth
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Dialog>
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
      <span className="font-bold text-md w-24">{label}</span>
      <span className="font-light text-md">{value}</span>
    </div>
  );
};

export default ConfirmModal;
