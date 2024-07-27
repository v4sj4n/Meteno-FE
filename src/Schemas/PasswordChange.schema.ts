import * as yup from 'yup'
export const passwordChangeSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, 'Your old password must be at least 8 characters long')
    .required('Old Password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
})
export type changePasswordType = yup.InferType<typeof passwordChangeSchema>
