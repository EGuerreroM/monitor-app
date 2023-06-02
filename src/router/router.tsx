import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home, Plants } from '../pages';
import { Layout } from '../layout';
import { ROUTES } from '../constants';
import { PlantDetail } from '../pages/Plants';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: ROUTES.PLANTS.LIST,
            element: <Plants />,
          },
          {
            path: ROUTES.PLANTS.DETAIL(':id'),
            element: <PlantDetail />,
          },
        ],
      },
    ],
  },
]);

export default router;
