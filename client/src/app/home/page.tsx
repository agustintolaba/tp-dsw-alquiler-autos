"use client";

import ClientHomePage from "../../components/ClientHomePage";
import useAdmin, { verifyAdmin } from "@/services/userType";
import LoadableScreen from "@/components/LoadableScreen";
import AdminHomePage from "@/components/AdminHomePage";

export default function Home() {
  const { isAdmin, isLoadingAdmin } = useAdmin();

  return (
    <LoadableScreen isLoading={isLoadingAdmin}>
      {(isAdmin && <AdminHomePage />) || <ClientHomePage />}
    </LoadableScreen>
  );
}
