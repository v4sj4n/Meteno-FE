import { FullInput } from '@/Components/Inputs/FormInputs'
import { signInSchema, signInType } from '@/Schemas/SignIn.schema'
import { SimpleAxios } from '@/utils/AxiosInstances'
import { ErrorMsgForm } from '@/utils/ErrorMsgForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { Envelope, Password } from '@phosphor-icons/react'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInSchema),
  })

  const onSubmitHandler = async (data: signInType) => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 456)
    })
    try {
      console.log({data})
      const res = await SimpleAxios.post(`/auth/sign-in`, data)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        navigate('/dashboard')
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
      <h1 className="text-2xl md:text-4xl font-bold text-zinc-200">Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="mx-4 md:w-4/5 lg:w-2/5 bg-base-300 p-4 rounded-box"
      >
        <div className="space-y-4 mt-2 mb-6">
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
          {errors.root && <ErrorMsgForm>{errors.root.message}</ErrorMsgForm>}
        </div>
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
                Signing in
              </>
            ) : (
              'Sign In'
            )}
          </span>
        </button>
      </form>
      <p className="text-sm">
        Don't have an account?{' '}
        <Link to="/auth/sign-up" className="link link-accent text-right">
          Sign Up
        </Link>
      </p>
    </main>
  )
}
