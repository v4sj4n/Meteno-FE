import { backendDir } from '@/Constants'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      alert('Passwords do not match')
      return
    }
    try {
      const res = await axios.post(`${backendDir}/auth/signup`, {
        firstName,
        lastName,
        email,
        username,
        password,
      })
      if (res.status !== 201) {
        if (
          res.data.message.includes('username') ||
          res.data.message.includes('email')
        ) {
          setError('Username or Email is already taken')
        } else {
          setError(res.data.message)
        }
      } else {
        navigate('/auth/login')
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
    <main className="w-full h-screen flex justify-center items-center flex-col gap-8 bg-zinc-700 ">
      <h1 className="text-5xl font-bold text-zinc-200">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="w-3/4 md:3/5 lg:w-2/5 bg-slate-200 p-4 rounded-lg space-y-3"
      >
        <input
          type="text"
          placeholder="first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 rounded-md text-lg"
          required
        />
        <input
          type="text"
          placeholder="last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 rounded-md text-lg"
          required
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded-md text-lg"
          required
        />
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
        <input
          type="password"
          placeholder="confirm password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full p-2 rounded-md text-lg"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          required
        />
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-between items-center">
          <button className="bg-green-300 px-4 py-2 rounded-md">Sign Up</button>
          <p>
            Already have an account? <a href="/auth/login">Log In</a>
          </p>
        </div>
      </form>
    </main>
  )
}
