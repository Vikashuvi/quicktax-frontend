import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const userAPI = {
    getAll: () => axios.get(`${API_BASE}/users`),

    getById: (id) => axios.get(`${API_BASE}/users/${id}`),

    create: (user) => axios.post(`${API_BASE}/users`,user),

    update: (id, user) => axios.put(`${API_BASE}/users/${id}`, user),

    delete: (id) => axios.delete(`${API_BASE}/users/${id}`)
};

