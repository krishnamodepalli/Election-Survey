
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home.jsx';
import ExtendedForm from './pages/ExtendedForm.jsx';
import Results from './pages/Results.jsx';
import useFetchVoteData from "./hooks/useFetchVoteData.jsx";

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
  useFetchVoteData();
  return (
      <RouterProvider router={router} />
  );
}

export default App;
