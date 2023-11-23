'use client';
import { getVehicleTypesOptions } from "@/services/vehicleTypes";
import { SelectMenuItem } from "@/types";
import { handleError } from "@/utils/errorHandling";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
import LoadableScreen from "./LoadableScreen";
import { Button, MenuItem, TextField } from "@mui/material";
import { getBranchOptions } from "@/services/branch";
import apiClient from "@/services/api";
import { verifyAdmin } from "@/services/user";
import { seatings, transmisions } from "@/utils/constants";

interface OpcionTipo {
    id: string,
    nombre: string,
    descripcion: string,
    precio: string,
    image: string
}

interface OpcionSeguro {
    id: string,
    nombreSeguro: string,
    companiaSeguro: string
}

interface OpcionSucursal {
    id: string,
    calleSucursal: string,
    numeroSucursal: string,
    localidad: {
        id: string,
        nombreLocalidad: string
    }
}

interface INewVehicleFormData {
    marca: string
    modelo: string
    transmision: string
    año: string
    capacidad: number
    image: Blob | null
    tipoVehiculo: number
    sucursal: number
}

const NewVehicleForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [vehicleTypes, setVehicleTypes] = useState<SelectMenuItem[]>()
    const [officeLocations, setOfficeLocations] = useState<SelectMenuItem[]>()
    const [formData, setFormData] = useState<INewVehicleFormData>({
        marca: "",
        modelo: "",
        transmision: transmisions.at(0)?.descripcion || 'Automático',
        año: "",
        capacidad: seatings.at(0)?.id || 4,
        image: null,
        tipoVehiculo: 0,
        sucursal: 0
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData, [name]: value }

            // enableButton(newFormData, emailError, passwordError, repeatPasswordError)
            return newFormData
        });
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFormData((prevFormData) => ({ ...prevFormData, image: files[0] }))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vehicleTypes = await getVehicleTypesOptions()
                setVehicleTypes(vehicleTypes)

                const locations = await getBranchOptions()
                setOfficeLocations(locations)

                if (vehicleTypes.length >= 1 && locations.length >= 1) {
                    setFormData({
                        ...formData,
                        sucursal: locations.at(0)?.id || 1,
                        tipoVehiculo: vehicleTypes.at(0)?.id || 1
                    })
                }
                setIsLoading(false)
            } catch (error: any) {
                handleError(error)
                router.replace('/')
            }
        };

        fetchData()
            .then(() => {
                setIsLoading(false)
            })
    }, [])

    const add = async () => {
        try {
            apiClient.post('/vehicle', formData)
                .then((res) => {
                    if (confirm("Vehículo cargado correctamente, ¿desea cargar otro?")) {
                        cleanFields()
                    } else {
                        router.push('/home')
                    }
                })

        } catch (error: any) {
            alert("Error al cargar vehículo")
            console.error("Error:", error.message);
        }
    };

    const cleanFields = () => {
        setFormData({
            marca: "",
            modelo: "",
            transmision: "",
            año: "",
            capacidad: seatings.at(0)?.id || 1,
            image: null,
            tipoVehiculo: 1,
            sucursal: 1
        })
    };


    return (
        <LoadableScreen isLoading={isLoading}>
            <div className="flex flex-col items-center p-8 gap-8" >
                <span className='w-full text-4xl font-extralight'>Agregar vehículo</span>
                <form className="grid gap-6"
                    onSubmit={(event) => {
                        event.preventDefault();
                        add();
                    }}>
                    <TextField
                        type="text"
                        name="marca"
                        label="Marca"
                        value={formData.marca}
                        onChange={handleInputChange}
                    />

                    <TextField
                        type="text"
                        name="modelo"
                        label="Modelo"
                        value={formData.modelo}
                        onChange={handleInputChange}
                    />
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
                        {transmisions?.map(t => <MenuItem key={t.id} value={t.descripcion}>{t.descripcion == 'AT' ? 'Automático' : 'Manual'}</MenuItem>)}
                    </TextField>
                    <TextField
                        name="capacidad"
                        label='Capacidad'
                        select
                        value={formData.capacidad}
                        onChange={handleInputChange}
                    >
                        {seatings?.map(s => <MenuItem key={s.id} value={s.id}>{s.descripcion}</MenuItem>)}
                    </TextField>
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
                        {vehicleTypes?.map(t => <MenuItem key={t.id} value={t.id}>{t.descripcion}</MenuItem>)}
                    </TextField>

                    <TextField
                        name="sucursal"
                        label="Sucursal"
                        variant="outlined"
                        select
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={formData.sucursal}
                        onChange={handleInputChange}
                    >
                        {officeLocations?.map(t => <MenuItem key={t.id} value={t.id}>{t.descripcion}</MenuItem>)}
                    </TextField>

                    <div className="mb-4">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="image"
                        >
                            Imagen:
                        </label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 border border-slate-500 rounded-md text-slate-500 focus:outline-none focus:border-blue-500"
                            placeholder="Seleccione una imagen"
                        />
                    </div>

                    <Button
                        className="sm:col-span-2"
                        variant='outlined'
                        color="success"
                    >Agregar vehículo</Button>

                    <Button
                        className="sm:col-span-2"
                        variant='outlined'
                        color="error"
                        onClick={() => router.back()}
                    >Volver</Button>
                </form>
            </div >
        </LoadableScreen>
    );
};

export default NewVehicleForm