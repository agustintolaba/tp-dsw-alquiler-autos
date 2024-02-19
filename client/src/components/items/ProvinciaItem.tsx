/* Para crear el componente de una sola provincia */
"use client";
import apiClient from "@/services/api";
import { alertError } from "@/utils/errorHandling";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export interface Provincia {
  id: number;
  descripcion: string;
}

interface ProvinciaProps {
  isAdmin: boolean;
  id: number;
  descripcion: string;
  onProvinciaListChanged: () => void;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ProvinciaItem: React.FC<ProvinciaProps> = ({
  isAdmin,
  id,
  descripcion,
  onProvinciaListChanged,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(descripcion);
  const [oldName, setOldName] = useState(descripcion);
  const wasEditing = usePrevious(isEditing);
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);

  const editProvincia = async () => {
    try {
      await apiClient(true)
        .put(`/provincia/${id}`, {
          id: id,
          descripcion: newName,
        })
        .then(() => {
          alert("Se edito provincia");
          onProvinciaListChanged();
        })
        .catch((error: any) => {
          alertError(error);
        });
    } catch (error: any) {
      alert("No se pudo editar");
      console.error("Error:", error.message);
    }
  };

  const deleteProvincia = async (id: string) => {
    const respuesta = confirm("Desea eliminar la provincia?");
    if (respuesta) {
      try {
        const response = await apiClient(true).delete(`/provincia/${id}`);
        alert("Se elimino una provincia");
        onProvinciaListChanged();
      } catch (error: any) {
        alertError(error);
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    setButtonEnabled(false);
    setNewName(descripcion);
    setOldName(descripcion);
  }, [isEditing]);

  useEffect(() => {
    setOldName(newName);
    enableButton();
  }, [newName]);

  const enableButton = () => {
    setButtonEnabled(
      newName.trim().length > 0 && newName.trim() !== oldName.trim()
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
            ref={editFieldRef}
            name={`new-name-provincia-${descripcion}`}
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
              ref={editButtonRef}
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

export default ProvinciaItem;
