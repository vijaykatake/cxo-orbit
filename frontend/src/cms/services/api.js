import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const cmsApi = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// ✅ Use ADMIN TOKEN
cmsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ CMS LOGIN REDIRECT
cmsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/#/cms/login"; // ✅ IMPORTANT
    }
    return Promise.reject(error);
  },
);

export default cmsApi;
