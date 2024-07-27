import { yupResolver } from '@hookform/resolvers/yup'
import { FullInput } from '@/Components/Inputs/FormInputs'
import { TokenAxios } from '@/utils/AxiosInstances'
import { Password } from '@phosphor-icons/react'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  changePasswordType,
  passwordChangeSchema,
} from '@/Schemas/PasswordChange.schema'
import { ErrorMsgForm } from '@/utils/ErrorMsgForm'
export function ChangePassword() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(passwordChangeSchema),
  })

  const onSubmitHandler = async (data: changePasswordType) => {
    try {
      const res = await TokenAxios.patch(`/auth/update-password`, {
        ...data,
        newPassword: data.newPasswordConfirm,
      })
      if (res.status === 200) {
        navigate('/dashboard')
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data)
        setError('root', {
          message: err.response?.data?.message,
        })
      } else {
        setError('root', {
          message: 'An error occurred while trying to sign in',
        })
      }
    }
  }

  return (
    <main className="w-full mt-8 md:mt-20 lg:mt-36 flex justify-center items-center flex-col gap-4 md:gap-8 ">
      <h1 className="text-2xl md:text-4xl font-bold">Change the Password</h1>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="mx-4 md:w-4/5 lg:w-2/5 bg-base-300 p-4 rounded-box space-y-4"
      >
        <FullInput
          icon={Password}
          type="password"
          placeholder="Old password"
          register={register}
          errors={errors}
          name="oldPassword"
        />
        <FullInput
          icon={Password}
          type="password"
          placeholder="New password"
          register={register}
          errors={errors}
          name="newPassword"
        />
        <FullInput
          icon={Password}
          type="password"
          placeholder="Confirm new password"
          register={register}
          errors={errors}
          name="newPasswordConfirm"
        />
        {errors.root && <ErrorMsgForm>{errors.root.message}</ErrorMsgForm>}

        <button
          className={`${
            isSubmitting ? 'btn-disabled' : 'btn-accent'
          } btn  px-8 w-full`}
        >
          <span
            className={`${
              isSubmitting ? 'text-accent' : ''
            } flex items-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <span className="loading  loading-spinner loading-xs text-accent"></span>
                Changing Password
              </>
            ) : (
              'Change Password'
            )}
          </span>
        </button>
      </form>
      <button onClick={goBack} className="btn  link text-right">
        Go back?
      </button>
    </main>
  )
}
