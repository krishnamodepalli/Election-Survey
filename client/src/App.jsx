
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home.jsx';
import ExtendedForm from './pages/ExtendedForm.jsx';
import Results from './pages/Results.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/extend',
    element: <ExtendedForm />
  },
  {
    path: '/voting-result',
    element: <Results />,
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
