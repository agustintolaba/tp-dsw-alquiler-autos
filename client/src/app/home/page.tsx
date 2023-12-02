"use client";

import { useRouter } from "next/navigation";
import ClientHomePage from "../../components/ClientHomePage";
import useAdmin, { verifyAdmin } from "@/services/userType";
import LoadableScreen from "@/components/LoadableScreen";
import { Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { isAdmin, isLoadingAdmin: isLoadingUser } = useAdmin();

  return (
    <LoadableScreen isLoading={isLoadingUser}>
      {(isAdmin && <h1>Empleado</h1>) || <ClientHomePage />}
    </LoadableScreen>
  );
}
