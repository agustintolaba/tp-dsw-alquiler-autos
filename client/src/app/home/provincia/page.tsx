'use client';

import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import LoadableScreen from '@/components/LoadableScreen';
import ProvinciaList from '@/components/lists/ProvinciaList';
import apiClient from '@/services/api';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import useAdmin from '@/services/userType';

interface ProvinciaFormData {
  descripcion: string;
}

const Provincia: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProvinciaFormData>({
    descripcion: '',
  });
  const [provinciaListChanged, setProvinciaListChanged] =
    useState<boolean>(false);
  const { isAdmin, isLoadingAdmin } = useAdmin();

  const newProvincia = (data: ProvinciaFormData) => {
    const res = apiClient(true)
      .post('/provincia', JSON.stringify(data)) 
      .then((res) => {
        alert('Se cargo una nueva provincia');
        setFormData({ descripcion: '' });
        enableButton({ descripcion: '' });
        handleProvinciaListChanged();
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        } else {
          console.log(error);
          if (error.message) {
            alert(error.message);
          } else {
            alert('Ha ocurrido un error');
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

  const handleProvinciaListChanged = () => {
    setProvinciaListChanged(!provinciaListChanged);
  };

  return (
    <LoadableScreen isLoading={isLoading || isLoadingAdmin}>
      <div className="flex flex-col items-center p-4 md:p-8 lg:p-12 gap-4 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
        <span className="w-full text-2xl md:text-4xl lg:text-5xl font-extralight text-center">
          {isAdmin
            ? 'Administración de Provincias'
            : 'Provincias en las que nos encontramos!'}
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
            Listado de provincias:
          </span>
        )}
        <ProvinciaList
          isAdmin={isAdmin || false}
          onProvinciaListChanged={handleProvinciaListChanged}
        />
      </div>
    </LoadableScreen>
  );
};

export default Provincia;
