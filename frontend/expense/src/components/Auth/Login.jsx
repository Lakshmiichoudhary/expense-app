import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const email = useRef(null)
  const password = useRef(null)
  const [errormessage,setErrorMessage] = useState()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
        credentials: 'include',
      });
      //console.log(response)
      const result = await response.json();
      if (response.ok) {
        navigate('/home');
      } else {
        //console.log("error",result)
        setErrorMessage(result.message || 'Failed to login');
      }
    } catch (error) {
      setErrorMessage('Failed to login');
    }
  };


  return (
      <div>
      <h1 className='font-bold  bg-cyan-900 p-4 text-white text-2xl'>Expense Tracker</h1>
      <div className='lg:w-3/12 md:w-5/6 mx-3 md:mx-auto right-0 left-0 bg-cyan-900 rounded-lg my-24 md:p-8 lg:p-11 p-4 text-center'>
      <h1 className='font-bold text-2xl mb-2 text-white'>
        Login
      </h1>
      <form onSubmit={e=>e.preventDefault()}>
        <input className='p-2 outline-none bg-slate-300 w-full m-2'
          ref={email} type='email' placeholder='email'/>
        <input className='p-2 outline-none bg-slate-300 w-full m-2'
            ref={password} type='password' placeholder='password'/>
        <p className='p-2 text-red-600'>{errormessage}</p>  
        <button className='p-2 m-2 bg-teal-500 hover:bg-teal-700 w-full text-white rounded-md'
          onClick={handleLogin}>
          Login
        </button>
        <Link to="/signup"
        className='p-2 text-white m-2'>
            New user??register account
        </Link>
      </form>
      </div>
    </div>
  )
}

export default Login
