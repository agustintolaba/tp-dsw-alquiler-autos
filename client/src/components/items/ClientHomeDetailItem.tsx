import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { TipoVehiculo } from "@/types";

export interface HomeDetailItemProps {
  vehicleType: TipoVehiculo;
}

const HomeDetailItem: React.FC<HomeDetailItemProps> = ({ vehicleType }) => {
  const { id, nombre, descripcion, precio } = vehicleType;
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-6 pt-8 pb-4 px-4 rounded-2xl bg-slate-900 lg:px-8">
      <div className="flex flex-col justify-end items-center gap-6 sm:items-end">
        <div className="flex flex-col items-start gap-2 text-white">
          <span className="font-bold text-2xl tracking-wider">{nombre}</span>
          <div className="flex flex-row gap-4 text-white">
            <div className="flex flex-row gap-1 justify-center items-center">
              <span>Precio por dia: $ {precio}</span>
            </div>
          </div>
          <span className="font-light text-sm text-justify max-w-lg">
            {descripcion}
          </span>
        </div>
        <Link href={`home/vehicles?vehicleType=${id}`}>
          <Button variant="outlined" color="success">
            Ver vehiculos disponibles
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeDetailItem;
