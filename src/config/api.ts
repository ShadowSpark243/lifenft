// Use 127.0.0.1 instead of localhost to prevent IPv6 resolution hangs with local Cloudflare Wrangler
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  }
};
