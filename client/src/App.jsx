
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SurveyForm from "./components/SurveyForm.jsx";
import VoteChart from "./components/VoteChart.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SurveyForm />,
  },
  {
    path: '/voting-result',
    element: <VoteChart />,
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App
