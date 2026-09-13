import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import { Dashboard } from './pages/user/Dashboard';
import { EmailScanner } from './components/scanner/EmailScanner';
import { URLScanner } from './components/scanner/URLScanner';

const Layout = () => (
  <div className="min-h-screen bg-gray-950 text-white">
    <nav className="p-4 border-b border-gray-800 flex gap-4">
      <Link to="/">Dashboard</Link>
      <Link to="/scan-email">Email Scanner</Link>
      <Link to="/scan-url">URL Scanner</Link>
    </nav>
    <main className="p-8">
      <Outlet />
    </main>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "scan-email", element: <EmailScanner /> },
      { path: "scan-url", element: <URLScanner /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
