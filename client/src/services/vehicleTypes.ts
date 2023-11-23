import { SelectMenuItem, TipoVehiculo } from "@/types";
import apiClient from "./api";

export const getVehicleTypesOptions = async (): Promise<SelectMenuItem[]> => {
    let optionsArray: SelectMenuItem[] = []
    const types = await getVehicleTypes()

    optionsArray = types.map((t: TipoVehiculo) => ({
        id: t.id,
        descripcion: t.nombre
    }))

    return optionsArray
};

export const getVehicleTypes = async (): Promise<TipoVehiculo[]> => {
    const res = await apiClient.get('/tipovehiculo')

    return res.data.types
};