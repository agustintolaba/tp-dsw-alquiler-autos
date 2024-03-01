// Provincias
import { SelectMenuItem, Provincia } from "@/types";
import apiClient from "./api";

export const getProvinciaBranchOptions = async (): Promise<
  SelectMenuItem[]
> => {
  let optionsArray: SelectMenuItem[] = [];
  const branches = await getBranches();

  optionsArray = branches.map((t: Provincia) => ({
    id: t.id,
    descripcion: t.descripcion,
  }));

  return optionsArray;
};

export const getBranches = async (): Promise<Provincia[]> => {
  const res = await apiClient().get("/provincia");
  return res.data.data;
};
