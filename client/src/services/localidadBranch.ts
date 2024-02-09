// Provincias
import { SelectMenuItem, Localidad } from "@/types";
import apiClient from "./api";

export const getLocalidadBranchOptions = async (filterProv: number): Promise<SelectMenuItem[]> => {
    let optionsArray: SelectMenuItem[] = []
    const branches = await getBranches(filterProv)

    optionsArray = branches.map((t: Localidad) => ({
        id: t.id,
        descripcion: t.descripcion
    }))

    return optionsArray
};

export const getBranches = async (filterProv: number): Promise<Localidad[]> => {
    const res = await apiClient().get(`/provincia/${filterProv}/localidad`)
    console.log(res.data.data)
    return res.data.data
};