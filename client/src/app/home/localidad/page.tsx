"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import LoadableScreen from "@/components/LoadableScreen";
import LocalidadList from "@/components/lists/LocalidadList";
import ProvinciaSelectField from "@/components/ProvinciaSelectField";
import apiClient from "@/services/api";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import useAdmin from "@/services/userType";
import Swal from "sweetalert2";
import { alertError } from "@/utils/alerts";

interface LocalidadFormData {
  descripcion: string;
  provincia: number;
}

const Localidad: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<LocalidadFormData>({
    descripcion: "",
    provincia: 0,
  });
  const [localidadListChanged, setLocalidadListChanged] =
    useState<boolean>(false);
  const { isAdmin, isLoadingAdmin } = useAdmin();

  const newLocalidad = (data: LocalidadFormData) => {
    const res = apiClient(true)
      .post("/localidad", JSON.stringify(data))
      .then((res) => {
        Swal.fire({
          title: "¡Bien hecho!",
          text: "Has agregado una nueva localidad",
          icon: "success",
        });
        setFormData({ descripcion: "", provincia: parseInt("") });
        enableButton({ descripcion: "", provincia: parseInt("") });
        handleLocalidadListChanged();
      })
      .catch((error: Error | AxiosError) => {
        alertError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      enableButton(newFormData);
      return newFormData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    newLocalidad(formData);
  };

  const enableButton = (formData: LocalidadFormData) => {
    setButtonEnabled(
      formData.descripcion.length > 0 && formData.provincia !== 0
    );
  };

  const handleLocalidadListChanged = () => {
    setLocalidadListChanged(!localidadListChanged);
  };

  return (
    <LoadableScreen isLoading={isLoading || isAdmin == null}>
      <div className="flex flex-col items-center p-4  space-y-4 md:p-8 lg:p-12 gap-4 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
        <span className="w-full text-2xl md:text-4xl lg:text-5xl font-extralight text-center">
          {isAdmin
            ? "Administración de Localidades"
            : "Localidades en las que nos encontramos!"}
        </span>
        {isAdmin && (
          <form onSubmit={handleSubmit} className="w-full sm:w-1/2">
            <div className="flex flex-col space-y-4">
              <TextField
                className=""
                name="descripcion"
                label="Nombre"
                variant="outlined"
                fullWidth
                value={formData.descripcion}
                onChange={handleInputChange}
              />
              <ProvinciaSelectField
                value={formData.provincia}
                onChange={handleInputChange}
              />
              <Button
                variant="outlined"
                color="success"
                disabled={!buttonEnabled}
                type="submit"
              >
                Añadir
              </Button>
            </div>
          </form>
        )}
      </div>
      <div className="flex flex-col items-center p-4 md:p-8 lg:p-12 gap-4 w-full sm:w-11/12 md:w-3/4 lg:w-full mx-auto">
        {isAdmin && (
          <span className="w-full text-2xl md:text-4xl lg:text-5xl font-extralight text-center">
            Listado de Localidades:
          </span>
        )}
        <LocalidadList
          isAdmin={isAdmin || false}
          onLocalidadListChanged={handleLocalidadListChanged}
        />
      </div>
    </LoadableScreen>
  );
};

export default Localidad;
