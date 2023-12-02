"use client";
import LoadableScreen from "@/components/LoadableScreen";
import UsersList from "@/components/lists/UsersList";
import useUser from "@/services/user";
import useAdmin from "@/services/userType";
import { NO_ACCESS } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Users = () => {
  const router = useRouter();
  const { isAdmin, isLoadingAdmin } = useAdmin();
  const { users, edit, remove, isLoadingUsers } = useUser();

  if (isAdmin == false) {
    alert(NO_ACCESS);
    router.replace("/home");
    return;
  }

  return (
    <div className="w-full flex flex-col items-center p-2 gap-8">
      <div className="w-full flex justify-center p-6 md:justify-start">
        <span className="text-4xl font-extralight text-center">
          Administración de usuarios
        </span>
      </div>
      <LoadableScreen isLoading={isLoadingAdmin || isLoadingUsers}>
        <UsersList users={users} edit={edit} remove={remove} />
      </LoadableScreen>
      <footer className="absolute flex items-center justify-center bottom-0 w-full py-4 px-2 bg-slate-700">
        <span className="text-sm text-center text-yellow-400 sm:text-md">
          Para cambiar el tipo de usuario, presione el tipo de usuario actual y
          confirme
        </span>
      </footer>
    </div>
  );
};

export default Users;
