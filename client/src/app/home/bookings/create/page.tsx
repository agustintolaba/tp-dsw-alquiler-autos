'use client'
import LoadingScreen from "@/components/LoadingScreen";
import apiClient from "@/services/api";
import { SelectMenuItem, TipoVehiculo } from "@/types";
import { handleError } from "@/utils/errorHandling";
import { Button, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IBookingFormData {
    fechaDesde: string;
    fechaHasta: string;
    transmision: string;
    tipoVehiculo: number
}

const transmisions: SelectMenuItem[] = [{
    id: 1,
    description: "AT"
}, {
    id: 2,
    description: "MT"
}]

const CreateBooking = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [buttonEnabled, setButtonEnabled] = useState(false)
    const [vehicleTypes, setVehicleTypes] = useState<SelectMenuItem[]>()
    const [formData, setFormData] = useState<IBookingFormData>({
        fechaDesde: "",
        fechaHasta: "",
        transmision: "AT",
        tipoVehiculo: 1
    })

    useEffect(() => {
        const fetchData = async () => {
            apiClient.get('/tipovehiculo')
                .then((res) => {
                    let types: SelectMenuItem[]
                    types = res.data.data.map((t: TipoVehiculo) => {
                        return {
                            id: t.id,
                            description: t.nombre
                        }
                    })
                    setVehicleTypes(types)
                    const firstItem = types.at(0)
                    if (firstItem) {
                        setFormData({
                            ...formData,
                            tipoVehiculo: firstItem.id
                        })
                    }
                    setIsLoading(false)
                })
                .catch((error: any) => {
                    handleError(error)
                    router.replace('/')
                })
        }
        fetchData()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData, [name]: value }

            enableButton(newFormData)
            return newFormData
        });
    };

    const enableButton = (newFormData: IBookingFormData) => {
        const enabled = newFormData.fechaDesde.length > 0
            && newFormData.fechaHasta.length > 0
        setButtonEnabled(enabled)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        apiClient.get(`/vehiculo/getAvailables?fecha_desde='${formData.fechaDesde}'&fecha_hasta='${formData.fechaHasta}'&transmision='${formData.transmision}'&tipo_vehiculo='${formData.tipoVehiculo}'`)
            .then((res) => {
                console.log(res.data.vehicles)
            })
            .catch((error: any) => {
                console.log(error)
            })
    };

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <div className="flex flex-col items-center p-8 gap-8" >
            <span className='w-full text-4xl font-extralight'>Elija sus preferencias</span>

            <form onSubmit={handleSubmit} className="max-w-xl grid grid-cols-2 gap-4">

                <TextField
                    name="fechaDesde"
                    label="Fecha de retiro"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={formData.fechaDesde}
                    onChange={handleInputChange}
                />
                <TextField
                    name="fechaHasta"
                    label="Fecha de devolución"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={formData.fechaHasta}
                    onChange={handleInputChange}
                />

                <TextField
                    name="tipoVehiculo"
                    label="Tipo de vehículo"
                    variant="outlined"
                    select
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={formData.tipoVehiculo}
                    onChange={handleInputChange}
                >
                    {vehicleTypes?.map(t => <MenuItem key={t.id} value={t.id}>{t.description}</MenuItem>)}
                </TextField>

                <TextField
                    name="transmision"
                    label="Transmisión"
                    variant="outlined"
                    select
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={formData.transmision}
                    onChange={handleInputChange}
                >
                    {transmisions?.map(t => <MenuItem key={t.id} value={t.description}>{t.description == 'AT' ? 'Automático' : 'Manual'}</MenuItem>)}
                </TextField>

                <Button
                    className="col-span-2"
                    variant='outlined'
                    color='success'
                    disabled={!buttonEnabled}
                    type="submit"
                >Ver vehículos disponibles</Button>

                <Button
                    className="col-span-2"
                    variant='outlined'
                    color='error'
                    onClick={() => history.back()}
                >Volver</Button>

            </form>
        </div >
    )
}

export default CreateBooking