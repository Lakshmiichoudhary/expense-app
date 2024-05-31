import React from 'react'

const ForgotPassword = () => {
  return (
    <>
      <h1 className='font-bold bg-cyan-900 p-4 text-white text-2xl'>Expense Tracker</h1>
      <div className='p-2 mx-auto right-0 left-0 w-5/12 bg-cyan-900 mt-12 text-center rounded-lg shadow-xl from-black'>
      <form className='p-4 mt-4'>
      <label className='p-2 m-4 text-white'>Enter Your Registred Email ID:</label>
        <div>
            <input className='p-2 w-96 m-4 bg-slate-300 font-semibold outline-none'
            type='email' 
            placeholder='Email' />
        </div>
        <button className='p-2 px-6 text-white bg-teal-500 hover:bg-teal-700 rounded-md m-5'>
            Send
        </button>
      </form>
      </div>
    </>
  )
}

export default ForgotPassword
