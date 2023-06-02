export const ROUTES = {
  HOME: '/',
  PLANTS: {
    LIST: '/plantas',
    DETAIL: (id: string) => `/plantas/${id}`,
  },
};

export const ENDPOINTS = {
  DEVICES: '/dispositivos',
  PLANTS: '/tipos-de-planta',
};
