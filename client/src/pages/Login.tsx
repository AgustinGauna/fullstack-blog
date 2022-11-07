import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import { UserContextType } from '../context/types'

const Login = () => {


    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState<null | string>(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext) as UserContextType


    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await login(inputs)
            navigate("/");
        } catch (err: any) {
            setError(err.response.data)
        }
    };

    return (
        <div className='auth'>
            <h1>Login</h1>
            <form action="">
                <input required type="text" placeholder='username' name="username" onChange={handleChange} />
                <input required type="password" placeholder='password' name="password" onChange={handleChange} />
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span>Don't you have an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    )
}

export default Login