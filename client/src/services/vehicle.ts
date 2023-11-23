import { Vehiculo } from "@/types";
import apiClient from "./api"

export const getVehicles = async (): Promise<Vehiculo[]> => {
    const res = await apiClient.get('/vehiculo')

    return res.data.data
};