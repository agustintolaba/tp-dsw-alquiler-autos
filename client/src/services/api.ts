import axios from "axios";
import { API_BASE_URL, TOKEN_STORAGE_KEY } from "../utils/constants";

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
    baseURL: API_BASE_URL,
    headers: headers,
  });

  return client
};

export default apiClient;
