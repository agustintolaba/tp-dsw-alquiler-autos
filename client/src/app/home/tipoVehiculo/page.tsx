"use client";

import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import LoadableScreen from "@/components/LoadableScreen";
import TipoVehiculoList from "@/components/lists/TipoVehiculoList";
import apiClient from "@/services/api";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import useAdmin from "@/services/userType";

interface TipoVehiculoFormData {
  descripcion: string;
  nombre: string
  precio: number // ACA NO SE SI VAN O NO OTROS ATRIBUTOS DE TIPOVEHICULO
}

const TipoVehiculo: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<TipoVehiculoFormData>({
    descripcion: "",
    nombre: "",
    precio:0
  });
  const [TipoVehiculoListChanged, setTipoVehiculoListChanged] =
    useState<boolean>(false);
  const { isAdmin, isLoadingAdmin } = useAdmin();

  const newTipoVehiculo = (data: TipoVehiculoFormData) => {
    const res = apiClient()
      .post("/tipoVehiculo", JSON.stringify(data))
      .then((res) => {
        alert("Se cargo un nuevo tipo de vehiculo");
        setFormData({ descripcion: "", nombre: "", precio:0});
        enableButton({ descripcion: "", nombre: "", precio:0 });
        handleTipoVehiculoListChanged();
        })
      .catch((error: Error | AxiosError) =>  {
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
    newTipoVehiculo(formData);
  };  
        
const enableButton = (formData: TipoVehiculoFormData) => {
    setButtonEnabled(formData.descripcion.length > 0);
  };

const handleTipoVehiculoListChanged = () => {
    setTipoVehiculoListChanged(!TipoVehiculoListChanged);
  };


return (
    <LoadableScreen isLoading={isLoading || isAdmin == null}>
      <div className="flex flex-col items-center p-4 md:p-8 lg:p-12 gap-4 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
        <span className="w-full text-2xl md:text-4xl lg:text-5xl font-extralight text-center">
          {isAdmin
            ? "Administración de Tipo-Vehículo"
            : "Tipos de vehiculo disponibles"}
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
              <TextField
                className=""
                name="nombre"
                label="Nombre"
                variant="outlined"
                fullWidth
                value={formData.nombre}
                onChange={handleInputChange}
              />
              <TextField
                className=""
                name="precio"
                label="Precio"
                variant="outlined"
                fullWidth
                value={formData.precio}
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
            Listado de Tipos de Vehiculo:
          </span>
        )}
        <TipoVehiculoList
          isAdmin={isAdmin || false}
          onTipoVehiculoListChanged={handleTipoVehiculoListChanged}
        />
      </div>
    </LoadableScreen>
  );

};

export default TipoVehiculo;




