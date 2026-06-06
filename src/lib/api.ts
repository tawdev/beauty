const DEFAULT_LOCAL_API = 'http://127.0.0.1:8000/api';
const BUILD_FETCH_TIMEOUT_MS = 8000;

function getApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  // On Vercel, never call localhost during build — fail fast so pages use fallbacks
  if (process.env.VERCEL) {
    return '';
  }

  return DEFAULT_LOCAL_API;
}

const API_BASE_URL = getApiBaseUrl();

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  if (!API_BASE_URL) {
    throw new Error('API URL is not configured. Set NEXT_PUBLIC_API_URL in Vercel.');
  }

  const isServer = typeof window === 'undefined';
  const token = !isServer ? window.localStorage.getItem('auth_token') : null;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), BUILD_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      ...(isServer
        ? { cache: 'no-store' as RequestCache, next: { revalidate: 0 } }
        : {}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  products: {
    getAll: () => fetchApi('/products'),
    getById: (id: string) => fetchApi(`/products/${id}`),
  },
  categories: {
    getAll: () => fetchApi('/categories'),
  },
  services: {
    getAll: () => fetchApi('/services'),
  },
  bookings: {
    create: (data: any) => fetchApi('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  orders: {
    create: (data: any) => fetchApi('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  reviews: {
    getAll: (params?: { product_id?: string; service_id?: string }) => {
      const searchParams = new URLSearchParams(params as any);
      return fetchApi(`/reviews?${searchParams.toString()}`);
    },
    create: (data: any) => fetchApi('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  admin: {
    getStats: () => fetchApi('/admin/stats'),
    getBookings: () => fetchApi('/admin/bookings'),
    updateBookingStatus: (id: number | string, status: string) => fetchApi(`/admin/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
    getOrders: () => fetchApi('/admin/orders'),
    updateOrderStatus: (id: number | string, status: string) => fetchApi(`/admin/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
    createProduct: (data: any) => fetchApi('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    updateProduct: (id: number | string, data: any) => fetchApi(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    deleteProduct: (id: number | string) => fetchApi(`/products/${id}`, {
      method: 'DELETE',
    }),
  },
  auth: {
    login: (data: any) => fetchApi('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    register: (data: any) => fetchApi('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
};
