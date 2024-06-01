import React, { useRef, useState } from 'react';
import Validation from '../../utils/Validation';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmpassword = useRef(null);
  const [errormessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault(); 
    const message = Validation(
      email.current.value,
      password.current.value,
      confirmpassword.current.value
    );

    setErrorMessage(message);
    if (message) return;

    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
          confirmPassword: confirmpassword.current.value,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token); 
        navigate('/home');
      } else {
        setErrorMessage(result.message || 'User already registered');
      }
    } catch (error) {
      setErrorMessage('Failed to create user');
    }
};


  return (
    <>
      <h1 className="font-bold bg-cyan-900 p-4 text-white text-2xl">Expense Tracker</h1>
      <div className="lg:w-4/12 md:w-5/6 mx-3 md:mx-auto right-0 left-0 bg-cyan-900 rounded-lg my-16 md:p-8 lg:p-11 p-4 text-center">
        <h1 className="font-bold text-2xl mb-2 text-white">Signup</h1>
        <form className="font-semibold" onSubmit={handleSignup}>
          <input
            className="p-2 outline-none bg-slate-300 w-full m-2"
            ref={name}
            type="text"
            placeholder="Name"
          />
          <input
            className="p-2 outline-none bg-slate-300 w-full m-2"
            ref={email}
            type="email"
            placeholder="Email"
          />
          <input
            className="p-2 outline-none bg-slate-300 w-full m-2"
            ref={password}
            type="password"
            placeholder="Password"
          />
          <input
            className="p-2 outline-none bg-slate-300 w-full m-2"
            ref={confirmpassword}
            type="password"
            placeholder="Confirm Password"
          />
          <p className="p-2 text-red-600">{errormessage}</p>
          <button
            type="submit"
            className="p-2 m-2 bg-teal-500 hover:bg-teal-700 w-full text-white rounded-md"
          >
            Signup
          </button>
          <Link to="/" className="p-2 text-white m-2">
            Already a user? Login.
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
