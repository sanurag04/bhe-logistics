/** @format */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
	Drawer,
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import { HEADER_HEIGHT } from '../constants/layout';
import { useUiStore } from '../store/ui.store';
import { useAuthStore } from '../store/auth.store';
import { franchiseMenu, superAdminMenu } from './sidebar.menu';
import type { JSX } from 'react';

const OPEN_WIDTH = 245;
const CLOSED_WIDTH = 64;

type MenuChild = {
	path?: string;
};

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

	information: <InfoOutlinedIcon />,
	rateCalculator: <CalculateOutlinedIcon />,
	rateCard: <ListAltOutlinedIcon />,
	pincode: <PinDropOutlinedIcon />,
	packaging: <InventoryOutlinedIcon />,
	restricted: <GavelOutlinedIcon />,
	awb: <ConfirmationNumberOutlinedIcon />,
	terms: <DescriptionOutlinedIcon />,
};

export default function Sidebar() {
	const location = useLocation();
	const isActiveRoute = (path?: string) => {
		if (!path) return false;
		return location.pathname === path;
	};

	const isChildActive = (children?: MenuChild[]) => {
		if (!children) return false;
		return children.some(
			(child) => !!child.path && location.pathname.startsWith(child.path),
		);
	};

	const activeStyles = {
		backgroundColor: 'rgba(255,255,255,0.08)',
		color: '#fff',
		borderRadius: '10px',
		mx: 1,
	};
const navigate = useNavigate();
const [manualOpenLabel, setManualOpenLabel] = useState<string | null>(null);

const toggleMenu = (label: string) => {
	setManualOpenLabel((prev) => (prev === label ? null : label));
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
						const isOpen = manualOpenLabel === item.label;

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
									sx={{
										px: 2,
										borderBottom: '1px solid rgba(255,255,255,0.08)',
										my:
											isActiveRoute(item.path) || isChildActive(item.children)
												? 0.6  
												: 0,
										...(isActiveRoute(item.path) || isChildActive(item.children)
											? activeStyles
											: {}),
										'&:hover': {
											backgroundColor: 'rgba(255,255,255,0.08)',
										},
									}}>
									{item.icon && (
										<ListItemIcon
											sx={{
												color: '#fff',
												minWidth: 40,
												// color:
												// 	isActiveRoute(item.path) ||
												// 	isChildActive(item.children)
												// 		? '#000'
												// 		: '#fff',
											}}>
											{iconMap[item.icon]}
										</ListItemIcon>
									)}

									{isSidebarOpen && (
										<>
											<Tooltip
												title={item.label}
												placement="right"
												arrow
												disableHoverListener={!isSidebarOpen}>
												<ListItemText
													primary={item.label}
													primaryTypographyProps={{
														fontWeight:
															isActiveRoute(item.path) ||
															isChildActive(item.children)
																? 500
																: 400,
															 
														// color:
														// 	isActiveRoute(item.path) ||
														// 	isChildActive(item.children)
														// 		? '#000'
														// 		: '#fff',
													}}
												/>
											</Tooltip>
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
												// sx={{
												// 	pl: 4.5,
												// 	py: 0.8,
												// 	color: '#fff',
												// 	'&:hover': {
												// 		backgroundColor: 'rgba(255,255,255,0.08)',
												// 	},
												// }}
												sx={{
													pl: 2,
													py: 0.8,
													mx: 2.5,
													borderRadius: '8px',
													color: '#fff',
													borderBottom: '1px solid rgba(255,255,255,0.08)',
													// color: isActiveRoute(child.path) ? '#000' : '#cbd5f5',
													backgroundColor: isActiveRoute(child.path)
														? 'rgba(255,255,255,0.08)'
														: 'transparent',
													'&:hover': {
														backgroundColor: isActiveRoute(child.path)
															? 'rgba(255,255,255,0.08)'
															: 'rgba(255,255,255,0.08)',
													},
												}}>
												{child.icon && (
													<ListItemIcon
														sx={{
															minWidth: 32,
															color: '#cbd5f5',
														}}
														// sx={{
														// 	minWidth: 32,
														// 	color: isActiveRoute(child.path)
														// 		? '#000'
														// 		: '#cbd5f5',
														// }}
													>
														{iconMap[child.icon]}
													</ListItemIcon>
												)}

												<Tooltip title={child.label} placement="right" arrow>
													<ListItemText
														primary={child.label}
														primaryTypographyProps={{
															fontSize: 13,
															// fontWeight: isActiveRoute(child.path) ? 600 : 400,
															//  color: isActiveRoute(child.path) ? '#000' : '#cbd5f5',
														}}
													/>
												</Tooltip>
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
