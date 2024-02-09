import { BookingState } from "@/utils/bookingState";
import { Box, Button, Typography } from "@mui/material";
interface BookingStatusHandlerProps {
  isAdmin?: boolean;
  estado: BookingState;
  onChangeStateClick: (isCancel: boolean) => void;
}
const BookingStatusHandler: React.FC<BookingStatusHandlerProps> = ({
  isAdmin,
  estado,
  onChangeStateClick,
}) => {
  let nextState = "";
  switch (estado) {
    case BookingState.Realizada: {
      nextState += isAdmin ? BookingState.Iniciada : BookingState.Cancelada;
      break;
    }
    case BookingState.Iniciada: {
      nextState += BookingState.Finalizada;
      break;
    }
    default: {
      break;
    }
  }

  switch (estado) {
    case BookingState.Cancelada:
    case BookingState.Finalizada:
      return (
        <Typography
          className="text-white mr-2 px-2 rounded bg-red-600"
          variant="subtitle1"
        >
          {estado}
        </Typography>
      );
    case BookingState.Realizada:
      return (
        <Button
          onClick={() =>
            onChangeStateClick(nextState == BookingState.Cancelada)
          }
          variant="outlined"
          color={nextState == BookingState.Cancelada ? "error" : "warning"}
        >
          {nextState == BookingState.Cancelada
            ? "Cancelar"
            : `Pasar a ${nextState}`}
        </Button>
      );
    case BookingState.Iniciada:
      if (isAdmin) {
        return (
          <Button
            onClick={() => onChangeStateClick(false)}
            variant="outlined"
            color={"warning"}
          >
            {`Pasar a ${nextState}`}
          </Button>
        );
      } else {
        return (
          <Typography
            className="text-black bg-green-500 px-2 rounded mr-2"
            variant="subtitle1"
          >
            {estado}
          </Typography>
        );
      }
  }
};

export default BookingStatusHandler;
