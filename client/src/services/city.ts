// Provincias
import { SelectMenuItem, Localidad } from "@/types";
import apiClient from "./api";

export const getCitiesOptions = async (
  filterProv: number
): Promise<SelectMenuItem[]> => {
  let optionsArray: SelectMenuItem[] = [];
  const branches = await getCities(filterProv);

  optionsArray = branches.map((t: Localidad) => ({
    id: t.id,
    descripcion: t.descripcion,
  }));

  return optionsArray;
};

export const getCities = async (filterProv: number): Promise<Localidad[]> => {
  const res = await apiClient().get(`/provincia/${filterProv}/localidad`);
  return res.data.data;
};
