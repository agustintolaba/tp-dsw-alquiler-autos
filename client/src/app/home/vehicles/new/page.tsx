"use client";
import LoadableScreen from "@/components/LoadableScreen";
import Spinner from "@/components/Spinner";
import NewVehicleForm from "@/components/forms/NewVehiculeForm";
import useAdmin, { verifyAdmin } from "@/services/userType";
import { NO_ACCESS } from "@/utils/constants";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";

const NewVehicle: React.FC = () => {
  const { isAdmin, isLoadingAdmin } = useAdmin();

  if (isLoadingAdmin) {
    return <Spinner />;
  }
  if (!isAdmin) {
    router.push(`/error?name=noAccess`);
  }
  return <NewVehicleForm />;
};

export default NewVehicle;
