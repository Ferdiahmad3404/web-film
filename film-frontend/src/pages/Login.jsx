import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

const Login = () => {
    const [credentials, setCredentials] = useState({ identifier: "", password: "" });
    const navigate = useNavigate(); // Untuk navigasi setelah login berhasil

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('login', credentials);
            sessionStorage.setItem('token', response.data.access_token);
            sessionStorage.setItem('role_id', response.data.role_id);
            sessionStorage.setItem('username', credentials.identifier)
        
            // Cek peran pengguna
            const roleId = response.data.role_id;
        
            if (roleId === 'admin') {
                navigate('/admin-dashboard'); // Redirect ke halaman dashboard admin
            } else if (roleId === 'user') {
                navigate('/'); // Redirect ke halaman dashboard pengguna
            }
        } catch (error) {
            console.error("Login failed", error);
        }
        
    };

    return (
        <div className="w-screen h-screen flex flex-col gap-10 justify-center bg-neutral-200 bg-center">
            <div className="flex justify-center text-4xl font-bold text-gray-900 dark:text-yellow-900">LOGIN</div>
            <form className="max-w-sm mx-auto w-full flex flex-col gap-3 items-center" onSubmit={handleSubmit}>
                <div className="w-full">
                    <label htmlFor="identifier" className="block text-sm font-medium text-gray-900 dark:text-yellow-900">Your Email or Username</label>
                    <input
                        type="text"
                        name="identifier"
                        id="identifier"
                        className="shadow-sm rounded-full bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-yellow-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="name@flowbite.com or username"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-yellow-900">Your Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="shadow-sm rounded-full bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-yellow-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="********"
                        required
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
