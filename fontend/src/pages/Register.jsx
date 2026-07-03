import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'User' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // बॅकएंडला रिक्वेस्ट पाठवणे
          // Register.jsx मधील ही ओळ बदल:
const res = await api.post('/auth/signup', formData);
            toast.success(res.data.msg || "Registration Successful! 🎉");
            navigate('/'); // लॉगिन पेजवर रिडायरेक्ट
        } catch (err) {
            // जर एरर आला तर बॅकएंडचा मेसेज दाखवणे
            const errorMsg = err.response?.data?.msg || "Registration Failed! ❌";
            toast.error(errorMsg);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 mx-auto" style={{maxWidth: '400px'}}>
                <h3 className="text-center mb-3">Register</h3>
                <form onSubmit={handleRegister}>
                    <div className="mb-2">
                        <input className="form-control" type="text" placeholder="Name" 
                        onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" type="email" placeholder="Email" 
                        onChange={e => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" type="password" placeholder="Password" 
                        onChange={e => setFormData({...formData, password: e.target.value})} required />
                    </div>
                    <select className="form-select mb-3" onChange={e => setFormData({...formData, role: e.target.value})}>
                        <option value="User">User</option>
                        <option value="Store Owner">Store Owner</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button className="btn btn-success w-100" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};
export default Register;