import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const courseService = {
  getAllCourses: (params = {}) => api.get('/courses/courses/', { params }),
  getCourse: (id) => api.get(`/courses/courses/${id}/`),
  getCoursesByCategory: (category) => api.get(`/courses/courses/?category=${category}`),
  getFeaturedCourses: () => api.get('/courses/courses/?featured=true'),
  searchCourses: (query) => api.get(`/courses/courses/?search=${query}`),
  // FIXED: Use the correct endpoint
  getCourseFAQs: (courseId) => api.get(`/courses/courses/${courseId}/faqs/`),
};

export const contactService = {
  submitContact: (data) => api.post('/contacts/contacts/submit_contact/', data),
};

export default api;