/** @format */

import axios, { AxiosHeaders } from 'axios';
import { useAuthStore } from '../store/auth.store';

const api = axios.create({
	baseURL: 'http://localhost:3000/api/v1',
});

api.interceptors.request.use((config) => {
	const { token } = useAuthStore.getState();
	if (token) {
		config.headers = new AxiosHeaders(config.headers);
		config.headers.set('Authorization', `Bearer ${token}`);
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) {
			useAuthStore.getState().logout();
			window.location.assign('/login');
		}
		return Promise.reject(error);
	},
);

export default api;
