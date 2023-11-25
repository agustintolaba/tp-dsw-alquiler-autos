import { Vehiculo } from "@/types";
import apiClient from "./api"

export const getVehicles = async (idTipo: number | null = null): Promise<Vehiculo[]> => {
    const res = await apiClient.get(idTipo ? `/tipovehiculo/${idTipo}/vehiculo` :'/vehiculo/find')

    return res.data.vehicles
};