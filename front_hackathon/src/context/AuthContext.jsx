import {createContext, useState, useMemo} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useLocalStorage} from "../hooks/useLocalStorage"

export const AuthContext = createContext();


export default function AuthContextProvider({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false) 
    
    const navigate = useNavigate()

    const login = async (body) => {
        try{
            
            const {data} = await axios.post("http://localhost:3000/signin", body)
            console.log(data)
            localStorage.setItem("token", data.token)
            
            setIsAuthenticated(true)
            navigate("/auth/profile")

        }catch(error){
            console.error(error)
        }
    }

    const logout = () => {
        try{
            localStorage.removeItem("token")
            setIsAuthenticated(false)
            navigate("/")
        }catch(error){
            console.log(error)
        }
    }

    const register = async (body) => {
        try{
            const {data} = await axios.post("http://localhost:3000/signup", body)
            console.log(data)
        }catch(error){
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            register,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}
