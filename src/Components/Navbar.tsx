import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('user') 
    navigate('/')
  }
  return (
    <nav className="w-full bg-zinc-700 flex  justify-between items-center px-16 py-6 text-white">
      <h3 className="text-2xl ">Meteno</h3>
      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <form onSubmit={handleSubmit}>
                <button>Sign Out</button>
              </form>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
