/** @format */

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export interface AuthUser {
	id: string;
	name: string;
	email: string;
	role: Role;
}
