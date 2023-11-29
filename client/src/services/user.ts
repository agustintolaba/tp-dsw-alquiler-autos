import { TOKEN_STORAGE_KEY } from "@/utils/constants";
import apiClient from "./api";
import { useEffect, useState } from "react";
import { alertError } from "@/utils/errorHandling";
import { useRouter } from "next/navigation";

const useUser = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isAdmin = await verifyAdmin();
        setIsAdmin(isAdmin);
        setIsLoadingUser(false);
      } catch (error: any) {
        alertError(error);
        router.replace("/home");
      }
    };
    fetchData();
  }, []);

  return {
    isLoading: isLoadingUser,
    isAdmin,
  };
};

export default useUser;

export const verifyAdmin = async (): Promise<boolean> => {
  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);

  const res = await apiClient.get("/tipousuario/verifyAdmin", {
    headers: {
      Authorization: token,
    },
  });
  return res.data.admin;
};
