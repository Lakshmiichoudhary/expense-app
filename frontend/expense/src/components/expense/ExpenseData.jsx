import React, { useEffect, useState } from 'react';

const ExpenseData = ({ expense }) => {
    const [expenses, setExpenses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [expensesPerPage, setExpensesPerPage] = useState(parseInt(localStorage.getItem('expensesPerPage')) || 10); // Default to 10 expenses per page

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
                setExpenses(data.expenses);
                setTotalPages(data.lastPage);
            } catch (error) {
                console.error(error);
            }
        };
        fetchExpense();
    }, [expense, expensesPerPage]);

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

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleChangeExpensesPerPage = (e) => {
        const newExpensesPerPage = parseInt(e.target.value);
        setExpensesPerPage(newExpensesPerPage);
        localStorage.setItem('expensesPerPage', newExpensesPerPage.toString());
    };

    return (
        <div>
            <h1 className='p-2 font-semibold text-2xl text-center'>YOUR EXPENSES</h1>
            <div className="flex justify-center my-2">
                <label htmlFor="expensesPerPage">Expenses Per Page:</label>
                <select id="expensesPerPage" value={expensesPerPage} onChange={handleChangeExpensesPerPage}>
                    <option value="5">5</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                </select>
            </div>
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
            <div className='p-2 text-center'>
                <button className='p-2 px-3 bg-slate-200 mx-3 rounded-sm' onClick={() => goToPage(currentPage - 1)}>1</button>
                <button className='p-2 px-3 bg-slate-200 mx-3 rounded-sm' onClick={() => goToPage(currentPage + 1)}>2</button>
            </div>
        </div>
    );
};

export default ExpenseData;
