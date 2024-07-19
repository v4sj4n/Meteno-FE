import { SimpleAxios } from '@/utils/AxiosInstances'
import { UsersThree } from '@phosphor-icons/react'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await SimpleAxios.post(`/auth/sign-in`, {
        email,
        password,
      })
      console.log(res.data)
      if (res.status !== 200) {
        setError(res.data.message)
      } else {
        console.log(res)
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('user', JSON.stringify(res.data.user))

        navigate('/dashboard')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setError('Username or email is already taken')
      } else {
        setError('An error occurred while trying to sign up')
      }
      console.log(err)
    }
  }

  return (
    <main className="w-full mt-16 lg:mt-40 flex justify-center items-center flex-col gap-8">
      <UsersThree size={48} className="fill-zinc-200" />

      <h1 className="text-5xl font-bold text-zinc-200">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-4 md:w-3/5 lg:w-2/5 bg-slate-200 p-4 rounded-lg space-y-3"
      >
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-md text-lg"
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded-md text-lg"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          required
        />
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-between items-center">
          <button className="bg-green-300 px-4 py-2 rounded-md">Sign In</button>
          <p>
            Don't have an account?{' '}
            <Link className="hover:underline" to="/auth/sign-up">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </main>
  )
}
