import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const email = emailRef.current.value; // Get email from form input
        const password = passwordRef.current.value; // Get password from form input

        try {
            const response = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }) // Only send email and password
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            //console.log("Received token:", data.token); 
            localStorage.setItem('token', data.token); 
            //console.log("Token stored successfully:", data.token);
            navigate("/home");
            localStorage.setItem('isPremium', data.isPremium.toString()); 
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h1 className='font-bold bg-cyan-900 p-4 text-white text-2xl'>Expense Tracker</h1>
            <div className='lg:w-3/12 md:w-5/6 mx-3 md:mx-auto right-0 left-0 bg-cyan-900 rounded-lg my-24 md:p-8 lg:p-11 p-4 text-center'>
                <h1 className='font-bold text-2xl mb-2 text-white'>Login</h1>
                <form onSubmit={handleLogin}>
                    <input className='p-2 outline-none bg-slate-300 w-full m-2' ref={emailRef} type='email' placeholder='email' />
                    <input className='p-2 outline-none bg-slate-300 w-full m-2' ref={passwordRef} type='password' placeholder='password' />
                    <p className='p-2 text-red-600'>{errorMessage}</p>  
                    <button className='p-2 m-2 bg-teal-500 hover:bg-teal-700 w-full text-white rounded-md' type='submit'>
                        Login
                    </button>
                    <Link to="/signup" className='p-2 text-white m-2'>
                        New user? Register account
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
