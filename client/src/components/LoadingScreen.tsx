import { CircularProgress } from "@mui/material"

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <CircularProgress />
        </div>
    )
}

export default LoadingScreen