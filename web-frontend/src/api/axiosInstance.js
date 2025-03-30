import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change this to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
