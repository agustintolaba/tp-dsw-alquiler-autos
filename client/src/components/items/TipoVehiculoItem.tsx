/* Para crear el componente de un solo TipoVehiculo */
"use client";
import apiClient from "@/services/api";
import { alertError } from "@/utils/errorHandling";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export interface TipoVehiculo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

interface TipoVehiculoProps {
  isAdmin: boolean;
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  onTipoVehiculoListChanged: () => void;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const TipoVehiculoItem: React.FC<TipoVehiculoProps> = ({
  isAdmin,
  id,
  nombre,
  descripcion,
  precio,
  onTipoVehiculoListChanged,
}) =>  {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(nombre);
  const [newDescription, setNewDescription] = useState(descripcion);
  const [newPrecio, setNewPrecio] = useState(precio.toString());
  const wasEditing = usePrevious(isEditing);
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  

  const editTipoVehiculo = async () => {
    try {
      await apiClient(true)
        .put(`/tipoVehiculo/${id}`, {
          id: id,
          nombre: newName,
          descripcion: newDescription,
          precio: newPrecio
        })
        .then(() => {
          alert("Se edito el Tipo de Vehiculo");
          onTipoVehiculoListChanged();
        })
        .catch((error: any) => {
          alertError(error);
        });
    } catch (error: any) {
      alert("No se pudo editar");
      console.error("Error:", error.message);
    }
  };

  const deleteTipoVehiculo = async (id: string) => {
    const respuesta = confirm("Desea eliminar el Tipo de Vehiculo?");
    if (respuesta) {
      try {
        const response = await apiClient(true).delete(`/tipoVehiculo/${id}`);
        alert("Se elimino un Tipo de Vehiculo");
        onTipoVehiculoListChanged();
      } catch (error: any) {
        alertError(error);
        console.error("Error:", error.message);
      }
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    switch (name) {
      case "nombre":
      setNewName(value);
      break;
      case "descripcion":
      setNewDescription(value);
      break;
      case "precio":
      if (!isNaN(Number(value))) {
        setNewPrecio(value);

      }
      break;
      default:
        break;
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    editTipoVehiculo();
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
      <div className="flex flex-col items-center gap-4 px-4 py-8 rounded-2xl bg-slate-500 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-8">
        <div className="flex flex-col items-center text-white w-full lg:w-full lg:text-center mx-auto">
          <TextField
            name="nombre"
            variant="outlined"
            fullWidth
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
          />
          <TextField
            name="descripcion"
            variant="outlined"
            fullWidth
            value={newDescription}
            onChange={handleChange}
            ref={editFieldRef}
          />
          <TextField
            name="precio"
            variant="outlined"
            fullWidth
            value={newPrecio}
            onChange={handleChange}
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
        <span className="font-bold text-2xl tracking-wider text-primary">{nombre}</span>
        <span className="font-light text-2xl tracking-wider text-secondary">{descripcion}</span>
        <span className="font-light text-2xl tracking-wider text-secondary">{precio}</span>
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
              onClick={() => deleteTipoVehiculo(id.toString())}
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

export default TipoVehiculoItem;
