import { Box, Button, Typography } from '@mui/material';
interface BookingStateButtonProps {
  estado: string;
  onChangeStateClick: (newState: string) => void;
}
const BookingStateButton: React.FC<BookingStateButtonProps> = ({
  estado,
  onChangeStateClick,
}) => {
  let nextState = '';
  switch (estado.toLowerCase()) {
    case 'realizada': {
      nextState += 'iniciada';
      break;
    }
    case 'iniciada': {
      nextState += 'finalizada';
      break;
    }
    default: {
      break;
    }
  }

  if (estado.toLowerCase() === 'cancelada') {
    return (
      <Typography color="error" variant="subtitle1">
        Cancelada
      </Typography>
    );
  }

  return (
    <Button
      onClick={() => onChangeStateClick(nextState)}
      variant="outlined"
      color="success"
    >
      {`Pasar a ${nextState}`}
    </Button>
  );
};

export default BookingStateButton;
