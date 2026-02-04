/** @format */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import api from '../../services/api';
import { useAuthStore } from '../../store/auth.store';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setIsLoading(true);
		try {
			const response = await api.post('/auth/login', {
				email,
				password,
			});
			const token = response.data.data?.access_token as string | undefined;
			if (!token) {
				setError('Login failed. Please try again.');
				return;
			}
			login(token);
			const { role } = useAuthStore.getState();
			if (role === 'SUPER_ADMIN') {
				navigate('/admin', { replace: true });
				return;
			}
			navigate('/franchise', { replace: true });
		} catch {
			setError('Login failed. Please check your credentials.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className="
      fixed inset-0 z-[9999]
      flex items-center justify-center
      bg-[#f4f6f8]
    "
			style={{
				backgroundImage: "url('/login_bg.png')",
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center bottom',
				width: '100vw',
				height: '100vh',
			}}>
			{/* Login Card */}
			<div className="w-full max-w-md px-4">
				<div
					className="rounded-2xl bg-white shadow-2xl min-h-[450px] flex flex-col"
					style={{ padding: '1rem' }}>
					{/* Header – Logo only */}
					<div className="flex items-center justify-center px-8 pt-10 pb-6">
						<div style={{display:"grid"}}>
						<img
							src="/bhe-logo.png"
							alt="BHE Logistics"
							className="w-[70%] h-auto object-contain"
						/>
						<p style={{color:"#000"}}>Your Trusted Logistics Partner</p></div>
					</div>

					{/* Body */}
					<div className="flex-1 px-8 pb-8 flex flex-col justify-center">
						{/* Form */}
						<form
							onSubmit={handleSubmit}
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1.5rem',
							}}>
							{error && (
								<div style={{marginLeft:"1rem"}} className="rounded-lg border border-red-100 px-4 py-3 text-sm text-red-600">
									{error}
								</div>
							)}

							<TextField
								fullWidth
								label="Email"
								size="small"
								variant="outlined"
								placeholder="Enter your email ID"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isLoading}
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: '10px',
										height: 44,
										backgroundColor: '#fff',

										'& input': {
											color: '#000',
										},

										'& input:-webkit-autofill': {
											WebkitBoxShadow: '0 0 0 1000px #fff inset',
											WebkitTextFillColor: '#000',
											caretColor: '#000',
											transition: 'background-color 9999s ease-in-out 0s',
										},

										'& input:-webkit-autofill:focus': {
											WebkitBoxShadow: '0 0 0 1000px #fff inset',
											WebkitTextFillColor: '#000',
										},
									},
								}}
							/>

							<TextField
								fullWidth
								label="Password"
								size="small"
								variant="outlined"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: '10px',
										height: 44,
										backgroundColor: '#fff',

										'& input': {
											color: '#000',
										},

										'& input:-webkit-autofill': {
											WebkitBoxShadow: '0 0 0 1000px #fff inset',
											WebkitTextFillColor: '#000',
											caretColor: '#000',
											transition: 'background-color 9999s ease-in-out 0s',
										},

										'& input:-webkit-autofill:focus': {
											WebkitBoxShadow: '0 0 0 1000px #fff inset',
											WebkitTextFillColor: '#000',
										},
									},
								}}
							/>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full rounded-lg bg-[#1d1f2a] py-3.5 text-sm font-bold text-white hover:bg-black transition disabled:opacity-60">
								{isLoading ? 'Signing in…' : 'Continue'}
							</button>
						</form>
					</div>
					{/* End Body */}
				</div>
			</div>
		</div>
	);
}

export default Login;
