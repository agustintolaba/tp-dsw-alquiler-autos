"use client";
import apiClient from "@/services/api";
import { alertError } from "@/utils/alerts";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
export interface Provincia {
  id: number;
  descripcion: string;
}

export interface ProvinciaProps {
  isAdmin: boolean;
  id: number;
  descripcion: string;
  onProvinciaListChanged: () => void;
}

const ProvinciaItem: React.FC<ProvinciaProps> = ({
  isAdmin,
  id,
  descripcion,
  onProvinciaListChanged,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(descripcion);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);

  const editProvincia = () => {
    apiClient(true)
      .put(`/provincia/${id}`, {
        id: id,
        descripcion: newName,
      })
      .then(() => {
        Swal.fire({
          title: "¡LISTO!",
          text: "Se editó una provincia",
          icon: "success",
        });
        onProvinciaListChanged();
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  const deleteProvincia = async (id: string) => {
    const respuesta = Swal.fire({
      icon: "question",
      title: "¿Desea eliminar una provincia?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    });
    if ((await respuesta).isConfirmed) {
      apiClient(true)
        .delete(`/provincia/${id}`)
        .then((response) => {
          Swal.fire({
            title: "¡Listo!",
            text: response.data.message,
            icon: "success",
          });
          onProvinciaListChanged();
        })
        .catch((error: any) => {
          alertError(error);
          console.error("Error:", error.message);
        });
    }
  };

  useEffect(() => {
    setButtonEnabled(false);
    setNewName(descripcion);
  }, [isEditing]);

  useEffect(() => {
    enableButton();
  }, [newName]);

  const enableButton = () => {
    setButtonEnabled(
      newName.trim().length > 0 && newName.trim() !== descripcion
    );
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value);
    enableButton();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    editProvincia();
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
      <div className="flex flex-col items-center gap-4 px-4 py-8 rounded-2xl bg-slate-500 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-8">
        <div className="flex flex-col items-center text-white w-full lg:w-full lg:text-center mx-auto">
          <TextField
            id={id.toString()}
            variant="outlined"
            fullWidth
            value={newName}
            onChange={handleChange}
            name={`new-name-provincia-${descripcion}`}
          />
          <div className="flex flex-col items-center gap-2 mt-4 lg:flex-row lg:justify-center lg:w-full">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditing(false)}
            >
              Cancelar
            </Button>
            <Button
              data-testid={`edit-provincia-${newName}-save-button`}
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
        {isAdmin && (
          <div className="flex flex-col items-center gap-2 mt-4 lg:flex-row lg:justify-center lg:w-full">
            <Button
              data-testid={`edit-provincia-${descripcion}`}
              variant="outlined"
              color="success"
              onClick={() => setEditing(true)}
            >
              Editar
            </Button>
            <Button
              data-testid={`delete-provincia-${descripcion}`}
              variant="outlined"
              color="error"
              onClick={() => deleteProvincia(id.toString())}
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

export default ProvinciaItem;
