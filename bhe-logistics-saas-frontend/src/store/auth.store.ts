/** @format */

import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import type { Role } from '../types/auth';

type AuthState = {
	token: string | null;
	role: Role | null;
	franchiseId: string | null;
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
};

type JwtPayload = {
	role?: Role;
	franchiseId?: string;
};

export const useAuthStore = create<AuthState>((set) => ({
	token: null,
	role: null,
	franchiseId: null,
	isAuthenticated: false,
	login: (token) => {
		const payload = jwtDecode<JwtPayload>(token);
		set({
			token,
			role: payload.role ?? null,
			franchiseId: payload.franchiseId ?? null,
			isAuthenticated: true,
		});
	},
	logout: () => {
		set({
			token: null,
			role: null,
			franchiseId: null,
			isAuthenticated: false,
		});
	},
}));
