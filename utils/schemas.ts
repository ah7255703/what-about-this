import * as yup from "yup";
export const emailSchema = yup.string().email('Enter Valid Email')
export const passwordShcema = yup.string().min(8, 'password should be 8 characters minimum')
export const nameSchema = yup.string().min(5).required();

export const loginSchema = yup.object({
    email: emailSchema,
    password: passwordShcema
}).required();


export const registerSchema = yup.object({
    email: emailSchema,
    password: passwordShcema,
    name:nameSchema
}).required();
