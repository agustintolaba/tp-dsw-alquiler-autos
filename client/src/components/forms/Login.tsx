"use client";
import apiClient from "@/services/api";
import { TOKEN_STORAGE_KEY } from "@/utils/constants";
import { emailValidator, passwordValidator } from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadableScreen from "../LoadableScreen";
import { alertError } from "@/utils/alerts";
import Swal from "sweetalert2";

export interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      let emailError = emailValidator(newFormData.email);
      let passwordError = passwordValidator(newFormData.password);
      setFormErrors({
        email: emailError,
        password: passwordError,
      });
      enableButton(newFormData, emailError, passwordError);
      return newFormData;
    });
  };

  const enableButton = (
    newFormData: LoginFormData,
    emailError: string,
    passwordError: string
  ) => {
    const enabled =
      newFormData.email.length > 0 &&
      newFormData.password.length > 0 &&
      emailError.length == 0 &&
      passwordError.length == 0;
    setButtonEnabled(enabled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    login(formData);
  };

  const login = (data: LoginFormData) => {
    apiClient()
      .post("usuario/login", data)
      .then((response) => {
        const token = response.data.token;
        if (!token) {
          Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error",
            text: "Contacta al administrador",
          });
          return;
        }
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
        router.push("/home");
      })
      .catch((error: Error | AxiosError) => {
        alertError(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <LoadableScreen isLoading={isLoading}>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
        <TextField
          className=""
          name="email"
          label="E-mail"
          variant="outlined"
          fullWidth
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email.length > 0}
          helperText={formErrors.email}
        />
        <TextField
          name="password"
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleInputChange}
          error={formErrors.password.length > 0}
          helperText={formErrors.password}
        />
        <Button
          variant="outlined"
          color="success"
          disabled={!buttonEnabled}
          type="submit"
        >
          Iniciar sesión
        </Button>
      </form>
    </LoadableScreen>
  );
};

export default Login;
