"use client";
import apiClient from "@/services/api";
import { alertError } from "@/utils/alerts";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ProvinciaSelectField from "../ProvinciaSelectField";
import LocalidadSelectField from "../LocalidadSelectField";
import Swal from "sweetalert2";

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

const SucursalItem: React.FC<SucursalProps> = ({
  isAdmin,
  id,
  sucursal,
  onSucursalListChanged,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [provincia, setProvincia] = useState(sucursal.localidad.provincia.id);

  const [formData, setFormData] = useState<SucursalFormData>({
    calle: sucursal.calle,
    numeroCalle: sucursal.numeroCalle,
    localidad: sucursal.localidad.id,
  });

  const [oldFormData, setOldFormData] = useState<SucursalFormData>({
    calle: sucursal.calle,
    numeroCalle: sucursal.numeroCalle,
    localidad: sucursal.localidad.id,
  });

  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);

  const editSucursal = async (formData: SucursalFormData) => {
    try {
      await apiClient(true)
        .put(`/sucursal/${id}`, {
          ...formData,
          id: id,
        })
        .then(() => {
          Swal.fire({
            title: "¡LISTO!",
            text: "Se editó una sucursal",
            icon: "success",
          });
          onSucursalListChanged();
        })
        .catch((error: any) => {
          alertError(error);
        });
    } catch (error: any) {
      Swal.fire({
        icon: "warning",
        title: "Alerta",
        text: "¡No se pudo editar la sucursal!",
      });
      console.error("Error:", error.message);
    }
  };

  const deleteSucursal = async (id: string) => {
    Swal.fire({
      icon: "question",
      title: "¿Desea eliminar una sucursal?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    }).then((res) => {
      if (res.isConfirmed) {
        apiClient(true)
          .delete(`/sucursal/${id}`)
          .then((res) => {
            Swal.fire({
              title: "¡Listo!",
              text: res.data.message,
              icon: "success",
            });
            onSucursalListChanged();
          })
          .catch((error: any) => {
            alertError(error);
          });
      }
    });
  };

  useEffect(() => {
    setButtonEnabled(false);
    setFormData({
      calle: sucursal.calle,
      numeroCalle: sucursal.numeroCalle,
      localidad: sucursal.localidad.id,
    });
    setOldFormData({
      calle: sucursal.calle,
      numeroCalle: sucursal.numeroCalle,
      localidad: sucursal.localidad.id,
    });
  }, [isEditing]);

  useEffect(() => {
    setOldFormData({
      calle: sucursal.calle,
      numeroCalle: sucursal.numeroCalle,
      localidad: sucursal.localidad.id,
    });
    enableButton();
  }, [formData.calle, formData.numeroCalle, formData.localidad]);

  const enableButton = () => {
    setButtonEnabled(
      formData.calle.trim() !== oldFormData.calle.trim() ||
        formData.numeroCalle.trim() !== oldFormData.numeroCalle.trim() ||
        formData.localidad !== oldFormData.localidad
    );
  };

  const handleProvinciaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvincia(parseInt(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    editSucursal(formData);
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
            name="localidad"
            value={formData.localidad}
            onChange={handleInputChange}
            disabled={provincia === 0}
          />
          <TextField
            id={id.toString()}
            name="calle"
            variant="outlined"
            fullWidth
            value={formData.calle}
            onChange={handleInputChange}
          />
          <TextField
            id={id.toString()}
            name="numeroCalle"
            variant="outlined"
            fullWidth
            value={formData.numeroCalle}
            onChange={handleInputChange}
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

  return <>{isEditing ? editingTemplate : viewTemplate}</>;
};

export default SucursalItem;
