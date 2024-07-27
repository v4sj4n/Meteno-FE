import { SignOut, UserPlus, SignIn as SignInIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const pathName = useLocation().pathname
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
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Meteno
        </Link>
      </div>
      <div>
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-30 p-2 shadow bg-base-300 rounded-box w-32  space-y-1 "
            >
              {elementsToDisplay.map((element, index) => (
                <li key={index}>
                  {element.location !== '' ? (
                    <Link
                      className={
                        element.location === pathName ? 'font-bold' : ''
                      }
                      to={element.location}
                      onClick={closeMenu}
                    >
                      {element.title === 'Sign In' ? (
                        <SignInIcon />
                      ) : element.title === 'Sign Up' ? (
                        <UserPlus />
                      ) : (
                        ''
                      )}
                      {element.title}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        logOut()
                        closeMenu()
                      }}
                    >
                      {element.title}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ul className="menu menu-horizontal px-1 hidden md:flex">
          {elementsToDisplay.map((element, index) => (
            <li key={index}>
              {element.location !== '' ? (
                <Link
                  className={element.location === pathName ? 'font-bold' : ''}
                  to={element.location}
                >
                  {element.title}
                </Link>
              ) : (
                <button className="flex" onClick={logOut}>
                  {element.title}
                  <SignOut />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
