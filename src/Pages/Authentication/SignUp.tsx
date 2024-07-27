// import { SimpleAxios } from '@/utils/AxiosInstances'
import { FullInput } from '@/Components/Inputs/FormInputs'
import { signUpSchema, signUpType } from '@/Schemas/Signup.schema'
import { SimpleAxios } from '@/utils/AxiosInstances'
import { ErrorMsgForm } from '@/utils/ErrorMsgForm'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Envelope,
  IdentificationBadge,
  Password,
  User,
} from '@phosphor-icons/react'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })

  const onSubmitHandler = async (data: signUpType) => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 456)
    })
    try {
      const res = await SimpleAxios.post(`/auth/sign-up`, {...data, password: data.password })
      if (res.status === 200) {
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        navigate('/auth/sign-in')
      }
    } catch (err: unknown) {
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
      <h1 className="text-2xl md:text-4xl font-bold text-zinc-200">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="mx-4 md:w-4/5 lg:w-2/5 bg-base-300 p-4 rounded-box"
      >
        <div className="space-y-4 mt-2 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <FullInput
              icon={IdentificationBadge}
              type="text"
              placeholder="First Name"
              register={register}
              errors={errors}
              name="firstName"
            />
            <FullInput
              icon={IdentificationBadge}
              type="text"
              placeholder="Last Name"
              register={register}
              errors={errors}
              name="lastName"
            />
          </div>
          <FullInput
            icon={User}
            type="text"
            placeholder="Username"
            register={register}
            errors={errors}
            name="username"
          />
          <FullInput
            icon={Envelope}
            type="email"
            placeholder="Email"
            register={register}
            errors={errors}
            name="email"
          />
          <FullInput
            icon={Password}
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
            name="password"
          />
          <FullInput
            icon={Password}
            type="password"
            placeholder="Confirm Password"
            register={register}
            errors={errors}
            name="passwordConfirm"
          />
        </div>
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
                Signing up
              </>
            ) : (
              'Sign Up'
            )}
          </span>
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/auth/sign-in" className="link link-accent">
          Sign In
        </Link>
      </p>
    </main>
  )
}
