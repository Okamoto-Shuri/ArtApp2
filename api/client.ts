// API client for making requests to backend

import Constants from 'expo-constants';

// Get base URL from environment or use default for development
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'https://api.artqr.example.com';

// Default headers for all requests
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Add auth token to headers if available
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token
    ? {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    : DEFAULT_HEADERS;
};

// Generic fetch function with error handling
const fetchAPI = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  customHeaders?: Record<string, string>
) => {
  try {
    const headers = { ...getAuthHeaders(), ...customHeaders };
    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'An unknown error occurred',
        data,
      };
    }

    return data;
  } catch (error) {
    console.error(`API Error (${method} ${endpoint}):`, error);
    throw error;
  }
};

// API methods
export const api = {
  // Auth
  login: (accessToken: string) =>
    fetchAPI('/api/auth/line-login', 'POST', { accessToken }),

  getUserProfile: () => fetchAPI('/api/users/profile'),

  // Projects
  getProjects: (filters?: Record<string, any>) => {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as Record<string, string>).toString()}`
      : '';
    return fetchAPI(`/api/projects${queryParams}`);
  },

  getProject: (projectId: string) => fetchAPI(`/api/projects/${projectId}`),

  createProject: (projectData: any) =>
    fetchAPI('/api/projects', 'POST', projectData),

  updateProject: (projectId: string, projectData: any) =>
    fetchAPI(`/api/projects/${projectId}`, 'PUT', projectData),

  // Project Progress
  getProjectProgress: (projectId: string) =>
    fetchAPI(`/api/projects/${projectId}/progress`),

  // Locations
  getProjectLocations: (projectId: string) =>
    fetchAPI(`/api/projects/${projectId}/locations`),

  createLocation: (projectId: string, locationData: any) =>
    fetchAPI(`/api/projects/${projectId}/locations`, 'POST', locationData),

  // QR Scanning
  scanQRCode: (qrData: string) => fetchAPI('/api/scan', 'POST', { qr_code: qrData }),

  // NFT
  claimNFT: (projectId: string) =>
    fetchAPI(`/api/projects/${projectId}/claim-nft`, 'POST'),

  // Social
  getComments: (projectId: string) =>
    fetchAPI(`/api/projects/${projectId}/comments`),

  postComment: (projectId: string, content: string) =>
    fetchAPI(`/api/projects/${projectId}/comments`, 'POST', { content }),

  likeProject: (projectId: string) =>
    fetchAPI(`/api/projects/${projectId}/like`, 'POST'),

  unlikeProject: (projectId: string) =>
    fetchAPI(`/api/projects/${projectId}/like`, 'DELETE'),
};

export default api;