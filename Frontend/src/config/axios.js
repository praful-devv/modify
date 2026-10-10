import axios from "axios"

export const api = axios.create({
  baseURL: "https://modify-c3x9.onrender.com/api",
  withCredentials: true,
});