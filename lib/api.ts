// This file contains utility functions for API calls to your Spring Boot backend

const API_URL = "http://localhost:8080/api"

// Helper function to get the authentication token
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Helper function to handle API responses
export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "An error occurred")
  }
  return response.json()
}

// Generic fetch function with authentication
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  return handleResponse(response)
}

// Authentication API calls
export const authApi = {
  login: async (email: string, password: string) => {
    return fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  register: async (userData: any) => {
    return fetchWithAuth("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  logout: async () => {
    localStorage.removeItem("token")
    return Promise.resolve()
  },
}

// Products API calls
export const productsApi = {
  getAll: async () => {
    return fetchWithAuth("/products")
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/products/${id}`)
  },

  create: async (productData: any) => {
    return fetchWithAuth("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    })
  },

  update: async (id: string, productData: any) => {
    return fetchWithAuth(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    })
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/products/${id}`, {
      method: "DELETE",
    })
  },
}

// Orders API calls
export const ordersApi = {
  getAll: async () => {
    return fetchWithAuth("/orders")
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/orders/${id}`)
  },

  create: async (orderData: any) => {
    return fetchWithAuth("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  },

  update: async (id: string, orderData: any) => {
    return fetchWithAuth(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    })
  },

  updateStatus: async (id: string, status: string) => {
    return fetchWithAuth(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  },
}

// Users API calls
export const usersApi = {
  getAll: async () => {
    return fetchWithAuth("/users")
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/users/${id}`)
  },

  create: async (userData: any) => {
    return fetchWithAuth("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  update: async (id: string, userData: any) => {
    return fetchWithAuth(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/users/${id}`, {
      method: "DELETE",
    })
  },
}

// Analytics API calls
export const analyticsApi = {
  getDashboardStats: async () => {
    return fetchWithAuth("/analytics/dashboard")
  },

  getSalesData: async () => {
    return fetchWithAuth("/analytics/sales")
  },

  getProductPerformance: async () => {
    return fetchWithAuth("/analytics/products/performance")
  },

  getInventoryTrends: async () => {
    return fetchWithAuth("/analytics/inventory/trends")
  },

  getCustomerMetrics: async () => {
    return fetchWithAuth("/analytics/customers")
  },
}
