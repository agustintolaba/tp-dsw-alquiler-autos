"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import LoadableScreen from "@/components/LoadableScreen";
import ProvinciaList from "@/components/lists/ProvinciaList";
import apiClient from "@/services/api";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface ProvinciaFormData {
  descripcion: string;
}

const Provincia: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProvinciaFormData>({
    descripcion: "",
  });

  const newProvincia = (data: ProvinciaFormData) => {
    const res = apiClient
      .post("/provincia", JSON.stringify(data)) //TIENE QUE SER EL ADMIN??
      .then((res) => {
        if (confirm("Desea agregar otra provincia?")) {
        } else {
          router.push("/home");
        }
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        } else {
          console.log(error);
          if (error.message) {
            alert(error.message);
          } else {
            alert("Ha ocurrido un error");
          }
        }
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
    //setIsLoading(true)
    newProvincia(formData);
  };

  const enableButton = (formData: ProvinciaFormData) => {
    setButtonEnabled(formData.descripcion.length > 0);
  };

  return (
    <LoadableScreen isLoading={isLoading}>
      <div className="flex flex-col items-center p-8 gap-8">
        <span className="w-full text-4xl font-extralight">
          Agregar una nueva provincia
        </span>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-96 space-y-4">
            <TextField
              className=""
              name="descripcion"
              label="Nombre"
              variant="outlined"
              fullWidth
              value={formData.descripcion}
              onChange={handleInputChange}
              //error={formErrors.email.length > 0}
              //helperText={formErrors.email}
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
      </div>

      <ProvinciaList />
    </LoadableScreen>
  );
};

export default Provincia;
