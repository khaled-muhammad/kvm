import axios from "axios";

const API = axios.create({
  baseURL: "https://kvmforever1.pythonanywhere.com/api/", // Django backend URL
});

// Add auth header interceptor
API.interceptors.request.use(async (config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const fetchThoughts = () => API.get("thoughts/");
export const createThought = (thought) => API.post("thoughts/", thought);
export const upvoteThought = (id) => API.patch(`thoughts/${id}/upvote/`);
export const fetchThoughtDetail = (id) => API.get(`thoughts/${id}/`);
export const createComment = (thoughtId, content) => 
  API.post(`thoughts/${thoughtId}/comments/`, { content });