"use client";
import { SelectMenuItem } from "@/types";
import { alertError } from "@/utils/alerts";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
import LoadableScreen from "../LoadableScreen";
import { Button, MenuItem, TextField } from "@mui/material";
import { getBranchOptions } from "@/services/branch";
import apiClient from "@/services/api";
import { verifyAdmin } from "@/services/userType";
import { NO_ACCESS, seatings, transmisions } from "@/utils/constants";
import VehicleTypesSelectField from "../VehicleTypesSelectField";
import { patenteValidator } from "@/utils/validators";
import Swal from "sweetalert2";

interface NewVehicleFormData {
  marca: string;
  modelo: string;
  patente: string;
  transmision: string;
  km: string;
  year: string;
  capacidad: number;
  image: Blob | null;
  tipoVehiculo: number;
  sucursal: number;
}

const emptyVehicleForm = {
  marca: "",
  modelo: "",
  patente: "",
  transmision: transmisions.at(0)?.descripcion || "Automático",
  year: "",
  km: "",
  capacidad: seatings.at(0)?.id || 1,
  image: null,
  tipoVehiculo: 1,
  sucursal: 1,
};

const NewVehicleForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [licensePlateError, setLicensePlateError] = useState<string>("");
  const [officeLocations, setOfficeLocations] = useState<SelectMenuItem[]>();
  const [formData, setFormData] =
    useState<NewVehicleFormData>(emptyVehicleForm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locations = await getBranchOptions();
        setOfficeLocations(locations);

        if (locations.length >= 1) {
          setFormData({
            ...formData,
            sucursal: locations.at(0)?.id || 0,
          });
        }
        setIsLoading(false);
      } catch (error: any) {
        alertError(error);
        router.replace("/");
      }
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };

      if (name == "patente") {
        setLicensePlateError(patenteValidator(value.toLowerCase()));
      }

      enableButton(newFormData);
      return newFormData;
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFormData((prevFormData) => {
        const newFormData = { ...prevFormData, image: files[0] };
        console.log(newFormData);
        enableButton(newFormData);

        return newFormData;
      });
    }
  };

  const enableButton = (formData: NewVehicleFormData) => {
    const someFieldIsEmpty =
      formData.marca.length == 0 ||
      formData.modelo.length == 0 ||
      formData.km.length == 0 ||
      formData.year.length == 0 ||
      formData.patente.length == 0 ||
      formData.image == null;

    if (someFieldIsEmpty) {
      setButtonEnabled(false);
      return;
    }

    setButtonEnabled(true);
  };

  const add = async () => {
    console.log(formData);
    apiClient()
      .post("/vehiculo", formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "question",
          title: "Has agregado un vehículo ¿Desea agregar otro?",
          showDenyButton: true,
          confirmButtonText: "Si",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            cleanFields();
          } else {
            router.push("/home/vehicles");
          }
        });
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  const cleanFields = () => {
    setFormData(emptyVehicleForm);
  };

  return (
    <LoadableScreen isLoading={isLoading}>
      <div className="flex flex-col items-center p-8 pb-20 gap-8">
        <span className="w-full text-4xl font-extralight">
          Agregar vehículo
        </span>
        <form
          className="grid gap-6 grid-cols-1 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            add();
          }}
        >
          <TextField
            type="text"
            name="marca"
            label="Marca"
            fullWidth
            value={formData.marca}
            onChange={handleInputChange}
          />

          <TextField
            type="text"
            name="modelo"
            label="Modelo"
            fullWidth
            value={formData.modelo}
            onChange={handleInputChange}
          />
          <TextField
            type="text"
            name="patente"
            label="Patente"
            error={licensePlateError.length > 0}
            helperText={licensePlateError}
            fullWidth
            value={formData.patente}
            onChange={handleInputChange}
          />
          <TextField
            type="number"
            name="year"
            label="Año"
            fullWidth
            value={formData.year}
            onChange={handleInputChange}
          />
          <TextField
            type="number"
            name="km"
            label="Kilómetros"
            fullWidth
            value={formData.km}
            onChange={handleInputChange}
          />
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
            name="capacidad"
            label="Capacidad"
            fullWidth
            select
            value={formData.capacidad}
            onChange={handleInputChange}
          >
            {seatings?.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.descripcion}
              </MenuItem>
            ))}
          </TextField>

          <VehicleTypesSelectField
            value={formData.tipoVehiculo}
            onChange={handleInputChange}
          />

          <TextField
            className="sm:col-span-2"
            name="sucursal"
            label="Sucursal"
            variant="outlined"
            disabled={officeLocations?.length == 0}
            select
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.sucursal}
            onChange={handleInputChange}
          >
            {officeLocations?.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.descripcion}
              </MenuItem>
            ))}
          </TextField>

          <div className="sm:col-span-2">
            <label className="block text-sm font-bold mb-2" htmlFor="image">
              Imagen:
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-slate-500 rounded-md text-slate-500 focus:outline-none focus:border-blue-500"
              placeholder="Seleccione una imagen"
            />
          </div>

          <div className="flex flex-row flex-wrap-reverse items-center gap-4 justify-between sm:col-span-2">
            <Button
              className="w-full sm:w-auto"
              variant="outlined"
              color="error"
              onClick={() => router.back()}
            >
              Volver
            </Button>

            <Button
              className="w-full sm:w-auto"
              variant="outlined"
              color="success"
              disabled={!buttonEnabled}
              type="submit"
            >
              Agregar vehículo
            </Button>
          </div>
        </form>
        <footer className="fixed flex items-center justify-center bottom-0 w-full py-4 px-2 bg-slate-700">
          <span className="text-sm text-center text-yellow-400 sm:text-md">
            Formato de patente: ABC123 o AB123CD
          </span>
        </footer>
      </div>
    </LoadableScreen>
  );
};

export default NewVehicleForm;
