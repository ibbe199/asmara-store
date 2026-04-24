// Asmara Store API Client
// Replace API_BASE_URL when your backend is deployed.
const API_BASE_URL = window.ASMARA_API_BASE_URL || '/api';

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('asmara_auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

window.AsmaraAPI = {
  auth: {
    me: () => apiRequest('/auth/me'),
    login: (payload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    register: (payload) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
    logout: () => {
      localStorage.removeItem('asmara_auth_token');
      localStorage.removeItem('asmara_user');
      window.location.reload();
    },
  },
  notifications: {
    list: () => apiRequest('/notifications'),
    unreadCount: () => apiRequest('/notifications/unread-count'),
  },
  messages: {
    conversations: () => apiRequest('/messages/conversations'),
    thread: (conversationId) => apiRequest(`/messages/conversations/${conversationId}`),
    send: (payload) => apiRequest('/messages/send', { method: 'POST', body: JSON.stringify(payload) }),
  },
  payments: {
    createStripeCheckout: (payload) => apiRequest('/payments/stripe/checkout', { method: 'POST', body: JSON.stringify(payload) }),
    createPayPalOrder: (payload) => apiRequest('/payments/paypal/order', { method: 'POST', body: JSON.stringify(payload) }),
  },
};
