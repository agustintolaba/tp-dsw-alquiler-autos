import { PASSWORD_LENGHT_ERROR, PASSWORDS_NOT_MATCH_ERROR } from "./constants";

export const emailValidator = (email: string) => {
    console.log(`email: ${email}`)
    if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return "Formato de email incorrecto";
    }
    return "";
};

export const passwordValidator = (password: string) => {
    console.log(`password: ${password}`)
    if (password.length > 0 && password.length < 8) {
        return PASSWORD_LENGHT_ERROR
    } else {
        return ""
    }
};

export const confirmPasswordValidator = (password: string, confirmPassword: string) => {
    console.log(`password: ${password}`)
    console.log(`confirmPassword: ${confirmPassword}`)
    if (confirmPassword.length == 0) {
        return ""
    } else if (confirmPassword.length < 8) {
        return PASSWORD_LENGHT_ERROR
    } else if (password !== confirmPassword) {
        return PASSWORDS_NOT_MATCH_ERROR
    }
};