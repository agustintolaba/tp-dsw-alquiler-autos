'use client'
import LoadableScreen from "@/components/LoadableScreen";
import apiClient from "@/services/api";
import { SelectMenuItem, TipoVehiculo } from "@/types";
import { MAX_WORKING_HOUR, NINE_AM, transmisions } from "@/utils/constants";
import { alertError } from "@/utils/errorHandling";
import { disableNotWorkingTime, getDateError } from "@/utils/validators";
import { Button, MenuItem, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import 'dayjs/locale/en-gb';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getVehicleTypesOptions } from "@/services/vehicleTypes";

interface IBookingFormData {
    fechaDesde: Dayjs;
    fechaHasta: Dayjs;
    transmision: string;
    tipoVehiculo: number
}

const getBookingDateDefaultValue = (isDateFrom: boolean): Dayjs => {
    const isLateForToday = dayjs().hour() > MAX_WORKING_HOUR
    if (isLateForToday) return isDateFrom ? NINE_AM.add(1, 'day') : NINE_AM.add(2, 'day')

    return isDateFrom ? dayjs().add(1, 'day') : dayjs().add(2, 'day')
}

const CreateBooking = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [buttonEnabled, setButtonEnabled] = useState(false)
    const [vehicleTypes, setVehicleTypes] = useState<SelectMenuItem[]>()
    const [dateFromError, setDateFromError] = useState<string | null>()
    const [dateToError, setDateToError] = useState<string>("")
    const [formData, setFormData] = useState<IBookingFormData>({
        fechaDesde: getBookingDateDefaultValue(true),
        fechaHasta: getBookingDateDefaultValue(false),
        transmision: "AT",
        tipoVehiculo: 1
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const types = await getVehicleTypesOptions()
                setVehicleTypes(types)
                const firstItem = types.at(0)
                if (firstItem) {
                    setFormData({
                        ...formData,
                        tipoVehiculo: firstItem.id
                    })
                }
                setIsLoading(false)
            } catch (error: any) {
                alertError(error)
                router.replace('/')
            }
        }
        fetchData()
        enableButton(formData)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData, [name]: value }
            enableButton(newFormData)
            return newFormData
        });
    };

    const enableButton = (formData: IBookingFormData) => {
        const enabled = formData.fechaDesde.isValid() && formData.fechaHasta.isValid()
        setButtonEnabled(enabled)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        apiClient.get(`/vehiculo/getAvailables?fecha_desde='${formData.fechaDesde.toISOString()}'&fecha_hasta='${formData.fechaHasta.toISOString()}'&transmision='${formData.transmision}'&tipo_vehiculo='${formData.tipoVehiculo}'`)
            .then((res) => {
                console.log(res.data.vehicles)
            })
            .catch((error: any) => {
                console.log(error)
            })
    };

    const onDateChange = (value: Dayjs | null, isDateFrom: boolean) => {
        let error = ""
        if (!value) {
            error = 'La fecha no puede estar vacía'
            return
        }

        if (isDateFrom) {
            setFormData((prevFormData) => {
                const fechaHasta = value.diff(prevFormData.fechaHasta) > 0 ? value.add(1, 'day') : prevFormData.fechaHasta
                return {
                    ...prevFormData,
                    fechaDesde: value,
                    fechaHasta: fechaHasta
                }
            })
            setDateFromError(error)
        } else {
            setFormData((prevFormData) => {
                const newFormData = { ...prevFormData, fechaHasta: value }
                enableButton(newFormData)
                return newFormData
            })
            setDateToError(error)
        }
    }

    return (
        <LoadableScreen isLoading={isLoading}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <div className="flex flex-col items-center p-8 gap-8" >
                    <span className='w-full text-4xl font-extralight'>Elija sus preferencias</span>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <DateTimePicker
                            label="Fecha de retiro"
                            onError={(error) => setDateFromError(error ? error : "")}
                            slotProps={{
                                textField: {
                                    helperText: getDateError(dateFromError),
                                },
                            }}
                            ampm={false}
                            disablePast
                            value={formData.fechaDesde}
                            shouldDisableTime={disableNotWorkingTime}
                            onChange={(value) => onDateChange(value, true)}
                        />
                        <DateTimePicker
                            label="Fecha de devolución"
                            onError={(error) => setDateToError(error ? error : "")}
                            slotProps={{
                                textField: {
                                    helperText: getDateError(dateToError),
                                },
                            }}
                            ampm={false}
                            value={formData.fechaHasta}
                            disablePast
                            minDateTime={formData.fechaDesde.add(1, 'day')}
                            shouldDisableTime={disableNotWorkingTime}
                            onChange={(value) => onDateChange(value, false)}
                        />
                        <span className="text-md font-light sm:col-span-2">Total de días: <span className="font-bold">{formData.fechaHasta.diff(formData.fechaDesde, 'days')}</span></span>
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

                        <Button
                            className="sm:col-span-2"
                            variant='outlined'
                            color='success'
                            disabled={!buttonEnabled}
                            type="submit"
                        >Ver vehículos disponibles</Button>

                        <Button
                            className="sm:col-span-2"
                            variant='outlined'
                            color='error'
                            onClick={() => history.back()}
                        >Volver</Button>

                    </form>
                </div >
            </LocalizationProvider>
        </LoadableScreen>
    )
}

export default CreateBooking