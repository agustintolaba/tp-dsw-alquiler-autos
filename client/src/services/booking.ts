import { TOKEN_STORAGE_KEY } from "@/utils/constants";
import apiClient from "./api";
import { Reserva } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { alertError } from "@/utils/errorHandling";

export const getBookings = async (): Promise<Reserva[]> => {
  const res = await apiClient(true).get("/alquiler/getAll");
  return res.data.bookings;
};

const useBooking = () => {
  const router = useRouter();
  const [isLoadingBookings, setIsLoadingBookings] = useState<boolean>(true);
  const [bookings, setBookings] = useState<Reserva[]>([]);
  const [filteredList, setFilteredList] = useState<Reserva[] | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getBookings();
        setBookings(bookings);
        setIsLoadingBookings(false);
      } catch (error: any) {
        alertError(error);
      }
    };
    fetchBookings();
  }, []);

  const search = async (search: string) => {
    const emptySearch = search === "" || search.length === 0;
    apiClient(true)
      .get(emptySearch ? "/alquiler/getAll" : `/alquiler/${search}`)
      .then((res) => {
        const bookings = res.data.bookings;
        if (!bookings) {
          const message = res.data.message;
          alertError(Error(!message || message === "" ? message : ""));
          return;
        }
        setFilteredList(bookings);
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  return { isLoadingBookings, bookings: filteredList || bookings, search };
};

export default useBooking;
