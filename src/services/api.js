import axios from 'axios';

/**
 * Axios Client Configuration
 * Base URL defaults to JSONPlaceholder user endpoint
 */
const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor for Request Logging
API.interceptors.request.use(
  (config) => {
    // Add custom metadata or request duration tracking
    config.metadata = { startTime: new Date() };
    console.log(`[Axios Outgoing Request] ${config.method?.toUpperCase()} -> ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for Response & Error Handling
API.interceptors.response.use(
  (response) => {
    const duration = new Date() - response.config.metadata.startTime;
    console.log(`[Axios Response Received] ${response.status} in ${duration}ms`);
    return response;
  },
  (error) => {
    let customError = 'An unexpected network error occurred.';
    if (error.response) {
      customError = `API Error (${error.response.status}): ${error.response.statusText}`;
    } else if (error.request) {
      customError = 'Network timeout or unreachable API server.';
    } else {
      customError = error.message;
    }
    console.error('[Axios Error Interceptor]', customError);
    return Promise.reject(new Error(customError));
  }
);

/**
 * Normalizes raw API response objects into unified User entities
 */
export const normalizeUserData = (user, index = 0) => {
  const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'Finance'];
  const statuses = ['Active', 'Active', 'Active', 'Pending', 'Inactive'];
  const roles = ['Frontend Lead', 'UI/UX Designer', 'Backend Engineer', 'Product Manager', 'Data Analyst', 'DevOps Specialist'];

  return {
    id: user.id || index + 100,
    name: user.name || `${user.firstName} ${user.lastName}`,
    username: user.username || (user.email ? user.email.split('@')[0] : `user_${user.id}`),
    email: user.email || 'no-email@example.com',
    phone: user.phone || '+1 (555) 234-5678',
    website: user.website || (user.domain ? `https://${user.domain}` : 'example.com'),
    company: user.company?.name || user.company?.title || user.company || 'Innovate Tech',
    department: user.department || departments[index % departments.length],
    role: user.role || roles[index % roles.length],
    status: user.status || statuses[index % statuses.length],
    city: user.address?.city || user.address?.state || 'San Francisco',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || user.email || index)}`,
  };
};

/**
 * API Service Calls using Axios
 */
export const userService = {
  // Fetch users list
  async getUsers(source = 'jsonplaceholder') {
    if (source === 'dummyjson') {
      const response = await axios.get('https://dummyjson.com/users?limit=15');
      return response.data.users.map((u, idx) => normalizeUserData({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        phone: u.phone,
        company: u.company.name,
        department: u.company.department,
        role: u.company.title,
        address: u.address,
      }, idx));
    }
    
    // Default JSONPlaceholder
    const response = await API.get('/users');
    return response.data.map((user, index) => normalizeUserData(user, index));
  },

  // Create new user (Axios POST)
  async createUser(userData) {
    const response = await API.post('/users', userData);
    return normalizeUserData({
      ...userData,
      id: response.data.id || Date.now(),
    });
  },

  // Update existing user (Axios PUT)
  async updateUser(id, userData) {
    const response = await API.put(`/users/${id}`, userData);
    return normalizeUserData({
      ...userData,
      id: id,
    });
  },

  // Delete user (Axios DELETE)
  async deleteUser(id) {
    await API.delete(`/users/${id}`);
    return id;
  }
};

export default API;
