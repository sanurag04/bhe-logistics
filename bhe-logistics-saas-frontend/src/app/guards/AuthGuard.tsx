/** @format */

import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

type AuthGuardProps = {
	children?: ReactNode;
};

function AuthGuard({ children }: AuthGuardProps) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children ?? <Outlet />;
}

export default AuthGuard;
