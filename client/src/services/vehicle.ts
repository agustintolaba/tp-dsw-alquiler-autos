import { Vehiculo } from "@/types";
import apiClient from "./api";
import { useEffect, useState } from "react";
import { alertError } from "@/utils/errorHandling";

const useVehicle = (vehicleTypeId: number | null = null) => {
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(true);
  const [vehicles, setVehicles] = useState<Vehiculo[]>([]);
  const [filteredList, setFilteredList] = useState<Vehiculo[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      getVehicles(vehicleTypeId)
        .then((vehicles) => {
          console.log(vehicles)
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

  const filter = (search: string) => {
    if (search.trim() == "" || search.length == 0) {
      setFilteredList(null);
      return;
    }

    let searchTerms = search.toLowerCase().split(" ");

    setFilteredList(
      vehicles.filter((v) =>
        searchTerms.some(
          (term) =>
            v.marca.toLowerCase().includes(term) ||
            v.modelo.toLowerCase().includes(term)
        )
      )
    );
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
