import axios, { InternalAxiosRequestConfig } from 'axios';



/* Creates an axios instance to set a base url and check for the token in the header automatically  */
/* ------------------------------------------------------------------------------------------------ */

	
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',  // Your API base URL
});

// Add a request interceptor to conditionally add the token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only add the token for requests that are not login or signup
    if (config.url && !config.url.includes('login') && !config.url.includes('signup')) {
      const token = localStorage.getItem('token');
      if (token) {
        // If the token exists, add it to the headers
        config.headers!['token'] = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

