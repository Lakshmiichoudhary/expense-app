import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/password/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to send password reset email');
        return;
      }
  
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <h1 className='font-bold bg-cyan-900 p-4 text-white text-2xl'>Expense Tracker</h1>
      <div className='p-2 mx-auto right-0 left-0 w-5/12 bg-cyan-900 mt-12 text-center rounded-lg shadow-xl from-black'>
        <form className='p-4 mt-4' onSubmit={handleSubmit}>
          <label className='p-2 m-4 text-white'>Enter Your Registered Email ID:</label>
          <div>
            <input
              className='p-2 w-96 m-4 bg-slate-300 font-semibold outline-none'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className='p-2 px-6 text-white bg-teal-500 hover:bg-teal-700 rounded-md m-5'>
            Send
          </button>
        </form>
        {message && <p className='text-white'>{message}</p>}
      </div>
    </>
  );
};

export default ForgotPassword;
