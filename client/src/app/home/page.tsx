"use client";

import { useRouter } from "next/navigation";
import ClientHomePage from "../../components/ClientHomePage";
import useUser, { verifyAdmin } from "@/services/user";
import LoadableScreen from "@/components/LoadableScreen";
import { Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { isAdmin, isLoadingUser } = useUser();

  return (
    <LoadableScreen isLoading={isLoadingUser}>
      {(isAdmin && <h1>Empleado</h1>) || <ClientHomePage />}
    </LoadableScreen>
  );
}
