/**
 * CLIENT SERVICE: httpClient (Axios REST Client)
 * Base Axios instance configured with REST headers and interceptors.
 */
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// REST Request Interceptor
httpClient.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() };
    console.log(`[REST Client Outgoing] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// REST Response Interceptor for HTTP Status Codes
httpClient.interceptors.response.use(
  (response) => {
    const elapsed = new Date() - response.config.metadata.startTime;
    console.log(`[REST Client Response] HTTP ${response.status} (${elapsed}ms)`);
    return response;
  },
  (error) => {
    let message = 'An unknown network error occurred';
    if (error.response) {
      // Server returned HTTP 4xx or 5xx status
      message = error.response.data?.message || `HTTP ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // Request made but no response received (Backend server down)
      message = 'Cannot connect to REST API server at http://localhost:5000';
    } else {
      message = error.message;
    }
    console.error('[REST Client Error]', message);
    return Promise.reject(new Error(message));
  }
);

export default httpClient;
