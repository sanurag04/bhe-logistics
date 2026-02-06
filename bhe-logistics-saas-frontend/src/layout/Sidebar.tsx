/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Drawer,
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SettingsIcon from '@mui/icons-material/Settings';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';


import { HEADER_HEIGHT } from '../constants/layout';
import { useUiStore } from '../store/ui.store';
import { useAuthStore } from '../store/auth.store';
import { franchiseMenu, superAdminMenu } from './sidebar.menu';
import type { JSX } from 'react';

const OPEN_WIDTH = 225;
const CLOSED_WIDTH = 64;

const iconMap: Record<string, JSX.Element> = {
	dashboard: <DashboardIcon />,
	shipment: <LocalShippingIcon />,
	createShipment: <AddBoxOutlinedIcon />,
	allShipments: <Inventory2OutlinedIcon />,
	tracking: <LocationOnOutlinedIcon />,
	wallet: <CurrencyRupeeIcon />,
	balance: <AccountBalanceWalletOutlinedIcon />,
	transactions: <ReceiptLongOutlinedIcon />,
	settings: <SettingsIcon />,
};

export default function Sidebar() {
	const navigate = useNavigate();
	const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

	const toggleMenu = (label: string) => {
		setOpenMenus((prev) => ({
			...prev,
			[label]: !prev[label],
		}));
	};

	const { role } = useAuthStore();
	const menuItems = role === 'SUPER_ADMIN' ? superAdminMenu : franchiseMenu;

	const {
		isSidebarOpen,
		isSidebarPinned,
		openSidebar,
		closeSidebar,
		togglePin,
	} = useUiStore();

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
					height: `calc(100vh - ${HEADER_HEIGHT}px)`,
					mt: `${HEADER_HEIGHT}px`,
					transition: 'width 0.25s ease',
					overflowX: 'hidden',
					boxSizing: 'border-box',
					backgroundColor: '#0f172a',
					color: '#fff',
				},
			}}>
			{/* 🔹 SIDEBAR TOP (PROFILE + PIN) */}
			<Box
				sx={{
					height: 64,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					px: 2,
					borderBottom: '1px solid rgba(255,255,255,0.08)',
				}}>
				<img
					src="/profile-image.png"
					alt="Profile"
					style={{
						height: 32,
						borderRadius: '50%',
					}}
				/>

				{isSidebarOpen && (
					<Box
						onClick={togglePin}
						sx={{
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
						}}>
						<img
							src={isSidebarPinned ? '/pin-img.png' : '/unpin-img.png'}
							alt={isSidebarPinned ? 'Pinned' : 'Unpinned'}
							style={{
								height: 22,
								userSelect: 'none',
								opacity: 0.9,
							}}
						/>
					</Box>
				)}
			</Box>

			{/* 🔹 MENU */}
			<Box sx={{ mt: 1 }}>
				<List>
					{menuItems.map((item) => {
						const hasChildren = !!item.children?.length;
						const isOpen = openMenus[item.label];

						return (
							<React.Fragment key={item.label}>
								<ListItemButton
									onClick={() => {
										if (hasChildren) {
											toggleMenu(item.label);
										} else if (item.path) {
											navigate(item.path);
										}
									}}
									sx={{ px: 2 }}>
									{item.icon && (
										<ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>
											{iconMap[item.icon]}
										</ListItemIcon>
									)}

									{isSidebarOpen && (
										<>
											<ListItemText primary={item.label} />
											{hasChildren &&
												(isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
										</>
									)}
								</ListItemButton>

								{/* 🔹 SUB MENU */}
								{hasChildren && isOpen && isSidebarOpen && (
									<List disablePadding>
										{item.children!.map((child) => (
											<ListItemButton
												key={child.label}
												onClick={() => child.path && navigate(child.path)}
												sx={{
													pl: 4.5, // ✅ reduced indent
													py: 0.8,
													color: '#cbd5f5',
													'&:hover': {
														backgroundColor: 'rgba(255,255,255,0.08)',
													},
												}}>
												{child.icon && (
													<ListItemIcon
														sx={{
															minWidth: 32, // ✅ important
															color: '#cbd5f5',
														}}>
														{iconMap[child.icon]}
													</ListItemIcon>
												)}

												<ListItemText
													primary={child.label}
													primaryTypographyProps={{
														fontSize: 13,
													}}
												/>
											</ListItemButton>
										))}
									</List>
								)}
							</React.Fragment>
						);
					})}
				</List>
			</Box>
		</Drawer>
	);
}
