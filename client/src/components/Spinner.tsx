import { CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <div className="relative flex items-center justify-center w-screen h-screen">
      <CircularProgress />
    </div>
  );
};

export default Spinner;
