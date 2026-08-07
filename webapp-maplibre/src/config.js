// File: /src/config.js
// Base URL backend Flask (spatial-engine). Diisi lewat env var Vite saat build/dev.
// Lihat .env.example untuk cara set VITE_API_URL.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
