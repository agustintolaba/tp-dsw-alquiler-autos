'use client'
import apiClient from "@/services/api";
import { getBookings } from "@/services/booking";
import { verifyAdmin } from "@/services/user";
import { Reserva } from "@/types";
import { handleError } from "@/utils/errorHandling";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react"

const Bookings = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [bookings, setBookings] = useState<Reserva[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookings = await getBookings()
                console.log(bookings)
                setBookings(bookings)
                setIsLoading(false)
            } catch (error: any) {
                handleError(error)
            }
        }
        fetchData()
    }, []);

    return (
        <div className="flex flex-col items-center p-8 gap-8" >
            <div className="flex flex-row w-full flex-wrap gap-4 items-center justify-center sm:justify-between">
                <span className='text-4xl font-extralight'>Mis reservas</span>
                <Link href='/home/bookings/create'>
                    <Button
                        variant='outlined'
                        color='success'
                    >Hacer una nueva reserva</Button>
                </Link>
            </div>
            {bookings.length == 0 && (
                <span className="text-lg text-red-300">No hay reservas para mostrar</span>
            )}
            <Button
                variant='outlined'
                color='error'
                onClick={() => history.back()}
            >Volver</Button>
        </div>
    )
}

export default Bookings