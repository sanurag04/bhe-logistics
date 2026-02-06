/** @format */
import { useState } from 'react';
import {
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Box,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);

	const handleLogout = () => {
		// TODO: clear auth tokens / context
		localStorage.clear();
		window.location.href = '/login';
	};

	return (
		<>
			<IconButton
				onClick={(e) => setAnchorEl(e.currentTarget)}
				disableRipple
				sx={{
					'&:focus': {
						outline: 'none',
						boxShadow: 'none',
					},
					'&:focus-visible': {
						outline: 'none',
						boxShadow: 'none',
					},
					'&:active': {
						outline: 'none',
						boxShadow: 'none',
					},
				}}>
				<Avatar
					sx={{
						bgcolor: '#3f51b5',
						width: 36,
						height: 36,
						fontSize: 14,
						fontWeight: 600,
					}}>
					<img
						src="/profile-image.png"
						alt="Profile"
						style={{
							height: 32,
							borderRadius: '50%',
						}}
					/>
				</Avatar>
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={() => setAnchorEl(null)}
				PaperProps={{
					sx: { width: 180, borderRadius: 2 },
				}}>
				<MenuItem onClick={handleLogout}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							color: '#000',
						}}>
						<LogoutIcon fontSize="small" />
						<Typography fontSize={14} color={'#000'} fontWeight={600}>
							Logout
						</Typography>
					</Box>
				</MenuItem>
			</Menu>
		</>
	);
}
