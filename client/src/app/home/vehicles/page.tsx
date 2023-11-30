"use client";
import VehiclesList from "@/components/VehiclesList";
import { verifyAdmin } from "@/services/user";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Vehicles = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      verifyAdmin()
        .then((isAdmin) => {
          setIsAdmin(isAdmin);
        })
        .catch((error: any) => {
          console.log(error);
          alert("Error al verificar acceso");
          router.replace("/");
        });
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center p-8 gap-8">
      <div className="flex flex-row w-full flex-wrap gap-4 items-center justify-center sm:justify-between">
        <span className="text-4xl font-extralight text-center">
          {isAdmin ? "Administración de vehículos" : "Vehículos disponibles"}
        </span>
        {isAdmin && (
          <Link href="/home/vehicles/new">
            <Button variant="outlined" color="success">
              Agregar un nuevo vehículo
            </Button>
          </Link>
        )}
      </div>
      <VehiclesList
        isAdmin={isAdmin}
        vehicleTypeId={Number(params.get("vehicleType"))}
      />
      <Button variant="outlined" color="error" onClick={() => history.back()}>
        Volver
      </Button>

      {isAdmin && (
        <footer className="absolute flex items-center justify-center bottom-0 w-full py-4 px-2 bg-slate-700">
          <span className="text-sm text-center text-yellow-400 sm:text-md">
            Para actualizar los kilómetros debe ingresar un número mayor al
            kilometraje anterior
          </span>
        </footer>
      )}
    </div>
  );
};

export default Vehicles;
