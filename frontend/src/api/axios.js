import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://backend-projet-de-fin.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token d'authentification
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
