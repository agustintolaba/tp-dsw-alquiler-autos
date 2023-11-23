'use client'
import { Error } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"

const ErrorScreen: React.FC = () => {
    const router = useRouter()
    const params = useSearchParams()

    return (
        <div className="w-full pt-8 flex flex-col items-center justify-center gap-6">
            <Error sx={{ fontSize: '60px', color: '#ef5350' }} />

            <span className="text-2xl font-bold">Ha ocurrido un error</span>

            <span className="text-xl font-extralight">{params.get('description')}</span>

            <Button
                variant='outlined'
                color="error"
                onClick={() => router.replace('/home')}
            >Ir al inicio</Button>

            <Button
                variant='outlined'
                color="warning"
                onClick={() => router.replace('/')}
            >Iniciar sesión</Button>
        </div>
    )
}

export default ErrorScreen