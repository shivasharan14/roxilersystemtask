import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Interceptor to add JWT token to every request from localStorage
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
// Route: /api/admin/dashboard
export const getAdminStats = () => api.get('/admin/dashboard'); 
export const getAllUsers = (role = '') => api.get(`/admin/users?role=${role}`);
export const addUserByAdmin = (userData) => api.post('/admin/add-user', userData);
export const addStoreByAdmin = (storeData) => api.post('/admin/add-store', storeData);

// --- OWNER SERVICES ---
// Route: /api/owner/dashboard
export const getOwnerDashboard = () => api.get('/owner/dashboard');

// --- STORE & RATING SERVICES ---
// Route: /api/stores/ and /api/ratings/
export const getAllStores = () => api.get('/stores');
export const addStore = (storeData) => api.post('/stores/add', storeData);
export const submitRating = (ratingData) => api.post('/ratings/submit', ratingData);

export default api;