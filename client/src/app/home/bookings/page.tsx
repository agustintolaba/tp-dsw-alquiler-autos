"use client";
import LoadableScreen from "@/components/LoadableScreen";
import BookingItem from "@/components/items/BookingItem";
import apiClient from "@/services/api";
import { getBookings } from "@/services/booking";
import { verifyAdmin } from "@/services/userType";
import { Reserva } from "@/types";
import { alertError } from "@/utils/errorHandling";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const Bookings = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Reserva[]>([]);

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

  return (
    <LoadableScreen isLoading={isLoading}>
      <div className="flex flex-col items-center p-8 gap-8">
        <div className="flex flex-row w-full flex-wrap gap-4 items-center justify-center sm:justify-between">
          <span className="text-4xl font-extralight">
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
              <Typography variant="h6" className="mb-4">
                Alquileres de los próximos 30 días
              </Typography>
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
