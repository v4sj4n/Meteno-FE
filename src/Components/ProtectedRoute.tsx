import { backendDir } from '@/Constants'
import axios from 'axios'
import { useEffect, useState, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsAuthenticated(false)
        return
      }

      try {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, 1200)
        })
        await axios.get(`${backendDir}/auth/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Authentication error:', error)
        setIsAuthenticated(false)
      }
    }

    verifyUser()
  }, [token])

  if (isAuthenticated === null) {
    return (
      <main className="grid justify-center items-center h-[88svh]">
        <span className="loading loading-dots loading-lg"></span>
      </main>
    )
  }

  if (!isAuthenticated) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return <Navigate to="/auth/sign-in" />
  }

  return children
}
