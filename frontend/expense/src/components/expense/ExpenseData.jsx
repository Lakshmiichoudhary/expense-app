import React, { useEffect } from 'react'

const ExpenseData = ({expense,setExpense}) => {

  useEffect(()=>{
    const fetchExpense = async() => {
      try{
        const response = await fetch("http://localhost:3000/expense",{
          method : "GET",
          headers : {
            "Content-Type": "application/json"
          },
          credentials : 'include'
        })
        if(!response.ok){
          throw new Error("failed to fetch expense")
        }
        const data = await response.json();
        //console.log(data)
        setExpense(data)
      }catch(error){
        console.log(error)
      }
    }
    fetchExpense()
  },[setExpense])

  const handleDelete = async(id) => {
      try{
        const response = await fetch(`http://localhost:3000/expense/${id}`,{
          method : "DELETE",
          headers : {
            "Content-Type": "application/json"
          },
          credentials : 'include'
        })
        if(!response.ok){
          throw new Error("Somthing went wrong")
        }
        setExpense(expense.filter(expenses => expenses.id !== id))
      }catch(error){
        console.error(error)
      }
  }

  return (
    <div>
      <h1 className='p-2 font-semibold text-2xl text-center'>
        HISTORY
      </h1>
      <ul>
      {expense.map(expense => (
       <div key={expense.id}
       className='p-3 mx-4 w-full flex justify-between my-2 shadow-xl from-slate-950 font-medium'>
          <li className='p-2 '>Rs : {expense.amount}</li>
          <li className='p-2'>{expense.description}</li>
          <li className='p-2'>{expense.category}</li>
          <button className='px-3 py-2 rounded-md bg-red-700 text-white font-bold'
            onClick={()=> handleDelete(expense.id)}>
            X
          </button>
       </div>
      ))}
      </ul>
    </div>
  )
}

export default ExpenseData
