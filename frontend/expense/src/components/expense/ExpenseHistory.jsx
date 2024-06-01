import React, { useState } from 'react';

const ExpenseHistory = () => {
  const [view, setView] = useState('daily'); 

  const handleDownload = () => {
    const data = [
      { date: '2023-05-01', type: 'Expense', amount: 50 },
      { date: '2023-05-01', type: 'Income', amount: 100 },
    ];
    const fileName = 'expenses.csv';
    const csvData = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <div className='bg-cyan-900 p-4'>
        <h1 className='mx-10 font-bold text-white text-2xl'>Expense Tracker</h1>
      </div>
      <div className='p-4'>
        <h1 className='text-xl font-bold mb-4'>DAY TO DAY EXPENSES</h1>
        <div className='flex justify-between mb-4'>
          <div>
            <button
              className={`px-4 py-2 ${view === 'daily' ? 'bg-cyan-900 text-white' : 'bg-gray-200'} mr-2`}
              onClick={() => setView('daily')}
            >
              Daily
            </button>
            <button
              className={`px-4 py-2 ${view === 'weekly' ? 'bg-cyan-900 text-white' : 'bg-gray-200'} mr-2`}
              onClick={() => setView('weekly')}
            >
              Weekly
            </button>
            <button
              className={`px-4 py-2 ${view === 'monthly' ? 'bg-cyan-900 text-white' : 'bg-gray-200'}`}
              onClick={() => setView('monthly')}
            >
              Monthly
            </button>
          </div>
          <div>
            <button
              className='bg-cyan-900 text-white px-4 py-2'
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
        <div>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 bg-gray-200'>Date</th>
                <th className='py-2 px-4 bg-gray-200'>Type</th>
                <th className='py-2 px-4 bg-gray-200'>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='py-2 px-4 border'>2023-05-01</td>
                <td className='py-2 px-4 border'>Expense</td>
                <td className='py-2 px-4 border'>$50</td>
              </tr>
              <tr>
                <td className='py-2 px-4 border'>2023-05-01</td>
                <td className='py-2 px-4 border'>Income</td>
                <td className='py-2 px-4 border'>$100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ExpenseHistory;