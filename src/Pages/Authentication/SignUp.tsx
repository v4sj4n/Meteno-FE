// import { SimpleAxios } from '@/utils/AxiosInstances'
import { ErrorMsgForm } from '@/utils/ErrorMsgForm'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Envelope,
  IconProps,
  IdentificationBadge,
  Password,
  User,
  UserCirclePlus,
} from '@phosphor-icons/react'
// import { FormEvent, useState } from 'react'
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

export default function SignUp() {
  const schema = yup.object().shape({
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

  type signUpType = yup.InferType<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmitHandler = (data: signUpType) => {
    console.log({ data })
    reset()
  }

  // const navigate = useNavigate()

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (password !== passwordConfirm) {
  //     alert('Passwords do not match')
  //     return
  //   }
  //   try {
  //     const res = await SimpleAxios.post(`/auth/sign-up`, {
  //       firstName,
  //       lastName,
  //       email,
  //       username,
  //       password,
  //     })
  //     if (res.status !== 201) {
  //       if (
  //         res.data.message.includes('username') ||
  //         res.data.message.includes('email')
  //       ) {
  //         setError('Username or Email is already taken')
  //       } else {
  //         setError(res.data.message)
  //       }
  //     } else {
  //       navigate('/auth/log-in')
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (err: any) {
  //     if (err.response && err.response.status === 409) {
  //       setError('Username or email is already taken')
  //     } else {
  //       setError('An error occurred while trying to sign up')
  //     }
  //     console.log(err)
  //   }
  // }

  return (
    <main className="w-full mt-8 lg:mt-36 flex justify-center items-center flex-col gap-8">
      <UserCirclePlus size={48} className="" />

      <h1 className="text-5xl font-bold text-zinc-200">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="mx-4 md:w-4/5 lg:w-2/5 bg-base-300 p-4 rounded-box mb-8"
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
        {/* {error && <p className="text-red-500">{error}</p>} */}

        <div className="flex justify-between items-center">
          <button className="btn btn-accent px-8">Sign Up</button>
          <p className="">
            Already have an account?{' '}
            <Link to="/auth/sign-in" className="link link-accent">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </main>
  )
}

interface FullInputProps {
  icon: React.ComponentType<IconProps>
  type: string
  placeholder: string
  register: UseFormRegister<any>
  errors: FieldErrors
  name: string
}

const FullInput: React.FC<FullInputProps> = ({
  icon: Icon,
  type,
  placeholder,
  register,
  errors,
  name,
}) => {
  return (
    <span className="block w-full">
      <label className="input input-bordered flex items-center gap-4">
        <Icon size={20} />
        <input
          type={type}
          {...register(name)}
          className="grow"
          placeholder={placeholder}
        />
      </label>
      {errors[name] && (
        <ErrorMsgForm>{errors[name]?.message as string}</ErrorMsgForm>
      )}
    </span>
  )
}
