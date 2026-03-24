import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './pages/Login';
import { SignIn } from './pages/SignIn';
import { Questionnaire } from './pages/Questionnaire';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

// 导入三个新的子页面组件
import { YieldBenchmarkingPage } from './pages/Dashboard/YieldBenchmarkingPage';
import { CostAnalysisPage } from './pages/Dashboard/CostAnalysisPage';
import { FarmPracticesPage } from './pages/Dashboard/FarmPracticesPage';

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
    // 问卷页面保留登录保护
    element: (
      <ProtectedRoute>
        <Questionnaire />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    // 这里移除了 ProtectedRoute，让任何人都可以直接查看数据大屏
    element: <Dashboard />,
    children: [
      { index: true, element: <Navigate to="yield-benchmarking" replace /> },
      { path: 'yield-benchmarking', element: <YieldBenchmarkingPage /> },
      { path: 'cost-analysis', element: <CostAnalysisPage /> },
      { path: 'farm-practice', element: <FarmPracticesPage /> },
    ],
  },
  {
    path: '*',
    element: <Login />,
  },
]);