/** @format */

import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

type RoleGuardProps = {
	allowedRoles: string[];
	children?: ReactNode;
};

function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
	const role = useAuthStore((state) => state.role);
	const location = useLocation();

	if (!role) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	if (!allowedRoles.includes(role)) {
		return <div>Forbidden</div>;
	}

	return children ?? <Outlet />;
}

export default RoleGuard;
