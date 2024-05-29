import React, { useState } from 'react';

const Order = () => {
    const [payment, setPayment] = useState(false);

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

                        setPayment(true);
                        alert("Transaction successful");
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

    return (
        <div className='flex bg-cyan-900 p-4 justify-between'>
            <h1 className='mx-10 font-bold text-white text-2xl'>Expense Tracker</h1>
            {payment ? (
                <h2 className='mx-16 text-white font-bold'>You are a premium user</h2>
            ) : (
                <button className='mx-16 text-teal-600 bg-white rounded-md p-2 font-bold' onClick={handlePremium}>
                    BUY PREMIUM
                </button>
            )}
        </div>
    );
}

export default Order;
