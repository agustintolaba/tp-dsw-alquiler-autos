'use client';
import { SelectMenuItem } from "@/types";
import { alertError } from "@/utils/errorHandling";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
import LoadableScreen from "./LoadableScreen";
import { Button, MenuItem, TextField } from "@mui/material";
import { getBranchOptions } from "@/services/branch";
import apiClient from "@/services/api";
import { verifyAdmin } from "@/services/user";
import { NO_ACCESS, seatings, transmisions } from "@/utils/constants";
import VehicleTypesSelectField from "./VehicleTypesSelectField";

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

const emptyVehicleForm = {
    marca: "",
    modelo: "",
    transmision: transmisions.at(0)?.descripcion || 'Automático',
    año: "",
    capacidad: seatings.at(0)?.id || 1,
    image: null,
    tipoVehiculo: 1,
    sucursal: 1
}

const NewVehicleForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [buttonEnabled, setButtonEnabled] = useState<boolean>(false)
    const [officeLocations, setOfficeLocations] = useState<SelectMenuItem[]>()
    const [formData, setFormData] = useState<INewVehicleFormData>(emptyVehicleForm)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isAdmin = await verifyAdmin()
                if (!isAdmin) {
                    alert(NO_ACCESS)
                    router.replace('/home')
                }
                const locations = await getBranchOptions()
                setOfficeLocations(locations)

                if (locations.length >= 1) {
                    setFormData({
                        ...formData,
                        sucursal: locations.at(0)?.id || 0
                    })
                }
                setIsLoading(false)
            } catch (error: any) {
                alertError(error)
                router.replace('/')
            }
        };

        fetchData()
            .then(() => {
                setIsLoading(false)
            })
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData, [name]: value }

            enableButton(newFormData)
            return newFormData
        });
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFormData((prevFormData) => {
                const newFormData = { ...prevFormData, image: files[0] }
                console.log(newFormData)
                enableButton(newFormData)

                return newFormData
            })
        }
    }

    const enableButton = (formData: INewVehicleFormData) => {
        const someFieldIsEmpty = formData.marca.length == 0
            || formData.modelo.length == 0
            || formData.image == null

        if (someFieldIsEmpty) {
            setButtonEnabled(false)
            return
        }

        setButtonEnabled(true)
    }

    const add = async () => {
        apiClient.post('/vehiculo', formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
            .then((res) => {
                if (confirm("Vehículo cargado correctamente, ¿desea cargar otro?")) {
                    cleanFields()
                } else {
                    router.push('/home')
                }
            })
            .catch((error: any) => {
                alertError(error)
            })
    }

    const cleanFields = () => {
        setFormData(emptyVehicleForm)
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

                    <VehicleTypesSelectField value={formData.tipoVehiculo} onChange={handleInputChange} />

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
                        disabled={!buttonEnabled}
                        type="submit"
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