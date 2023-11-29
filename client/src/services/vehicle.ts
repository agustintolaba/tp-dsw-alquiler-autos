import { Vehiculo } from "@/types";
import apiClient from "./api";
import { useEffect, useState } from "react";
import { alertError } from "@/utils/errorHandling";

const useVehicle = (vehicleTypeId: number | null = null) => {
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(true);
  const [vehicles, setVehicles] = useState<Vehiculo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      getVehicles(vehicleTypeId)
        .then((vehicles) => {
          setVehicles(vehicles);
          setIsLoadingVehicle(false);
        })
        .catch((error: any) => {
          alertError(error);
        });
    };
    fetchData();
  }, []);

  const remove = async (vehicle: Vehiculo) => {
    apiClient
      .delete(`/vehiculo/${vehicle.id}`)
      .then(() => {
        setVehicles((vehicles) => vehicles?.filter((v) => v.id != vehicle.id));
      })
      .catch((error: any) => {
        alertError(error)
      });
  };

  const add = (vehicle: Vehiculo) => {
    setVehicles((vehicles) => [...vehicles, vehicle]);
  };

  const edit = (vehicle: Vehiculo) => {
    setVehicles((vehicles) =>
      vehicles.map((v) => (v.id === vehicle.id ? vehicle : v))
    );
  };

  return {
    isLoadingVehicle,
    vehicles,
    remove,
    add,
    edit,
  };
};

useVehicle.defaultProps = {
  vehicleTypeId: null,
};

export default useVehicle;

export const getVehicles = async (
  idTipo: number | null = null
): Promise<Vehiculo[]> => {
  const res = await apiClient.get(
    idTipo ? `/tipovehiculo/${idTipo}/vehiculo` : "/vehiculo/find"
  );

  return res.data.vehicles;
};
