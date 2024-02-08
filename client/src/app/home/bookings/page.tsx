"use client";
import LoadableScreen from "@/components/LoadableScreen";
import BookingItem from "@/components/items/BookingItem";
import apiClient from "@/services/api";
import { getBookings } from "@/services/booking";
import { verifyAdmin } from "@/services/userType";
import { Reserva } from "@/types";
import { NUMERIC_FORMAT } from "@/utils/constants";
import { alertError } from "@/utils/errorHandling";
import { SearchOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const Bookings = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Reserva[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isAdmin = await verifyAdmin();
        const bookings = await getBookings();
        console.log(bookings);
        setBookings(bookings);
        setIsAdmin(isAdmin);
        setIsLoading(false);
      } catch (error: any) {
        alertError(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setSearch(value);
      return;
    }
    if (!NUMERIC_FORMAT.test(value)) return;
    setSearch(value);
  };

  const handleSearchBooking = () => {};

  return (
    <LoadableScreen isLoading={isLoading}>
      <div className="flex flex-col items-center p-8 gap-8">
        <div className="flex flex-row w-full flex-wrap gap-4 items-center justify-center sm:justify-between">
          <span className="text-4xl font-extralight text-center">
            {isAdmin ? "Administración de reservas" : "Mis reservas"}
          </span>
          {!isAdmin && (
            <Link href="/home/bookings/create">
              <Button variant="outlined" color="success">
                Hacer una nueva reserva
              </Button>
            </Link>
          )}
        </div>
        {bookings.length == 0 ? (
          <span className="text-lg text-red-300">
            No hay reservas para mostrar
          </span>
        ) : (
          <Box>
            {isAdmin && (
              <Box className="w-full mb-4 gap-4 flex flex-row flex-wrap-reverse justify-center text-center sm:justify-between">
                <Typography variant="h6">
                  Alquileres de los próximos 30 días
                </Typography>

                <Box className="flex flex-row gap-2 items-center">
                  <TextField
                    className=""
                    label="Búsqueda por ID"
                    placeholder="Ingrese ID de reserva"
                    variant="outlined"
                    value={search}
                    onChange={handleInputChange}
                  />
                  <SearchOutlined
                    className={`${
                      search.length === 0
                        ? "text-gray-400 bg-gray-500"
                        : "text-white bg-slate-600 cursor-pointer hover:bg-slate-400"
                    } p-1 h-full w-10 rounded transition-all`}
                  />
                </Box>
              </Box>
            )}
            <Box className="flex flex-wrap gap-4">
              {bookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  isAdmin={isAdmin}
                  reserva={booking}
                />
              ))}
            </Box>
          </Box>
        )}
        <Button variant="outlined" color="error" onClick={() => history.back()}>
          Volver
        </Button>
      </div>
    </LoadableScreen>
  );
};

export default Bookings;
