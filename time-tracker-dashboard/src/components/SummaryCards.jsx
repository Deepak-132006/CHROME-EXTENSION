import React from 'react';

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="bg-indigo-600 text-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-2xl">1,200</p>
      </div>
      <div className="bg-indigo-500 text-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Active Sessions</h3>
        <p className="text-2xl">300</p>
      </div>
      <div className="bg-indigo-400 text-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">New Signups</h3>
        <p className="text-2xl">75</p>
      </div>
    </div>
  );
};

export default SummaryCards;
