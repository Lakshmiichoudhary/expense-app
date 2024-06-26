import React, { useState } from 'react';
import ExpenseData from './ExpenseData';
import Order from './Order';

const Home = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [expense, setExpense] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log("token" , token)
            const payload = { amount, description, category };
            console.log('Submitting expense:', payload); 
            const response = await fetch("http://localhost:3000/expense", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ amount, description, category }),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to add expense");
            }
            const data = await response.json();
            setExpense([...expense, data]);
            setAmount("");
            setDescription("");
            setCategory("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Order />
            <div className='md:flex'>
                <form className='p-8 rounded-lg my-9 md:ml-24 md:w-4/12' onSubmit={handleSubmit}>
                    <div className='p-2 shadow-lg from-black mt-2 bg-slate-300'>
                        <input className='p-2 w-full shadow-lg from-black outline-none font-semibold' value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder='Amount Spent' />
                    </div>
                    <div className='p-2 shadow-lg from-black mt-2 bg-slate-300'>
                        <input className='p-2 w-full shadow-lg from-black outline-none font-semibold' value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' />
                    </div>
                    <div className='p-2 shadow-lg from-black mt-2 bg-slate-300'>
                        <select className='p-2 w-full shadow-lg from-black outline-none font-semibold' value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>Select</option>
                            <option>Petrol</option>
                            <option>Rent</option>
                            <option>Food</option>
                            <option>Bills</option>
                            <option>Other Payments</option>
                        </select>
                    </div>
                    <button className='p-3 mt-3 w-full font-semibold rounded-md bg-teal-500 hover:bg-teal-700 text-white'>Add Expense</button>
                </form>
                <div className='p-2 md:my-12 md:ml-11 md:w-6/12'>
                    <ExpenseData expense={expense} />
                </div>
            </div>
        </div>
    );
};

export default Home;
