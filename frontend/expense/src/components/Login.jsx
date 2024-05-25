import React, { useRef, useState } from 'react'
import Validation from '../utils/Validation'

const Login = () => {
  const email = useRef(null)
  const password = useRef(null)
  const confirmpassword = useRef(null)
  const [errormessage,setErrorMessage] = useState()

  const handleLogin = async() => {
    const emailValue = email.current ? email.current.value : '';
    const passwordValue = password.current ? password.current.value : '';
    const confirmPasswordValue = confirmpassword.current ? confirmpassword.current.value : '';
    //console.log(email)
    //console.log(passwordValue)
    //console.log(confirmpassword)
    const message = Validation(
        emailValue,
        passwordValue,
        confirmPasswordValue)
        //console.log(message)
        setErrorMessage(message)
        if(message) return;

        try {
          const response = await fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: emailValue,
              password: passwordValue,
              confirmPassword: confirmPasswordValue,
            }),
          });
          //console.log(response)
          const result = await response.json();
          if (response.ok) {
            setErrorMessage('');
          } else {
            setErrorMessage(result.message || 'Failed to create user');
          }
        } catch (error) {
          setErrorMessage('Failed to create user');
        }
      };

  return (
    <div>
      <h1 className='font-bold  bg-cyan-900 p-4 text-white text-2xl'>Expense Tracker</h1>
      <div className='lg:w-3/12 md:w-5/6 mx-3 md:mx-auto right-0 left-0 bg-cyan-900 rounded-lg my-28 md:p-8 lg:p-11 p-4 text-center'>
      <h1 className='font-bold text-2xl mb-2 text-white'>Signup</h1>
      <form onSubmit={e=>e.preventDefault()}>
        <input className='p-2 outline-none bg-slate-300 w-full m-2'
          ref={email} type='email' placeholder='email'/>
        <input className='p-2 outline-none bg-slate-300 w-full m-2'
            ref={password} type='password' placeholder='password'/>
        <input className='p-2 outline-none bg-slate-300 w-full m-2'
          ref={confirmpassword} type='password' placeholder='confirm Password'/>
        <p className='p-2 text-red-600'>{errormessage}</p>  
        <button className='p-2 m-2 bg-teal-500 hover:bg-teal-700 w-full text-white rounded-md'
          onClick={handleLogin}>
          Signup
        </button>
      </form>
      </div>
    </div>
  )
}

export default Login
