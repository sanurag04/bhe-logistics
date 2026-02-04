/** @format */

import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

import { useUiStore } from '../store/ui.store';
import {
	SIDEBAR_OPEN_WIDTH,
	SIDEBAR_CLOSED_WIDTH,
	HEADER_HEIGHT,
} from '../constants/layout';

export default function Header() {
	const { isSidebarOpen, isSidebarPinned } = useUiStore();

	const sidebarWidth = isSidebarOpen
		? SIDEBAR_OPEN_WIDTH
		: SIDEBAR_CLOSED_WIDTH;

	return (
		<AppBar
			position="fixed"
			elevation={1}
			sx={{
				height: HEADER_HEIGHT,
				width: `calc(100% - ${sidebarWidth}px)`,
				ml: `${sidebarWidth}px`,
				backgroundColor: '#ffffff',
				color: '#000',
				transition: 'width 0.25s ease, margin-left 0.25s ease',
			}}>
			<Toolbar sx={{ minHeight: HEADER_HEIGHT }}>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					Logistics
				</Typography>

				<IconButton>
					{isSidebarPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
