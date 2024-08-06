
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/Login';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/auth/SignUp';


function App() {
  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Login />
    },
    {
      path: "landing",
      element: <LandingPage />
    },
    {
      path: "/signup",
      element: <SignUp />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
