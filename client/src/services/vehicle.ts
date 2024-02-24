import { Vehiculo } from "@/types";
import apiClient from "./api";
import { useEffect, useState } from "react";
import { alertError } from "@/utils/alerts";
import Swal from 'sweetalert2';

const useVehicle = (vehicleTypeId: number | null = null) => {
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(true);
  const [vehicles, setVehicles] = useState<Vehiculo[]>([]);
  const [filteredList, setFilteredList] = useState<Vehiculo[] | null>(null);

  useEffect(() => {
    getAllVehicules();
  }, []);

  const getAllVehicules = async () => {
    getVehicles(vehicleTypeId)
      .then((vehicles) => {
        console.log(vehicles);
        setVehicles(vehicles);
        setIsLoadingVehicle(false);
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  const remove = async (vehicle: Vehiculo) => {
    apiClient()
      .delete(`/vehiculo/${vehicle.id}`)
      .then(() => {
        setVehicles((vehicles) => vehicles?.filter((v) => v.id != vehicle.id));
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  const add = (vehicle: Vehiculo) => {
    setVehicles((vehicles) => [...vehicles, vehicle]);
  };

  const edit = (id: number, newKm: number) => {
    apiClient()
      .patch(`/vehiculo/${id}`, {
        km: newKm,
      })
      .then(() => {
        setVehicles((vehicles) =>
          vehicles.map((vehicle) =>
            vehicle.id === id ? { ...vehicle, km: newKm } : vehicle
          )
        );
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  const filter = async (search: string) => {
    const emptySearch = search === "" || search.length === 0;
    apiClient(true)
      .get(emptySearch ? "vehiculo/find" : `/vehiculo/search/${search}`)
      .then((res) => {
        const vehicles = res.data.vehicles;
        if (vehicles == undefined) {
          const message = res.data.vehicles;
          alertError(Error(!message || message === "" ? message : ""));
          return;
        }
        if (vehicles.length == 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontró ningún vehículo",
          });
          return;
        }
        setFilteredList(vehicles);
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  return {
    isLoadingVehicle,
    vehicles: filteredList || vehicles,
    remove,
    add,
    edit,
    filter,
  };
};

useVehicle.defaultProps = {
  vehicleTypeId: null,
};

export default useVehicle;

export const getVehicles = async (
  idTipo: number | null = null
): Promise<Vehiculo[]> => {
  const res = await apiClient().get(
    idTipo ? `/tipovehiculo/${idTipo}/vehiculo` : "/vehiculo/find"
  );

  return res.data.vehicles;
};
