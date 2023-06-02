export const ROUTES = {
  HOME: '/',
  PLANTS: {
    LIST: '/plantas',
    DETAIL: (id: string) => `/plantas/${id}`,
  },
};

export const ENDPOINTS = {
  DEVICES: {
    LIST: '/dispositivos',
    DETAIL: (id: string) => `/dispositivos/${id}`,
  },
  PLANTS: '/tipos-de-planta',
};
