import { TipoUsuario, Usuario } from "@/types";
import { useEffect, useState } from "react";
import apiClient from "./api";
import { alertError } from "@/utils/errorHandling";

const useUser = () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
  const [users, setUsers] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      apiClient(true)
        .get("/usuario")
        .then((res) => {
          setIsLoadingUsers(false);
          setUsers(res.data.users);
        })
        .catch((error: any) => {
          alertError(error);
        });
    };
    fetchUsers();
  }, []);

  const remove = async (user: Usuario) => {
    apiClient(true)
      .delete(`/usuario/${user.id}`)
      .then(() => {
        setUsers((users) => users?.filter((v) => v.id != user.id));
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  const edit = (user: Usuario, newTipoUsuario: TipoUsuario) => {
    apiClient(true)
      .patch(`/usuario/${user.id}`, {
        tipoUsuario: newTipoUsuario,
      })
      .then(() => {
        setUsers((users) =>
          users.map((u) =>
            u.id === user.id ? { ...u, tipoUsuario: newTipoUsuario } : u
          )
        );
      })
      .catch((error: any) => {
        alertError(error);
      });
  };

  return { users, edit, remove, isLoadingUsers };
};

export default useUser;
