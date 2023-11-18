import { TOKEN_STORAGE_KEY } from "@/utils/constants";
import apiClient from "./api";
import { Reserva } from "@/types";

export const getBookings = async (): Promise<Reserva[]> => {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY)

    const res = await apiClient.get("/alquiler/getAll", {
        headers: {
            'Authorization': token
        }
    })
    return res.data.bookings
};