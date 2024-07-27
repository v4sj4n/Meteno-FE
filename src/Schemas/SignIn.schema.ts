import * as yup from 'yup'
export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('the value should be an email')
    .required('email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('password is required'),
})

export type signInType = yup.InferType<typeof signInSchema>
