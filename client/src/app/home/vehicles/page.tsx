'use client'
import VehiculoList from "@/components/VehiculesList"
import { verifyAdmin } from "@/services/user"
import { handleError } from "@/utils/errorHandling"
import { Button } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Vehicles = () => {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            verifyAdmin()
                .then((isAdmin) => {
                    setIsAdmin(isAdmin)
                })
                .catch((error: any) => {
                    alert('Error al verificar acceso')
                    router.replace('/')
                })
        }
        fetchData()
    }, [])


    return (
        <div className="flex flex-col items-center p-8 gap-8" >
            <div className="flex flex-row w-full flex-wrap gap-4 items-center justify-center sm:justify-between">
                <span className='text-4xl font-extralight'>{isAdmin ? 'Administración de vehículos' : 'Vehículos disponibles'}</span>
                {isAdmin && <Link href='/home/vehicles/new'>
                    <Button
                        variant='outlined'
                        color='success'
                    >Agregar un nuevo vehículo</Button>
                </Link>}
            </div>
            <VehiculoList id={"1"} />
            <Button
                variant='outlined'
                color='error'
                onClick={() => history.back()}
            >Volver</Button>
        </div>
    )
}

export default Vehicles