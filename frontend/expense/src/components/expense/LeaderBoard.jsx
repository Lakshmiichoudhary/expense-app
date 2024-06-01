import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token'); 
        //console.log("token",token)
        const response = await fetch('http://localhost:3000/premium/leaderboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        //console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard data", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <>
      <div className='bg-cyan-900 p-4'>
        <h1 className='mx-10 font-bold text-white text-2xl'>Expense Tracker</h1>
      </div>
      <div className='p-2 md:w-7/12 mt-10 mx-auto left-0 right-0 bg-slate-300 rounded-md shadow-xl from-black'>
        <h1 className='p-2 font-bold text-center text-2xl text-teal-800'>LeaderBoard</h1>
        <ul>
          {users.map((user, index) => (
            <div key={index} className='p-2 flex justify-between md:mx-6 mx-4'>
              <span><strong>NAME : </strong>{user.name}</span> 
              <li><strong>TOTAL EXPENSE : </strong>{user.total_expense}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LeaderBoard;
