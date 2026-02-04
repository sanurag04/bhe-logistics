/** @format */

import {
	Drawer,
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SettingsIcon from '@mui/icons-material/Settings';

import { useUiStore } from '../store/ui.store';
import { useAuthStore } from '../store/auth.store';
import { franchiseMenu, superAdminMenu } from './sidebar.menu';
import type { JSX } from 'react';

const OPEN_WIDTH = 260;
const CLOSED_WIDTH = 64;

const iconMap: Record<string, JSX.Element> = {
	dashboard: <DashboardIcon />,
	shipment: <LocalShippingIcon />,
	wallet: <CurrencyRupeeIcon />,
	settings: <SettingsIcon />,
};

export default function Sidebar() {
	const { role } = useAuthStore();
	const menuItems = role === 'SUPER_ADMIN' ? superAdminMenu : franchiseMenu;

	const { isSidebarOpen, isSidebarPinned, openSidebar, closeSidebar } =
		useUiStore();

	const drawerWidth = isSidebarOpen ? OPEN_WIDTH : CLOSED_WIDTH;

	return (
		<Drawer
			variant="permanent"
			onMouseEnter={() => !isSidebarPinned && openSidebar()}
			onMouseLeave={() => !isSidebarPinned && closeSidebar()}
			sx={{
				flexShrink: 0,
				whiteSpace: 'nowrap',
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					transition: 'width 0.25s ease',
					overflowX: 'hidden',
					boxSizing: 'border-box',
					backgroundColor: '#0f172a',
					color: '#fff',
				},
			}}>
			<Box sx={{ mt: 8 }}>
				<List>
					{menuItems.map((item) => (
						<ListItemButton key={item.label}>
							<ListItemIcon sx={{ color: '#fff' }}>
								{iconMap[item.icon]}
							</ListItemIcon>
							{isSidebarOpen && <ListItemText primary={item.label} />}
						</ListItemButton>
					))}
				</List>
			</Box>
		</Drawer>
	);
}
