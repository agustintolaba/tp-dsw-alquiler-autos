/* Para crear el componente de una sola localidad */
'use client';
import apiClient from '@/services/api';
import { alertError } from '@/utils/errorHandling';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ProvinciaSelectField from '../ProvinciaSelectField';
import LocalidadSelectField from '../LocalidadSelectField';

export interface Sucursal {
  id: number;
  calle: string;
  numeroCalle: string;
  localidad: {
    id: number;
    descripcion: string;
    provincia: {
      id: number;
      descripcion: string;
    };
  };
}

interface SucursalFormData {
  calle: string;
  numeroCalle: string;
  localidad: number;
}

interface SucursalProps {
  isAdmin: boolean;
  id: number;
  sucursal: Sucursal;
  onSucursalListChanged: () => void;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const SucursalItem: React.FC<SucursalProps> = ({
  isAdmin,
  id,
  sucursal,
  onSucursalListChanged,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [provincia, setProvincia] = useState(sucursal.localidad.provincia.id);
  const [newLoc, setNewLoc] = useState(sucursal.localidad.id);
  const [oldLoc, setOldLoc] = useState(sucursal.localidad.id);
  const [newCalle, setNewCalle] = useState(sucursal.calle);
  const [oldCalle, setOldCalle] = useState(sucursal.calle);
  const [newNroCalle, setNewNroCalle] = useState(sucursal.numeroCalle);
  const [oldNroCalle, setOldNroCalle] = useState(sucursal.numeroCalle);

  const wasEditing = usePrevious(isEditing);
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);

  const editSucursal = async () => {
    try {
      await apiClient(true)
        .put(`/sucursal/${id}`, {
          id: id,
          localidad: newLoc,
          calle: newCalle,
          numeroCalle: newNroCalle,
        })
        .then(() => {
          alert('Se edito una sucursal');
          onSucursalListChanged();
        })
        .catch((error: any) => {
          alertError(error);
        });
    } catch (error: any) {
      alert('No se pudo editar');
      console.error('Error:', error.message);
    }
  };

  const deleteSucursal = async (id: string) => {
    const respuesta = confirm('Desea eliminar la sucursal?');
    if (respuesta) {
      try {
        const response = await apiClient(true).delete(`/sucursal/${id}`);
        alert('Se elimino una sucursal');
        onSucursalListChanged();
      } catch (error: any) {
        alertError(error);
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    setButtonEnabled(false);
    setNewCalle(sucursal.calle);
    setOldCalle(sucursal.calle);
    setNewNroCalle(sucursal.numeroCalle);
    setOldNroCalle(sucursal.numeroCalle);
    setNewLoc(sucursal.localidad.id);
    setOldLoc(sucursal.localidad.id);
  }, [isEditing]);

  useEffect(() => {
    setOldCalle(newCalle);
    setOldNroCalle(newNroCalle);
    setOldLoc(newLoc);
    enableButton();
  }, [newCalle, newNroCalle, newLoc]);

  const enableButton = () => {
    setButtonEnabled(
      newCalle.trim() !== oldCalle.trim() ||
        oldNroCalle.trim() !== newNroCalle.trim() ||
        oldLoc !== newLoc
    );
  };

  const handleProvinciaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvincia(parseInt(e.target.value));
  };

  const handleLocalidadInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewLoc(parseInt(e.target.value));
  };

  const handleCalleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCalle(e.target.value);
  };

  const handleNroCalleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewNroCalle(e.target.value);
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    editSucursal();
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
      <div className="flex flex-col items-center gap-4 px-4 py-8 rounded-2xl bg-slate-500 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-8">
        <div className="flex flex-col items-center  space-y-4 text-white w-full lg:w-full lg:text-center mx-auto">
          <ProvinciaSelectField
            value={provincia}
            onChange={handleProvinciaSelect}
          />
          <LocalidadSelectField
            filterProv={provincia}
            value={newLoc}
            onChange={handleLocalidadInputChange}
            disabled={provincia === 0}
          />
          <TextField
            id={id.toString()}
            name="calle"
            variant="outlined"
            fullWidth
            value={newCalle}
            onChange={handleCalleInputChange}
            ref={editFieldRef}
          />
          <TextField
            id={id.toString()}
            name="numeroCalle"
            variant="outlined"
            fullWidth
            value={newNroCalle}
            onChange={handleNroCalleInputChange}
            ref={editFieldRef}
          />
          <div className="flex flex-col items-center gap-2 mt-4 lg:flex-row lg:justify-center lg:w-full">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditing(false)}
              ref={editButtonRef}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="success"
              disabled={!buttonEnabled}
              type="submit"
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="flex flex-col items-center gap-4 px-4 py-8 rounded-2xl bg-slate-500 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-8">
      <div className="flex flex-col items-center text-white w-full lg:w-full lg:text-center mx-auto">
        <div>
          <span className="font-bold text-2xl tracking-wider">
            {`${sucursal.localidad.descripcion}, ${sucursal.localidad.provincia.descripcion}`}
          </span>
          <br />
          <span className="font-normal text-xl tracking-wider text-white">
            {`${sucursal.calle} ${sucursal.numeroCalle}`}
          </span>
        </div>

        {isAdmin && (
          <div className="flex flex-col items-center gap-2 mt-4 lg:flex-row lg:justify-center lg:w-full">
            <Button
              variant="outlined"
              color="success"
              onClick={() => setEditing(true)}
              ref={editButtonRef}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteSucursal(id.toString())}
            >
              Eliminar
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current?.focus();
    }
  }, [wasEditing, isEditing]);

  return <>{isEditing ? editingTemplate : viewTemplate}</>;
};

export default SucursalItem;
