import { useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import {useAuth} from "../../hooks/useAuth"

export default function ProtectedRoute({children}) {

  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/sign-in")
    }
  }, [navigate, isAuthenticated])

  return children

}
