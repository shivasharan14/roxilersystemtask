import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAdminStats, getOwnerDashboard, getAllStores } from '../services/api';

// Importing components
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
        // Using the service functions we created earlier
        if (role === 'System Administrator') {
          res = await getAdminStats();
          setData(res.data.data); // Based on Admin controller structure
        } else if (role === 'Store Owner') {
          res = await getOwnerDashboard();
          setData(res.data);
        } else {
          res = await getAllStores();
          setData(res.data);
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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
           <h2>Welcome, {userName}</h2>
           <span className="badge bg-primary">{role}</span>
        </div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Conditional rendering based on role */}
      {role === 'System Administrator' && <AdminDashboard stats={data} />}
      {role === 'Store Owner' && <OwnerDashboard stats={data} />}
      {role === 'User' && <UserDashboard stores={data} />}
    </div>
  );
};

export default Dashboard;