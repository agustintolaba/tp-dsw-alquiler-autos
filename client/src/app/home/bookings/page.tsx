'use client'
import { verifyAdmin } from "@/services/user";
import { handleError } from "@/utils/errorHandling";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react"

const Bookings = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isAdmin = await verifyAdmin()
                setIsAdmin(isAdmin)
                setIsLoading(false)
            } catch (error: any) {
                handleError(error)
                router.replace("/")
            }
        }
        fetchData()
    }, []);

    const handleNewBookingClick = () => {
        router.push('/create')
    }

    return (
        <div>
            <span>Mis reservas</span>
            <Link href='/home/bookings/create'>
                <Button
                    variant='outlined'
                    color='success'
                >Hacer una reserva</Button>
            </Link>
        </div>
    )
}

export default Bookings