'use client';

import { useRouter } from "next/navigation";
import ClientHomePage from "../../components/ClientHomePage";
import useUser, { verifyAdmin } from "@/services/user";
import LoadableScreen from "@/components/LoadableScreen";
import { Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { isAdmin, isLoading } = useUser();

  if (isAdmin == null) return (
    <Typography variant="h4">No se pudo verificar tipo de usuario</Typography>
  )

  return (
    <LoadableScreen isLoading={isLoading}>
      {(isAdmin && <h1>Empleado</h1>) || <ClientHomePage />}
    </LoadableScreen>
  );
}
