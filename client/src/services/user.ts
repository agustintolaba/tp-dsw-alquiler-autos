import { TOKEN_STORAGE_KEY } from "@/utils/constants";
import apiClient from "./api";

export const verifyAdmin = async (): Promise<boolean> => {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY)

    const res = await apiClient.get("/tipousuario/verifyAdmin", {
        headers: {
            'Authorization': token
        }
    })
    return res.data.admin
};