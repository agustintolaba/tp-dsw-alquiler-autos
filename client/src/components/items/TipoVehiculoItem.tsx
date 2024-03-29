"use client";
import apiClient from "@/services/api";
import { alertError } from "@/utils/alerts";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface TipoVehiculoProps {
  isAdmin: boolean;
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  onTipoVehiculoListChanged: () => void;
}

const TipoVehiculoItem: React.FC<TipoVehiculoProps> = ({
  isAdmin,
  id,
  nombre,
  descripcion,
  precio,
  onTipoVehiculoListChanged,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(nombre);
  const [newDescription, setNewDescription] = useState(descripcion);
  const [newPrecio, setNewPrecio] = useState(precio.toString());

  const editTipoVehiculo = () => {
    apiClient(true)
      .put(`/tipoVehiculo/${id}`, {
        id: id,
        nombre: newName,
        descripcion: newDescription,
        precio: newPrecio,
      })
      .then((res) => {
        Swal.fire({
          title: "¡Bien hecho!",
          text: res.data.message,
          icon: "success",
        });
        onTipoVehiculoListChanged();
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  const deleteTipoVehiculo = (id: string) => {
    Swal.fire({
      icon: "question",
      title: "¿Desea eliminar un tipo vehiculo?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient(true)
          .delete(`/tipoVehiculo/${id}`)
          .then((res) => {
            Swal.fire({
              title: "¡Bien hecho!",
              text: res.data.message,
              icon: "success",
            });
            onTipoVehiculoListChanged();
          })
          .catch((error: any) => {
            alertError(error);
            console.error("Error:", error.message);
          });
      }
    });
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
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
          />
          <TextField
            name="descripcion"
            variant="outlined"
            fullWidth
            value={newDescription}
            onChange={handleChange}
          />
          <TextField
            name="precio"
            variant="outlined"
            fullWidth
            value={newPrecio}
            onChange={handleChange}
          />
          <div className="flex flex-col items-center gap-2 mt-4 lg:flex-row lg:justify-center lg:w-full">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditing(false)}
            >
              Cancelar
            </Button>
            <Button variant="outlined" color="success" type="submit">
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
        <span className="font-bold text-2xl tracking-wider text-primary">
          {nombre}
        </span>
        <span className="font-light text-2xl tracking-wider text-secondary">
          {descripcion}
        </span>
        <span className="font-light text-2xl tracking-wider text-secondary">
          {precio}
        </span>
        {isAdmin && (
          <div className="flex flex-col items-center gap-2 mt-4 lg:flex-row lg:justify-center lg:w-full">
            <Button
              variant="outlined"
              color="success"
              onClick={() => setEditing(true)}
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

  return <>{isEditing ? editingTemplate : viewTemplate}</>;
};

export default TipoVehiculoItem;
