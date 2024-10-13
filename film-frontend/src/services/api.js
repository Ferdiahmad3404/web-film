import axios from 'axios';

// Mengatur URL dasar API
const API_URL = 'http://localhost:8000/api'; // Ganti dengan URL API Anda

// Membuat instance Axios
const api = axios.create({
    baseURL: API_URL,
});

// Menambahkan interceptor untuk menyertakan token JWT di setiap permintaan
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token'); // Ambil token dari local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Sertakan token di header
    }
    return config;
});

export default api;
