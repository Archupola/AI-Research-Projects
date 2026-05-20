import axios from "axios";

const API = axios.create({
  baseURL:
    "https://ai-research-projects.onrender.com/api",
});

export default API;