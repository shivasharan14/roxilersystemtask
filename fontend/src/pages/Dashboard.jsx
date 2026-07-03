import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// १. येथे दुरुस्ती केली: फक्त एकदा आणि योग्य नाव (getDashboardStats)
import { getDashboardStats, getOwnerDashboard, getAllStores } from '../services/api';

import AdminDashboard from '../components/AdminDashboard';
import OwnerDashboard from '../components/OwnerDashboard';
import UserDashboard from '../components/UserDashboard';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let res;
        // २. इथेही नाव getDashboardStats केले
        if (role === 'System Administrator') {
          res = await getDashboardStats();
          setData(res); // आपण api.js मध्येच .data रिटर्न केलंय, त्यामुळे इथे फक्त res
        } else if (role === 'Store Owner') {
          res = await getOwnerDashboard();
          setData(res);
        } else {
          res = await getAllStores();
          setData(res);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load dashboard data!");
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

  // आणि खाली असे चेक करा:
return (
    <div className="container mt-5">
        {/* ... */}
        
        {/* 'data' असेल तरच पाठवा */}
        {role === 'System Administrator' && data && <AdminDashboard stats={data} />}
        {role === 'Store Owner' && data && <OwnerDashboard stats={data} />}
        {role === 'User' && data && <UserDashboard stores={data} />}
    </div>
);
};

export default Dashboard;