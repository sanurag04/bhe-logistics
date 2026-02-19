/** @format */
import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useNavigate } from 'react-router-dom';

const actions = [
	{
		label: 'Create a forward shipment',
		path: '/fr-home/shipments/forward/create',
	},
	{
		label: 'Create forward shipments in bulk',
		path: '/fr-home/shipments/forward/bulk-upload',
	},
	{
		label: 'Create a reverse pickup shipment',
		path: '/fr-home/shipments/reverse/create',
	},
	{
		label: 'Create a pickup request',
		path: '/fr-home/shipments/pickup-requests/domestic',
	},
];

export default function QuickActions() {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const navigate = useNavigate();

	const handleNavigate = (path: string) => {
		navigate(path);
		setAnchorEl(null); // close menu after click
	};

	return (
		<>
			<Button
				onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
					setAnchorEl(e.currentTarget)
				}
				startIcon={
					<Box
						sx={{
							background: '#000',
							color: '#fff',
							borderRadius: '50%',
							width: 28,
							height: 28,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<FlashOnIcon fontSize="small" />
					</Box>
				}
				sx={{
					textTransform: 'none',
					fontWeight: 600,
					backgroundColor: '#fff',
					borderRadius: 1,
					px: 1.5,
					height: 40,
					border: '1px solid #dfe3e8',
					'&:hover': { backgroundColor: '#e0e0e0' },
					'&:focus, &:focus-visible, &:active': {
						outline: 'none',
						boxShadow: 'none',
					},
				}}>
				Quick Actions
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
				PaperProps={{
					sx: { width: 320, mt: 1, borderRadius: 2 },
				}}>
				{actions.map((item) => (
					<MenuItem
						key={item.label}
						onClick={() => handleNavigate(item.path)}
					>
						<Typography
							sx={{
								fontFamily: 'IBM Plex Sans',
								fontWeight: 500,
								fontSize: '.875rem',
								lineHeight: '1.25rem',
								color: '#3d445c',
							}}>
							{item.label}
						</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
