import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AuthGuard from '../guards/AuthGuard';
import RoleGuard from '../guards/RoleGuard';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../../layout/MainLayout';

import Login from '../../modules/auth/Login';
import Dashboard from '../../modules/dashboard/Dashboard';
import RateCalculator from '../../modules/information-center/RateCalculator';
import ForwardShipment from '../../modules/shipment/ForwardShipment';
import AdminDashboard from '../../modules/admin/AdminDashboard';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<AuthGuard />}>
          {/* SUPER ADMIN */}
          <Route element={<RoleGuard allowedRoles={['SUPER_ADMIN']} />}>
            <Route element={<MainLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* FRANCHISE USERS */}
          <Route
            element={
              <RoleGuard allowedRoles={['ADMIN', 'MANAGER', 'EMPLOYEE']} />
            }
          >
            <Route element={<MainLayout />}>
              <Route path="/franchise" element={<Dashboard />} />
              <Route path="/franchise/dashboard" element={<Dashboard />} />
              <Route
                path="/franchise/shipments/forward"
                element={<ForwardShipment />}
              />
              <Route
                path="/franchise/information-center/rate-calculator"
                element={<RateCalculator />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
