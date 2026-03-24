import { createBrowserRouter } from 'react-router';
import { Login } from './pages/Login';
import { SignIn } from './pages/SignIn';
import { Questionnaire } from './pages/Questionnaire';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/questionnaire',
    element: (
      <ProtectedRoute>
        <Questionnaire />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Login />,
  },
]);
