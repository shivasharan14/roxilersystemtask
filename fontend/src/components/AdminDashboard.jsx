import React, { useState, useEffect } from 'react';
import { addUserByAdmin, addStoreByAdmin, getDashboardStats } from '../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = ({ stats }) => {
    const [showModal, setShowModal] = useState(null); 
    const [formData, setFormData] = useState({});
    const [localStats, setLocalStats] = useState(stats || { totalUsers: 0, totalStores: 0, totalRatings: 0, users: [] });

    useEffect(() => {
        if (stats) setLocalStats(stats);
    }, [stats]);

    const fetchStats = () => {
        getDashboardStats()
            .then(data => setLocalStats(data))
            .catch(() => toast.error("डेटा लोड होण्यास अपयशी!"));
    };

    const handleSubmit = () => {
        // युजर ॲड करताना रोल सिलेक्ट केला नसेल तर डिफॉल्ट 'User' पाठवा
        const payload = { ...formData };
        if (showModal === 'user' && !payload.role) {
            payload.role = 'User';
        }

        const action = showModal === 'user' ? addUserByAdmin(payload) : addStoreByAdmin(payload);
        
        action
            .then(() => {
                toast.success(`${showModal === 'user' ? 'User' : 'Store'} यशस्वीरित्या ॲड झाला!`);
                setShowModal(null);
                setFormData({});
                fetchStats();
            })
            .catch(() => toast.error("काहीतरी चूक झाली!"));
    };

    const { totalUsers, totalStores, totalRatings, users } = localStats;

    return (
        <div className="container mt-4">
            {/* Stats Section */}
            <div className="row mb-4">
                <div className="col-md-4"><div className="card text-white bg-primary p-3">Users: {totalUsers || 0}</div></div>
                <div className="col-md-4"><div className="card text-white bg-success p-3">Stores: {totalStores || 0}</div></div>
                <div className="col-md-4"><div className="card text-white bg-warning p-3">Ratings: {totalRatings || 0}</div></div>
            </div>
            
            <button className="btn btn-primary me-2" onClick={() => setShowModal('user')}>+ Add New User</button>
            <button className="btn btn-success" onClick={() => setShowModal('store')}>+ Add New Store</button>

            {/* Users Table */}
            <div className="card mt-4 p-3">
                <h4>Users List</h4>
                <table className="table">
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
                    <tbody>
                        {Array.isArray(users) && users.map(u => (
                            <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}>
                    <div className="modal-dialog" style={{ marginTop: '80px' }}>
                        <div className="modal-content p-4">
                            <h4>{showModal === 'user' ? 'Add New User' : 'Add New Store'}</h4>
                            
                            <input className="form-control mb-2" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
                            
                            {showModal === 'user' ? (
                                <>
                                    <input className="form-control mb-2" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
                                    <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
                                    <select className="form-control mb-2" onChange={e => setFormData({...formData, role: e.target.value})}>
                                        <option value="User">User</option>
                                        <option value="Store Owner">Store Owner</option>
                                        <option value="System Administrator">Admin</option>
                                    </select>
                                </>
                            ) : (
                                <>
                                    <input className="form-control mb-2" placeholder="Address" onChange={e => setFormData({...formData, address: e.target.value})} />
                                    <input className="form-control mb-2" placeholder="Owner ID" onChange={e => setFormData({...formData, ownerId: e.target.value})} />
                                </>
                            )}

                            <div className="d-flex justify-content-end mt-3">
                                <button className="btn btn-secondary me-2" onClick={() => setShowModal(null)}>Cancel</button>
                                <button className="btn btn-success" onClick={handleSubmit}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;