/* Para crear el componente de una sola localidad */
'use client';
import apiClient from '@/services/api';
import { alertError } from '@/utils/errorHandling';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ProvinciaSelectField from '../ProvinciaSelectField';

export interface Localidad {
  id: number;
  descripcion: string;
  provincia: { id: number; descripcion: string };
}

interface LocalidadProps {
  isAdmin: boolean;
  id: number;
  descripcion: string;
  provincia: { id: number; descripcion: string };
  onLocalidadListChanged: () => void;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const LocalidadItem: React.FC<LocalidadProps> = ({
  isAdmin,
  id,
  descripcion,
  provincia,
  onLocalidadListChanged,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(descripcion);
  const [newProv, setNewProv] = useState(provincia.id);
  const wasEditing = usePrevious(isEditing);
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);

  const editLocalidad = async () => {
    try {
      await apiClient(true)
        .put(`/localidad/${id}`, {
          id: id,
          descripcion: newName,
          provincia: newProv,
        })
        .then(() => {
          alert('Se edito una localidad');
          onLocalidadListChanged();
        })
        .catch((error: any) => {
          alertError(error);
        });
    } catch (error: any) {
      alert('No se pudo editar');
      console.error('Error:', error.message);
    }
  };

  const deleteLocalidad = async (id: string) => {
    const respuesta = confirm('Desea eliminar la localidad?');
    if (respuesta) {
      try {
        const response = await apiClient(true).delete(`/localidad/${id}`);
        alert('Se elimino una localidad');
        onLocalidadListChanged();
      } catch (error: any) {
        alertError(error);
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    setButtonEnabled(false);
  }, [isEditing]);

  const enableButton = () => {
    setButtonEnabled(
      newName.trim() !== descripcion.trim() || provincia.id !== newProv
    );
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value);
    enableButton();
  }

  function handleProvinciaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewProv(parseInt(e.target.value));
    enableButton();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    editLocalidad();
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
      <div className="flex flex-col items-center gap-4 px-4 py-8 rounded-2xl bg-slate-500 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-8">
        <div className="flex flex-col items-center  space-y-4 text-white w-full lg:w-full lg:text-center mx-auto">
          <TextField
            id={id.toString()}
            name="descripcion"
            variant="outlined"
            fullWidth
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
          />
          <ProvinciaSelectField
            value={newProv}
            onChange={handleProvinciaChange}
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
        <span className="font-bold text-2xl tracking-wider">{descripcion}</span>
        <span className="font-bold text-2xl tracking-wider">
          {provincia.descripcion}
        </span>
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
              onClick={() => deleteLocalidad(id.toString())}
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

export default LocalidadItem;
