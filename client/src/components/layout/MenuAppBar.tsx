"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import TemporaryDrawer from "./TemporaryDrawer";
import { useRouter } from "next/navigation";
import { TOKEN_STORAGE_KEY } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import useAdmin from "@/services/userType";
import Swal from "sweetalert2";
import { Logout } from "@mui/icons-material";

const MenuAppBar: React.FC = () => {
  const router = useRouter();
  const { isAdmin, isLoadingAdmin } = useAdmin();

  if (isLoadingAdmin) {
    return <></>;
  }

  const logout = () => {
    Swal.fire({
      icon: "question",
      title: "¿Desea cerrar sesión?",
      showDenyButton: true,
      confirmButtonText: "Cerrar Sesión",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        router.replace("/");
      }
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <TemporaryDrawer isAdmin={isAdmin} />
        <Link
          href="/home"
          className="flex flex-row items-center gap-4 justify-center grow opacity-50"
        >
          <span className="hidden sm:flex text-xl text-white">RUEDA</span>
          <Image
            className="invert"
            src={"/assets/images/company-logo.png"}
            alt="logo"
            width={80}
            height={80}
          />
          <span className="hidden sm:flex text-xl text-white">LIBRE</span>
        </Link>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={logout}
            color="inherit"
          >
            <Logout />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MenuAppBar;
