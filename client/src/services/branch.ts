// Sucursal
import { SelectMenuItem, Sucursal, TipoVehiculo } from "@/types";
import apiClient from "./api";

export const getBranchOptions = async (): Promise<SelectMenuItem[]> => {
    let optionsArray: SelectMenuItem[] = []
    const branches = await getBranches()

    optionsArray = branches.map((t: Sucursal) => ({
        id: t.id,
        descripcion: `${t.calle} ${t.numeroCalle}, ${t.localidad.descripcion}, ${t.localidad.provincia.descripcion}`
    }))

    return optionsArray
};

export const getBranches = async (): Promise<Sucursal[]> => {
    const res = await apiClient().get('/sucursal')

    return res.data.branches
};