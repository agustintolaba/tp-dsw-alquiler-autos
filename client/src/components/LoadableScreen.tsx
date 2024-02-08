import React, { ReactNode } from "react"
import { CircularProgress } from "@mui/material"

interface LoadableScreenProps {
    children: ReactNode,
    isLoading: boolean
}

const LoadableScreen: React.FC<LoadableScreenProps> = ({ children, isLoading }) => {
    if (isLoading) {
        return (
            <div className="relative flex items-center justify-center w-screen h-screen">
                <CircularProgress />
            </div>
        )
    }

    return children
}

export default LoadableScreen