/* Para crear el componente de una sola provincia */
'use client';
import apiClient from '@/services/api';
import { alertError } from '@/utils/errorHandling';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

export interface Provincia {
  id: number;
  descripcion: string;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ProvinciaItem: React.FC<
  Provincia & { onProvinciaListChanged: () => void }
> = ({ id, descripcion, onProvinciaListChanged }) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(descripcion);
  const wasEditing = usePrevious(isEditing);
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);

  const editProvincia = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/provincia/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id, descripcion: newName }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      alert('Se edito provincia');
      onProvinciaListChanged();
    } catch (error: any) {
      alert('No se pudo editar');
      console.error('Error:', error.message);
    }
  };

  const deleteProvincia = async (id: string) => {
    const respuesta = confirm('Desea eliminar la provincia?');
    if (respuesta) {
      try {
        const response = await apiClient.delete(`/provincia/${id}`);
        //alert(response.data.json());
        alert('Se elimino una provincia');
        onProvinciaListChanged();
      } catch (error: any) {
        alertError(error);
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    setButtonEnabled(false);
  }, [isEditing]);

  const enableButton = (value: string) => {
    setButtonEnabled(value.trim().length > 0);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value);
    enableButton(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    editProvincia();
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
      <div className="flex flex-row flex-wrap justify-center items-center gap-6 pt-8 pb-4 px-4 rounded-2xl bg-slate-500 lg:px-8">
        <div className="flex flex-col justify-end items-center gap-6 sm:items-end">
          <div className="flex flex-col items-start gap-2 text-white">
            <label className="todo-label" htmlFor={id.toString()}>
              Nuevo nombre para: {descripcion}
            </label>
            <TextField
              id={id.toString()}
              name="descripcion"
              variant="outlined"
              fullWidth
              value={newName}
              onChange={handleChange}
              ref={editFieldRef}
            />
          </div>
          <div className="flex flex-col items-center gap-2 text-white sm:flex-row sm:justify-end">
            <Button
              variant="outlined"
              color="success"
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
    <div className="flex flex-row flex-wrap justify-center items-center gap-6 pt-8 pb-4 px-4 rounded-2xl bg-slate-500 lg:px-8">
      <div className="flex flex-col items-start gap-2 text-white">
        <span className="font-bold text-2xl tracking-wider">{descripcion}</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-white sm:flex-row sm:justify-end">
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
          onClick={() => deleteProvincia(id.toString())}
        >
          Eliminar
        </Button>
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

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
};

export default ProvinciaItem;
