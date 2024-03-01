"use client";
import VehiclesList from "@/components/lists/VehiclesList";
import { verifyAdmin } from "@/services/userType";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const Vehicles = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const id = useRef(params.get("vehicleType"));

  useEffect(() => {
    if (params.get("vehicleType") !== id.current) {
      location.reload();
    }
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      verifyAdmin()
        .then((isAdmin) => {
          setIsAdmin(isAdmin);
        })
        .catch((error: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "error al verificar acceso",
          });
          router.replace("/");
        });
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center pb-20 gap-8">
      <div className="flex flex-row w-full flex-wrap gap-4 items-center justify-center md:justify-between">
        <span className="mx-8 mt-8 text-4xl font-extralight text-center">
          {isAdmin ? "Administración de vehículos" : "Nuestros vehículos"}
        </span>
        {isAdmin && (
          <Link href="/home/vehicles/new">
            <Button variant="outlined" color="success">
              Agregar un nuevo vehículo
            </Button>
          </Link>
        )}
      </div>
      <VehiclesList isAdmin={isAdmin} vehicleTypeId={Number(id.current)} />
      <Button variant="outlined" color="error" onClick={() => history.back()}>
        Volver
      </Button>

      {isAdmin && (
        <footer className="fixed flex items-center justify-center bottom-0 w-full py-4 px-2 bg-slate-700">
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
