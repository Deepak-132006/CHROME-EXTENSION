import React from 'react';
import SummaryCards from '../components/SummaryCards';
import SiteChart from '../components/SiteChart';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <SummaryCards />
      <div className="mt-8">
        <SiteChart />
      </div>
    </div>
  );
};

export default Dashboard;
