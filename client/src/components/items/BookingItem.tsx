import { Reserva, Usuario, Vehiculo } from '@/types';
import { formatAPIDate } from '@/utils/dateFormatter';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import BookingStateButton from '../buttons/BookingStateButton';

interface BookingItemProps {
  reserva: Reserva;
}

const BookingItem: React.FC<BookingItemProps> = ({ reserva }) => {
  const handleChangeStateClick = (newState: string) => {
    console.log(newState);
  };

  return (
    <Box className="flex flex-row w-full flex-wrap justify-center items-center rounded-md bg-slate-700 p-4 gap-4 md:justify-between">
      <Box className="flex flex-wrap gap-4">
        <Image
          src={reserva.vehiculo.image}
          width={128}
          height={128}
          alt="vehículo"
          className="rounded-md object-contain"
        />
        <Box className="flex flex-col flex-wrap justify-evenly">
          <BookingDetail label="ID" value={reserva.id.toString()} />
          <BookingDetail
            label="Usuario"
            value={`${reserva.usuario.nombre} ${reserva.usuario.apellido}`}
          />
        </Box>
        <Box className="flex flex-col justify-evenly">
          <BookingDetail
            label="Fecha de realización"
            value={formatAPIDate(reserva.fechaRealizacion)}
          />
          <BookingDetail
            label="Fecha desde"
            value={formatAPIDate(reserva.fechaDesde)}
          />
          <BookingDetail
            label="Fecha hasta"
            value={formatAPIDate(reserva.fechaHasta)}
          />
        </Box>
      </Box>
      <BookingStateButton
        estado={reserva.estado}
        onChangeStateClick={handleChangeStateClick}
      />
    </Box>
  );
};

interface BookingDetailProps {
  label: string;
  value: string;
}

const BookingDetail: React.FC<BookingDetailProps> = ({ label, value }) => {
  return (
    <Box className="flex flex-row gap-1">
      <Typography variant="subtitle1" fontWeight="bold">
        {label}:
      </Typography>
      <Typography variant="subtitle1" fontWeight="light">
        {value}
      </Typography>
    </Box>
  );
};

export default BookingItem;
