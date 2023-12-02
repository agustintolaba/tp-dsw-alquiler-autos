'use client'
import NewVehicleForm from "@/components/forms/NewVehiculeForm"
import { verifyAdmin } from "@/services/userType"
import { NO_ACCESS } from "@/utils/constants"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const NewVehicle: React.FC = () => {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(true)

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

    if (!isAdmin) {
        router.push(`/error?description=${NO_ACCESS}`)
        return
    } else {
        return <NewVehicleForm />
    }

}

export default NewVehicle