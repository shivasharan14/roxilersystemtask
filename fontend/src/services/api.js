import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Interceptor: हे टोकन आपोआप प्रत्येक रिक्वेस्टमध्ये ॲड करेल
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --- AUTH SERVICES ---
export const loginUser = (formData) => api.post('/auth/login', formData);
export const registerUser = (formData) => api.post('/auth/signup', formData);

// --- ADMIN SERVICES ---
// येथे 'api' वापर, 'axios' नको, म्हणजे इंटरसेप्टर कामाला येईल
export const getDashboardStats = () => {
    return api.get('/admin/dashboard').then(res => res.data);
};

export const getAllUsers = (role = '') => api.get(`/admin/users?role=${role}`);
export const addUserByAdmin = (userData) => api.post('/admin/add-user', userData);
export const addStoreByAdmin = (storeData) => api.post('/admin/add-store', storeData);

// --- OWNER SERVICES ---
export const getOwnerDashboard = () => api.get('/owner/dashboard');

// --- STORE & RATING SERVICES ---
export const getAllStores = () => api.get('/stores');
export const addStore = (storeData) => api.post('/stores/add', storeData);
export const submitRating = (ratingData) => api.post('/ratings/submit', ratingData);

export default api;