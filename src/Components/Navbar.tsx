import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const elementsToDisplay = token
    ? [
        { title: 'Dashboard', location: '/dashboard' },
        { title: 'Profile', location: '/my-profile' },
        { title: 'Logout', location: '' },
      ]
    : [
        { title: 'Sign In', location: '/auth/sign-in' },
        { title: 'Sign Up', location: '/auth/sign-up' },
      ]

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="w-full bg-accent flex justify-between items-center px-4 py-2 md:px-16 md:py-6 uppercase font-thin  relative">
      <h3 className="text-2xl md:text-3xl text-accent-content font-bold">
        <Link to="/"> Meteno</Link>
      </h3>
      <button className="md:hidden block" onClick={toggleMenu} aria-label="Toggle menu">
        &#9776;
      </button>
      <ul className="md:flex gap-4 hidden">
        {elementsToDisplay.map(({ title, location }) => (
          <li key={title} className='text-primary-content'>
            <Link
              to={location}
              className="hover:underline font-medium"
              onClick={() => {
                if (title === 'Logout') {
                  logOut()
                }
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-zinc-800 flex flex-col items-center py-8 md:hidden">
          <button className="self-end font-extrabold mr-8 text-2xl" onClick={closeMenu} aria-label="Close menu">
            &times;
          </button>
          <ul className="flex flex-col gap-4 mt-8">
            {elementsToDisplay.map(({ title, location }) => (
              <li key={title} className="hover:text-opacity-75 text-primary">
                <Link
                  to={location}
                  className='text-primary'
                  onClick={() => {
                    if (title === 'Logout') {
                      logOut()
                    }
                  }}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
