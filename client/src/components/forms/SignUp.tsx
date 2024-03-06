"use client";
import apiClient from "@/services/api";
import { alertError } from "@/utils/alerts";
import { TOKEN_STORAGE_KEY } from "@/utils/constants";
import {
  emailValidator,
  passwordValidator,
  repeatPasswordValidator,
} from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios, { AxiosError } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

interface IUserRegisterFormData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  repeatPassword: string;
  fechaNacimiento: Dayjs;
  numeroDocumento: string;
  telefono: string;
}
interface IUserRegisterFormErrors {
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUp: React.FC = ({}) => {
  const router = useRouter();
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);

  const [formData, setFormData] = useState<IUserRegisterFormData>({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    repeatPassword: "",
    fechaNacimiento: dayjs().subtract(18, "years"),
    numeroDocumento: "",
    telefono: "",
  });
  const [formErrors, setFormErrors] = useState<IUserRegisterFormErrors>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      let emailError = emailValidator(newFormData.email);
      let passwordError = passwordValidator(newFormData.password);
      let repeatPasswordError = repeatPasswordValidator(
        newFormData.password,
        newFormData.repeatPassword
      );

      setFormErrors({
        email: emailError,
        password: passwordError,
        repeatPassword: repeatPasswordError,
      });
      enableButton(newFormData, emailError, passwordError, repeatPasswordError);
      return newFormData;
    });
  };

  const signUp = (data: IUserRegisterFormData) => {
    apiClient()
      .post("usuario/signup", {
        ...formData,
        fechaNacimiento: formData.fechaNacimiento.toISOString(),
      })
      .then(() => {
        Swal.fire({
          title: "¡Bienvenido!",
          text: "Ya puede iniciar sesión",
          icon: "success",
          confirmButtonColor: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      })
      .catch((error: Error | AxiosError) => {
        alertError(error);
      });
  };

  const onDateChange = (value: Dayjs | null) => {
    if (!value) {
      setFormErrors((prevFormData) => {
        const newFormData = {
          ...prevFormData,
          fechaNacimiento: "La fecha no puede estar vacía",
        };
        return newFormData;
      });
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      fechaNacimiento: value,
    }));
  };

  const enableButton = (
    newFormData: IUserRegisterFormData,
    emailError: string,
    passwordError: string,
    repeatPasswordError: string
  ) => {
    const someFieldIsEmpty =
      newFormData.nombre.length == 0 ||
      newFormData.apellido.length == 0 ||
      newFormData.email.length == 0 ||
      newFormData.password.length == 0 ||
      newFormData.repeatPassword.length == 0 ||
      newFormData.fechaNacimiento.toString().length == 0 ||
      newFormData.numeroDocumento.length == 0 ||
      newFormData.telefono.length == 0;

    if (someFieldIsEmpty) {
      setButtonEnabled(false);
      return;
    }

    const enabled =
      emailError.length == 0 &&
      passwordError.length == 0 &&
      repeatPasswordError.length == 0;
    setButtonEnabled(enabled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full gap-6 grid sm:grid-cols-2"
      >
        <TextField
          name="nombre"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={formData.nombre}
          onChange={handleInputChange}
        />
        <TextField
          name="apellido"
          label="Apellido"
          variant="outlined"
          fullWidth
          value={formData.apellido}
          onChange={handleInputChange}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email.length > 0}
          helperText={formErrors.email}
        />
        <TextField
          name="numeroDocumento"
          label="Número de documento"
          type="number"
          variant="outlined"
          fullWidth
          value={formData.numeroDocumento}
          onChange={handleInputChange}
        />
        <TextField
          name="telefono"
          label="Número de teléfono"
          variant="outlined"
          type="number"
          fullWidth
          value={formData.telefono}
          onChange={handleInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha de nacimiento"
            minDate={dayjs().subtract(80, "years")}
            maxDate={dayjs().subtract(18, "years")}
            onChange={onDateChange}
          />
        </LocalizationProvider>
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

        <TextField
          name="repeatPassword"
          label="Repetir contraseña"
          variant="outlined"
          type="password"
          fullWidth
          value={formData.repeatPassword}
          onChange={handleInputChange}
          error={formErrors.repeatPassword.length > 0}
          helperText={formErrors.repeatPassword}
        />
        <Button
          className="sm:col-span-2"
          variant="outlined"
          color="success"
          disabled={!buttonEnabled}
          type="submit"
        >
          Crear cuenta
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
