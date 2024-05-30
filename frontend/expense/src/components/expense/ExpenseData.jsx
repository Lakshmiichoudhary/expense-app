import React, { useEffect, useState } from 'react';

const ExpenseData = ({ expense }) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch("http://localhost:3000/expense", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch expense");
                }
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchExpense();
    }, [expense]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/expense/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            setExpenses(expenses.filter(exp => exp.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className='p-2 font-semibold text-2xl text-center'>HISTORY</h1>
            <ul>
                {expenses.map(exp => (
                    <div key={exp.id} className='p-2 md:mx-4 w-full flex justify-between my-2 shadow-2xl rounded-md from-black font-medium bg-slate-300'>
                        <li className='p-2'>Rs: {exp.amount}</li>
                        <li className='p-2'>{exp.description}</li>
                        <li className='p-2'>{exp.category}</li>
                        <button className='px-3 py-2 rounded-md bg-red-700 text-white font-bold' onClick={() => handleDelete(exp.id)}>X</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseData;
