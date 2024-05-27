import React, { useState } from 'react'
import ExpenseData from './ExpenseData';

const Home = () => {
  const [amount,setAmount] = useState("");
  const [description,setDescription] = useState("")
  const [category,setCategory] = useState("")
  const [expense,setExpense] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch("http://localhost:3000/expense",{
        method : "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({amount,description,category}),
        credentials : 'include'
      });
      if(!response.ok){
        throw new Error("failed to add expense")
      }
      const data = await response.json();
      console.log(data)
      setExpense([...expense,data])
      setAmount("")
      setDescription("")
      setCategory("")
    }catch(error){
      console.error(error)
    } 
   
  }

  return (
    <div>
    <h1 className='font-bold  bg-cyan-900 p-4 text-white text-2xl'>Expense Tracker</h1>
    <div className='flex'>
      <form className='p-8 rounded-lg my-9 mx-24 w-4/12' 
        onSubmit={handleSubmit}>
        <div className='p-2 shadow-lg from-black mt-2 bg-slate-300'>
          <input className='p-2 w-full shadow-lg from-black outline-none font-semibold' 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number" 
            placeholder='Amount Apent' />
        </div>
        <div className='p-2 shadow-lg from-black mt-2 bg-slate-300'>
          <input className='p-2 w-full shadow-lg from-black outline-none font-semibold' 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text" 
            placeholder='Description' />
        </div>
        <div className='p-2 shadow-lg from-black mt-2 bg-slate-300'>
          <select className='p-2 w-full shadow-lg from-black outline-none font-semibold'
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option>Select</option>
            <option>Petrol</option>
            <option>Rent</option>
            <option>Food</option>
            <option>Bills</option>
            <option>Other Payments</option>
          </select>
        </div>
        <button className='p-3 mt-3 w-full font-semibold rounded-md bg-teal-500 hover:bg-teal-700 text-white'>
          Add Expense
        </button>
      </form>
      <div className='p-2 my-16 mx-8 w-6/12 bg-slate-300'>
        <ExpenseData expense={expense} setExpense={setExpense}  />
      </div>
    </div>
    </div>
  )
}

export default Home
