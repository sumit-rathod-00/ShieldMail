import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/user/Dashboard';
import { LandingPage } from './pages/LandingPage';
import { EmailScanner } from './components/scanner/EmailScanner';
import { URLScanner } from './components/scanner/URLScanner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { adminAuth } from './services/adminAuth';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  return adminAuth.isLoggedIn() ? <>{children}</> : <Navigate to="/admin/login" />;
};

const AppLayout = () => (
  <div className="min-h-screen bg-[#030712] text-white">
    <main>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </main>
  </div>
);

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'scan-email', element: <EmailScanner /> },
      { path: 'scan-url', element: <URLScanner /> },
      { path: 'admin/login', element: <AdminLogin /> },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
