// Provincias
import { SelectMenuItem, Provincia } from "@/types";
import apiClient from "./api";

export const getProvincesOptions = async (): Promise<SelectMenuItem[]> => {
  let optionsArray: SelectMenuItem[] = [];
  const branches = await getProvinces();

  optionsArray = branches.map((t: Provincia) => ({
    id: t.id,
    descripcion: t.descripcion,
  }));

  return optionsArray;
};

export const getProvinces = async (): Promise<Provincia[]> => {
  const res = await apiClient().get("/provincia");
  return res.data.data;
};
