/** @format */
import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const franchises = ['MWBARANI FRANCHISE', 'DELHI HUB', 'MUMBAI CENTRAL'];

export default function FranchiseSwitcher() {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [active, setActive] = useState(franchises[0]);

	return (
		<>
			<Button
				onClick={(e) => setAnchorEl(e.currentTarget)}
				endIcon={<KeyboardArrowDownIcon />}
				startIcon={<LocalShippingIcon />}
				sx={{
					textTransform: 'none',
					backgroundColor: '#fff',
					borderRadius: 1,
					px: 1.5,
					height: 40,
					'&:hover': {
						backgroundColor: '#e0e0e0',
					},
                    border: '1px solid #dfe3e8',
				}}>
				<Box textAlign="left">
					<Typography fontSize={12} fontWeight={800} color={"black"}>
						Domestic
					</Typography>
					<Typography fontSize={10} color="text.secondary">
						{active}
					</Typography>
				</Box>
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}>
				{franchises.map((f) => (
					<MenuItem
						key={f}
						onClick={() => {
							setActive(f);
							setAnchorEl(null);
						}}>
						{f}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
