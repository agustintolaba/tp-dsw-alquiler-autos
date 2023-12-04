import { TOKEN_STORAGE_KEY } from "@/utils/constants";
import apiClient from "./api";
import { Reserva } from "@/types";

export const getBookings = async (): Promise<Reserva[]> => {
  const res = await apiClient(true).get("/alquiler/getAll");
  return res.data.bookings;
};
