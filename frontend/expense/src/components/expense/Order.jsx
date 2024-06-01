import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Order = () => {
    const [payment, setPayment] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const isPremium = localStorage.getItem('isPremium') === 'true';
        setPayment(isPremium);
    }, []);
    
    const handlePremium = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3000/order/createOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error("Failed to create order");
            }
    
            const data = await response.json();
            const order = data.order;
            const amountInPaise = data.amount;
    
            var options = {
                "key": "rzp_test_xMAs1H6DI0zI4n",
                "amount": amountInPaise,
                "currency": "INR",
                "name": "Expense Tracker",
                "description": "Premium Membership",
                "order_id": order.id,
                "handler": async function (response) {
                    try {
                        const res = await fetch("http://localhost:3000/order/updateOrder", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                order_id: order.id,
                                payment_id: response.razorpay_payment_id,
                                status: "SUCCESS"
                            }),
                            credentials: 'include'
                        });
    
                        if (!res.ok) {
                            throw new Error("Failed to update order status");
                        }
                        const updateData = await res.json();
                        if (updateData.success) {
                            setPayment(true);
                            localStorage.setItem('isPremium', 'true');
                            alert("Transaction successful");
                        } else {
                            throw new Error("Failed to update user status");
                        }
                    } catch (error) {
                        console.error(error);
                        alert("Transaction failed");
                    }
                },
                "prefill": {
                    "name": "Lakshmi B",
                    "email": "Laxmi@example.com",
                    "contact": "9999999999"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#F37254"
                },
            };
    
            var rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', async function (response) {
                try {
                    await fetch("http://localhost:3000/order/updateOrder", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            order_id: order.id,
                            payment_id: response.error.metadata.payment_id,
                            status: "FAILED"
                        }),
                        credentials: 'include'
                    });
                    alert("Transaction failed");
                } catch (error) {
                    console.error(error);
                }
            });
    
            rzp1.open();
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isPremium');
        navigate('/');
    };
        
    return (
        <div>
            {payment ? (
                <div>
                <div className=' bg-cyan-900 p-3 flex justify-between'>
                    <h1 className='mx-10 font-bold text-white text-2xl'>Expense Tracker</h1>
                    <button onClick={handleLogout} className='mx-16 px-3 py-2 rounded-md bg-gray-200 text-black'>Logout</button>
                </div>
                <div className='p-3 bg-teal-600 flex justify-end'>
                    <h2 className='md:font-bold p-2 text-white'>
                        You are a premium user!!
                    </h2>
                    <Link to="/leaderboard"><button 
                    className='bg-cyan-900 text-white px-4 py-2 mx-4'>
                        LeaderBoard
                    </button></Link>
                    <Link to="/Expensehistory"><button 
                    className='bg-cyan-900 text-white px-4 py-2 mx-4'>
                        Expense History
                    </button></Link> 
                </div>
                </div>
            ) : (
                <div className='flex bg-cyan-900 p-3 justify-between'>
                    <h1 className='mx-10 font-bold text-white text-2xl'>Expense Tracker</h1>
                    <div>
                    <button className='mx-16 text-teal-600  bg-gray-200 rounded-md p-2 font-bold' onClick={handlePremium}>
                        BUY PREMIUM
                    </button>
                    <button onClick={handleLogout} className='mx-16 px-3 py-2 rounded-md bg-gray-200 text-black'>Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Order;
