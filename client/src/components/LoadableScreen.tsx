import React, { ReactNode } from "react";
import { CircularProgress } from "@mui/material";
import Spinner from "./Spinner";

interface LoadableScreenProps {
  children: ReactNode;
  isLoading: boolean;
}

const LoadableScreen: React.FC<LoadableScreenProps> = ({
  children,
  isLoading,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  return children;
};

export default LoadableScreen;
