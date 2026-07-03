import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDashboardStats, getOwnerDashboard, getAllStores } from '../services/api';

import AdminDashboard from '../components/AdminDashboard';
import OwnerDashboard from '../components/OwnerDashboard';
import UserDashboard from '../components/UserDashboard';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        let res;
        // १. API कॉल
        if (role === 'System Administrator') {
          res = await getDashboardStats();
        } else if (role === 'Store Owner') {
          res = await getOwnerDashboard();
        } else {
          res = await getAllStores();
        }

        // २. डेटा स्ट्रक्चर नीट करणे (जर axios असेल तर res.data, नसेल तर res)
        const responseData = res?.data || res;
        console.log("Dashboard Data:", responseData); // हे console मध्ये बघ म्हणजे नक्की काय येतंय ते समजेल
        
        setData(responseData);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        toast.error("डेटा लोड होण्यास अपयशी!");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [role]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div className="text-center mt-5"><h3>Loading...</h3></div>;

  return (
    <div className="container mt-5">
        <div className="d-flex justify-content-between mb-4">
            <h2>Dashboard</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>

        {/* ३. जर 'data' नसेल, तर युजरला काहीतरी मेसेज दाखवणे */}
        {!data && <div className="text-center mt-5"><h4>डेटा उपलब्ध नाही!</h4></div>}

        {/* ४. कंपोनंट रेंडरिंग (डेटा असेल तरच पाठवा) */}
        {role === 'System Administrator' && data && <AdminDashboard stats={data} />}
        {role === 'Store Owner' && data && <OwnerDashboard stats={data} />}
        {role === 'User' && data && <UserDashboard stores={data} />}
    </div>
  );
};

export default Dashboard;