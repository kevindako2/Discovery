import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage';
import { AdminDashboard } from '../components/AdminDashboard';
import { PartnerDashboard } from '../components/PartnerDashboard';
import { ReportFormatCreator } from '../components/ReportFormatCreator';
import { ProjectCreator } from '../components/ProjectCreator';
import { AccountSettings } from '../components/AccountSettings';
import { AppSettings } from '../components/AppSettings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/partner',
    element: <PartnerDashboard />,
  },
  {
    path: '/admin/report-formats',
    element: <ReportFormatCreator />,
  },
  {
    path: '/admin/projects',
    element: <ProjectCreator />,
  },
  {
    path: '/account',
    element: <AccountSettings />,
  },
  {
    path: '/settings',
    element: <AppSettings />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
