const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const isServer = typeof window === 'undefined';

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    ...(isServer
      ? { cache: 'no-store' as RequestCache, next: { revalidate: 0 } }
      : {}),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
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
