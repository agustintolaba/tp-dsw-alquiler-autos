'use client';
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import LoadableScreen from '@/components/LoadableScreen';
import SucursalList from '@/components/lists/SucursalList';
import ProvinciaSelectField from '@/components/ProvinciaSelectField';
import LocalidadSelectField from '@/components/LocalidadSelectField';
import apiClient from '@/services/api';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import useAdmin from '@/services/userType';

interface SucursalFormData {
  calle: string;
  numeroCalle: string;
  localidad: number;
}

const Sucursal: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<SucursalFormData>({
    calle: '',
    numeroCalle: '',
    localidad: 0,
  });
  const [sucursalListChanged, setSucursalListChanged] =
    useState<boolean>(false);
  const [provincia, setProvincia] = useState(0);
  const { isAdmin, isLoadingAdmin } = useAdmin();

  const newSucursal = (data: SucursalFormData) => {
    const res = apiClient(true)
      .post('/sucursal', JSON.stringify(data))
      .then((res) => {
        alert('Se cargo una nueva Sucursal');
        setFormData({ calle: '', numeroCalle: '', localidad: 0 });
        enableButton({ calle: '', numeroCalle: '', localidad: 0 });
        handleSucursalListChanged();
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

  const handleProvinciaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvincia(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    newSucursal(formData);
  };

  const enableButton = (formData: SucursalFormData) => {
    setButtonEnabled(
      formData.calle.length > 0 &&
        formData.numeroCalle.length > 0 &&
        formData.localidad !== 0
    );
  };

  const handleSucursalListChanged = () => {
    setSucursalListChanged(!sucursalListChanged);
  };

  return (
    <LoadableScreen isLoading={isLoading || isAdmin == null}>
      <div className="flex flex-col items-center p-4  space-y-4 md:p-8 lg:p-12 gap-4 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
        <span className="w-full text-2xl md:text-4xl lg:text-5xl font-extralight text-center">
          {isAdmin
            ? 'Administración de Sucursales'
            : 'Sucursales en donde nos podes encontrar!'}
        </span>
        {isAdmin && (
          <form onSubmit={handleSubmit} className="w-full sm:w-1/2">
            <div className="flex flex-col space-y-4">
              <ProvinciaSelectField
                value={provincia}
                onChange={handleProvinciaSelect}
              />
              <LocalidadSelectField
                filterProv={provincia}
                name="localidad"
                value={formData.localidad}
                onChange={handleInputChange}
                disabled={provincia === 0}
              />
              <TextField
                className=""
                name="calle"
                label="Calle"
                variant="outlined"
                fullWidth
                value={formData.calle}
                onChange={handleInputChange}
              />
              <TextField
                className=""
                name="numeroCalle"
                label="Altura"
                variant="outlined"
                fullWidth
                value={formData.numeroCalle}
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
            Listado de Sucursales:
          </span>
        )}
        <SucursalList
          isAdmin={isAdmin || false}
          onSucursalListChanged={handleSucursalListChanged}
        />
      </div>
    </LoadableScreen>
  );
};

export default Sucursal;
