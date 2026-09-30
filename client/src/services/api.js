import { auth } from './firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (url, options = {}) => {
  // Get token if user is logged in
  let token = 'demo-token';
  if (auth && auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken();
    } catch (e) {
      console.warn("Could not get firebase token", e);
    }
  }

  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

export const api = {
  // Health
  health: () => request('/health'),

  // Assessments
  getAssessments: () => request('/assessments'),
  getAssessmentById: (id) => request(`/assessments/${id}`),
  createAssessment: (data) => request('/assessments', { method: 'POST', body: JSON.stringify(data) }),
  updateAssessment: (id, data) => request(`/assessments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  submitAssessment: (id, payload) => request(`/assessments/${id}/submit`, { method: 'POST', body: JSON.stringify(payload) }),
  getMyResults: () => request('/assessments/my/results'),

  // AI
  generateAssessment: (config) => request('/ai/generate-assessment', { method: 'POST', body: JSON.stringify(config) }),
  generateRecommendations: (results) => request('/ai/generate-recommendations', { method: 'POST', body: JSON.stringify(results) }),

  // Teacher
  getTeacherAnalytics: () => request('/teacher/analytics'),
};

export default api;
