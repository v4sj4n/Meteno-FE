import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-zinc-700 flex justify-between items-center px-4 py-2 md:px-16 md:py-6 text-white relative">
      <h3 className="text-2xl">Meteno</h3>
      <button 
        className="md:hidden block" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        &#9776;
      </button>
      <ul className="md:flex gap-4 hidden">
        <li>
          <Link to="/">Home</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/my-profile">My profile</Link>
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
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-zinc-800 flex flex-col items-center py-8 md:hidden">
          <button 
            className="self-end mr-8 text-2xl" 
            onClick={closeMenu}
            aria-label="Close menu"
          >
            &times;
          </button>
          <ul className="flex flex-col gap-4 mt-8">
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <CustomHr />
            {token ? (
              <>
                <li>
                  <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                </li>
                <CustomHr />
                <li>
                  <Link to="/my-profile" onClick={closeMenu}>My profile</Link>
                </li>
                <CustomHr />
                <li>
                  <form onSubmit={(e) => { handleSubmit(e); closeMenu(); }}>
                    <button>Sign Out</button>
                  </form>
                </li>
              </>
            ) : (
              <>
              <li>
                <Link to="/auth/sign-in" onClick={closeMenu}>Sign In</Link>
              </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};


const CustomHr = () => {
  return(
    <hr className='w-8 opacity-40' />
  )

}