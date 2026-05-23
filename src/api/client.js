import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const API_BASE = (BACKEND_URL ? `${BACKEND_URL}`.replace(/\/$/, "") : "") + "/api";

export const api = axios.create({
  baseURL: API_BASE
});

