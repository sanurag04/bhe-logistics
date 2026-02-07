/** @format */

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { HEADER_HEIGHT } from '../constants/layout';
import AwbSearch from '../components/header/AwbSearch';
import QuickActions from '../components/header/QuickActions';
import FranchiseSwitcher from '../components/header/FranchiseSwitcher';
import UserMenu from '../components/header/UserMenu';

export default function Header() {
	return (
		<AppBar
			position="fixed"
			elevation={1}
			sx={{
				height: HEADER_HEIGHT,
				width: '100%',
				left: 0,
				backgroundColor: '#eaf3fc',
				color: '#000',
				zIndex: 1201,
			}}>
			<Toolbar
				sx={{
					minHeight: HEADER_HEIGHT,
					display: 'flex',
					justifyContent: 'space-between',
				}}>
				{/* 🔹 LEFT: LOGO */}
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> 
					<Box
						component="img"
						src="/bhe-header-logo.png"
						alt="BHE"
						sx={{
							height: {
								xs: 28,
								sm: 32,
								md: 38,
								lg: 42,
							},
						}}
					/> 
					<Typography
						className="custom-css-1miy0lu-MuiTypography-root"
						sx={{
							fontWeight: 700,
							lineHeight: 1.1,
							fontSize: {
								xs: '14px', 
								sm: '16px',  
								md: '18px',  
								lg: '20px',  
								xl: '22px',  
							},
						}}>
						Your Logistics Partner
					</Typography>
				</Box>
				{/* CENTER */}
				<AwbSearch />

				{/* RIGHT */}
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<QuickActions />
					<FranchiseSwitcher />
					<UserMenu />
				</Box>
			</Toolbar>
		</AppBar>
	);
}
