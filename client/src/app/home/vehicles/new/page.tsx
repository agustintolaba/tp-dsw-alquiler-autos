"use client";
import Spinner from "@/components/Spinner";
import NewVehicleForm from "@/components/forms/NewVehiculeForm";
import useAdmin, { verifyAdmin } from "@/services/userType";
import router from "next/router";

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
