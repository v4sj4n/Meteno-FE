import * as yup from 'yup'
export const signUpSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().notRequired(),
  email: yup
    .string()
    .email('the value should be an email')
    .required('email is required'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
})

export type signUpType = yup.InferType<typeof signUpSchema>
