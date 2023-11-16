import { PASSWORD_LENGTH_ERROR, PASSWORD_MIN_LENGTH, PASSWORDS_NOT_MATCH_ERROR } from "./constants";

export const emailValidator = (email: string) => {
    if (email.length == 0) {
        return ""
    }

    if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return "Formato de email incorrecto";
    }
    
    return "";
};

export const passwordValidator = (password: string) => {
    if (password.length > 0 && password.length < PASSWORD_MIN_LENGTH) {
        return PASSWORD_LENGTH_ERROR
    }

    return ""
};

export const repeatPasswordValidator = (password: string, confirmPassword: string) => {
    if (confirmPassword.length == 0) {
        return ""
    }

    if (confirmPassword.length < PASSWORD_MIN_LENGTH) {
        return PASSWORD_LENGTH_ERROR
    }
    
    if (password !== confirmPassword) {
        return PASSWORDS_NOT_MATCH_ERROR
    }

    return ""
};