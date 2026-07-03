import React, { useState } from 'react';
import { addUserByAdmin, addStoreByAdmin } from '../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = ({ stats }) => {
    const [showModal, setShowModal] = useState(null);
    const [formData, setFormData] = useState({});

    const handleSubmit = async () => {
        try {
            if (showModal === 'user') await addUserByAdmin(formData);
            else await addStoreByAdmin(formData);
            
            toast.success(`${showModal === 'user' ? 'User' : 'Store'} added successfully!`);
            setShowModal(null);
            window.location.reload(); 
        } catch (err) {
            toast.error("Operation failed!");
        }
    };

    // 'stats' मधून डेटा काढणे (बॅकएंड स्ट्रक्चरनुसार)
    const { totalUsers, totalStores, totalRatings, users } = stats || {};

    return (
        <div>
            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-4"><div className="card text-white bg-primary p-3">Total Users: {totalUsers || 0}</div></div>
                <div className="col-md-4"><div className="card text-white bg-success p-3">Total Stores: {totalStores || 0}</div></div>
                <div className="col-md-4"><div className="card text-white bg-warning p-3">Total Ratings: {totalRatings || 0}</div></div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3 mb-4">
                <button className="btn btn-primary" onClick={() => setShowModal('user')}>+ Add New User</button>
                <button className="btn btn-success" onClick={() => setShowModal('store')}>+ Add New Store</button>
            </div>

            {/* User Management Table */}
            <div className="card p-4">
                <h4>User Management</h4>
                <table className="table">
                    <thead>
                        <tr><th>Name</th><th>Email</th><th>Role</th></tr>
                    </thead>
                    <tbody>
                        {users?.map(u => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td><span className="badge bg-secondary">{u.role}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal remains the same as previous step */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-4">
                            <h4>{showModal === 'user' ? 'Add New User' : 'Add New Store'}</h4>
                            {showModal === 'user' ? (
                                <>
                                    <input placeholder="Name" className="form-control mb-2" onChange={e => setFormData({...formData, name: e.target.value})} />
                                    <input placeholder="Email" className="form-control mb-2" onChange={e => setFormData({...formData, email: e.target.value})} />
                                    <input type="password" placeholder="Password" className="form-control mb-2" onChange={e => setFormData({...formData, password: e.target.value})} />
                                    <select className="form-control mb-2" onChange={e => setFormData({...formData, role: e.target.value})}>
                                        <option value="User">User</option>
                                        <option value="Store Owner">Store Owner</option>
                                        <option value="System Administrator">Admin</option>
                                    </select>
                                </>
                            ) : (
                                <>
                                    <input placeholder="Store Name" className="form-control mb-2" onChange={e => setFormData({...formData, name: e.target.value})} />
                                    <input placeholder="Address" className="form-control mb-2" onChange={e => setFormData({...formData, address: e.target.value})} />
                                    <input placeholder="Owner ID" className="form-control mb-2" onChange={e => setFormData({...formData, ownerId: e.target.value})} />
                                </>
                            )}
                            <div className="mt-3">
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