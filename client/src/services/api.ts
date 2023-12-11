import axios from "axios";
import { TOKEN_STORAGE_KEY } from "../utils/constants";

const apiClient = (requiresAuthorization: boolean = false) => {
  let headers: { [key: string]: string } = {
    "Content-type": "application/json",
  };

  if (requiresAuthorization) {
    headers = {
      ...headers,
      Authorization: localStorage.getItem(TOKEN_STORAGE_KEY) || "",
    };
  }

  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: headers,
  });

  return client
};

export default apiClient;
