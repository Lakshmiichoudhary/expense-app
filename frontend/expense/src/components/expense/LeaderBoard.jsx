import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await fetch('http://localhost:3000/premium/leaderboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard data", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <>
      <div className='bg-cyan-900 p-3'>
        <h1 className='mx-10 font-bold text-white text-2xl'>Expense Tracker</h1>
      </div>
      <div className='p-2 w-5/12 mt-6 mx-auto left-0 right-0 bg-slate-400'>
        <h1 className='p-2 font-semibold text-center text-2xl'>LeaderBoard</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index} className='p-2'>
              {user.name}: ${user.total_expense}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LeaderBoard;
