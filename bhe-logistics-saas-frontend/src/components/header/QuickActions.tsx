/** @format */
import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const actions = [
	'Create a forward shipment',
	'Create forward shipments in bulk',
	'Create a reverse pickup shipment',
	'Create a pickup request',
];

export default function QuickActions() {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
					'&:hover': {
						backgroundColor: '#e0e0e0',
					},
					border: '1px solid #dfe3e8',
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
					<MenuItem key={item}>
						<Typography
							sx={{
								fontFamily: 'IBM Plex Sans',
								fontStyle: 'normal',
								fontWeight: 500,
								fontSize: '.875rem',
								lineHeight: '1.25rem',
								color: '#3d445c',
							}}
							fontSize={14}>
							{item}
						</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
