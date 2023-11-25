/*Para crear el componente de vehiculo*/
'use client';
import { Vehiculo } from '@/types';
import { transmisionDescriptions } from '@/utils/constants';
import { Person } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from 'next/image';

interface VehicleListItemProps {
  isAdmin: boolean;
  isBooking: boolean;
  vehicle: Vehiculo;
}

const VehicleListItem: React.FC<VehicleListItemProps> = ({
  isAdmin = false,
  isBooking = false,
  vehicle,
}) => {
  const { id, image, marca, modelo, capacidad, transmision } = vehicle;
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-6 p-6 rounded-2xl bg-slate-900">
      <Image
        src={image}
        alt={'vehiculo'}
        width={280}
        height={280}
        className="object-contain"
      />
      <div className="flex flex-col justify-end items-center gap-6 sm:items-end">
        <div className="flex flex-col items-start gap-4 text-white">
          <span className="font-bold text-2xl tracking-wider">
            {marca} {modelo}
          </span>
          <div className="flex flex-col items-start gap-2 text-white">
            <div className="flex flex-row gap-1 justify-center items-center">
              <span className="font-semibold">Capacidad: </span>
              <span className="flex items-center gap-1">
                {capacidad} <Person fontSize="small" />
              </span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-1 justify-center items-center">
            <span className="font-semibold">Transmisión:</span>
            <span className="">{transmisionDescriptions[transmision]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleListItem;
