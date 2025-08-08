import axios from 'axios';

// In production, the API will be served from the same origin
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Exam services
export const fetchQuestions = async (count = 10) => {
  const response = await api.get(`/exam/questions?count=${count}`);
  return response.data;
};

export const submitExam = async (examData) => {
  const response = await api.post('/exam/submit', examData);
  return response.data;
};

export const getExamResult = async (submissionId) => {
  const response = await api.get(`/exam/result/${submissionId}`);
  return response.data;
};

export default api;