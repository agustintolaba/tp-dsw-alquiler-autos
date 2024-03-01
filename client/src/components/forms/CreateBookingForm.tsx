import apiClient from "@/services/api";
import { getBranchOptions } from "@/services/branch";
import { getVehicleTypesOptions } from "@/services/vehicleTypes";
import { SelectMenuItem, Vehiculo } from "@/types";
import { MAX_WORKING_HOUR, NINE_AM, transmisions } from "@/utils/constants";
import { alertError } from "@/utils/alerts";
import { disableNotWorkingTime, getDateError } from "@/utils/validators";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

const getBookingDateDefaultValue = (isDateFrom: boolean): Dayjs => {
  const isLateForToday = dayjs().hour() > MAX_WORKING_HOUR;
  if (isLateForToday)
    return isDateFrom ? NINE_AM.add(1, "day") : NINE_AM.add(2, "day");

  return isDateFrom ? dayjs().add(1, "day") : dayjs().add(2, "day");
};

export interface CreateBookingFormData {
  fechaDesde: Dayjs;
  fechaHasta: Dayjs;
  transmision: string;
  tipoVehiculo: number;
  sucursal: number;
}

interface CreateBookingFormProps {
  formData: CreateBookingFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateBookingFormData>>;
  setAvailableVehicles: React.Dispatch<
    React.SetStateAction<Vehiculo[] | undefined>
  >;
}

export const initialBookingFormValues = {
  fechaDesde: getBookingDateDefaultValue(true),
  fechaHasta: getBookingDateDefaultValue(false),
  transmision: "AT",
  tipoVehiculo: 1,
};

const CreateBookingForm: React.FC<CreateBookingFormProps> = ({
  formData,
  setFormData,
  setAvailableVehicles,
}) => {
  const router = useRouter();
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState<SelectMenuItem[]>();
  const [dateFromError, setDateFromError] = useState<string | null>();
  const [dateToError, setDateToError] = useState<string>("");
  const [branches, setBranches] = useState<SelectMenuItem[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getVehicleTypesOptions();
        setVehicleTypes(types);
        const branches = await getBranchOptions();
        setBranches(branches);
        const firstTypeItem = types.at(0);
        const firstBranchItem = branches.at(0);
        if (firstTypeItem && firstBranchItem) {
          setFormData({
            ...formData,
            sucursal: firstBranchItem.id,
            tipoVehiculo: firstTypeItem.id,
          });
        }
      } catch (error: any) {
        alertError(error);
        router.replace("/");
      }
    };
    fetchData();
    enableButton(formData);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: CreateBookingFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      enableButton(newFormData);
      return newFormData;
    });
  };

  const onDateChange = (value: Dayjs | null, isDateFrom: boolean) => {
    let error = "";
    if (!value) {
      error = "La fecha no puede estar vacía";
      return;
    }

    if (isDateFrom) {
      setFormData((prevFormData) => {
        const fechaHasta =
          value.diff(prevFormData.fechaHasta) > 0
            ? value.add(1, "day")
            : prevFormData.fechaHasta;
        return {
          ...prevFormData,
          fechaDesde: value,
          fechaHasta: fechaHasta,
        };
      });
      setDateFromError(error);
    } else {
      setFormData((prevFormData) => {
        const newFormData = { ...prevFormData, fechaHasta: value };
        enableButton(newFormData);
        return newFormData;
      });
      setDateToError(error);
    }
  };

  const enableButton = (formData: CreateBookingFormData) => {
    const enabled =
      formData.fechaDesde.isValid() && formData.fechaHasta.isValid();
    setButtonEnabled(enabled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiClient()
      .get(
        `/vehiculo/getAvailables?fecha_desde='${formData.fechaDesde.toISOString()}'&fecha_hasta='${formData.fechaHasta.toISOString()}'&transmision='${
          formData.transmision
        }'&tipo_vehiculo=${formData.tipoVehiculo}&sucursal=${formData.sucursal}`
      )
      .then((res) => {
        const vehicles = res.data.vehicles;
        setAvailableVehicles(vehicles);
      })
      .catch((error: Error | AxiosError) => {
        alertError(error);
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <form onSubmit={handleSubmit}>
        <Box className="w-full grid gap-6">
          <DateTimePicker
            label="Fecha de retiro"
            onError={(error) => setDateFromError(error ? error : "")}
            slotProps={{
              textField: {
                helperText: getDateError(dateFromError),
              },
            }}
            ampm={false}
            disablePast
            value={formData.fechaDesde}
            shouldDisableTime={disableNotWorkingTime}
            onChange={(value) => onDateChange(value, true)}
          />
          <DateTimePicker
            label="Fecha de devolución"
            onError={(error) => setDateToError(error ? error : "")}
            slotProps={{
              textField: {
                helperText: getDateError(dateToError),
              },
            }}
            ampm={false}
            value={formData.fechaHasta}
            disablePast
            minDateTime={formData.fechaDesde.add(1, "day")}
            shouldDisableTime={disableNotWorkingTime}
            onChange={(value) => onDateChange(value, false)}
          />
          <span className="text-md font-light sm:col-span-2">
            Total de días:{" "}
            <span className="font-bold">
              {formData.fechaHasta.diff(formData.fechaDesde, "days")}
            </span>
          </span>
          <TextField
            name="tipoVehiculo"
            label="Tipo de vehículo"
            variant="outlined"
            select
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.tipoVehiculo}
            onChange={handleInputChange}
          >
            {vehicleTypes?.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.descripcion}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="transmision"
            label="Transmisión"
            variant="outlined"
            select
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.transmision}
            onChange={handleInputChange}
          >
            {transmisions?.map((t) => (
              <MenuItem key={t.id} value={t.descripcion}>
                {t.descripcion == "AT" ? "Automático" : "Manual"}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className="sm:col-span-2"
            name="sucursal"
            label="Sucursal"
            variant="outlined"
            disabled={branches?.length == 0}
            select
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.sucursal}
            onChange={handleInputChange}
          >
            {branches?.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.descripcion}
              </MenuItem>
            ))}
          </TextField>

          <Button
            className="sm:col-span-2"
            variant="outlined"
            color="success"
            disabled={!buttonEnabled}
            type="submit"
          >
            Ver vehículos disponibles
          </Button>

          <Button
            className="sm:col-span-2"
            variant="outlined"
            color="error"
            onClick={() => history.back()}
          >
            Volver
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default CreateBookingForm;
