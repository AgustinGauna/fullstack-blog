import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios"
import { CurrentUser } from './types'


export const AuthContext = createContext({})

interface Props {
    children: ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(JSON.parse(localStorage.getItem("user") || 'null'))

    const login = async (inputs: any) => {
        const res = await axios.post("/api/auth/login", inputs);
        setCurrentUser(res.data)

    }
    const logout = async (inputs: any) => {
        const res = await axios.post("/api/auth/logout");
        setCurrentUser(null)

    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);



    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};