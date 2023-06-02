import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home, Plants } from '../pages';
import { Layout } from '../layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: '/plants',
            element: <Plants />,
          },
        ],
      },
    ],
  },
]);

export default router;
