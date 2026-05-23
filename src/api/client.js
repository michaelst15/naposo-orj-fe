import axios from "axios";

const DEFAULT_BACKEND_URL = "https://naposo-orj-be-production.up.railway.app";

export const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL).replace(/\/$/, "");
export const API_BASE = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API_BASE
});
