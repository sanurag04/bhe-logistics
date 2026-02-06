/** @format */

import {
	Box,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
	Stack,
	Divider,
} from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

type Props = {
	mode?: 'FORWARD' | 'RTO' | 'REVERSE';
	price?: number;
	deliveryDays?: number;
	shippingCost?: number;
	gst?: number;
};

export default function RateSummaryPanel({
	mode = 'FORWARD',
	price = 218.06,
	deliveryDays = 6,
	shippingCost = 184.8,
	gst = 33.26,
}: Props) {
	return (
		<Box
			sx={{
				border: '1px solid #e0e7ff',
				borderRadius: 2,
				p: 2,
				background: '#fff',
			}}
		>
			{/* TOP TABS */}
			<ToggleButtonGroup
				value={mode}
				exclusive
				fullWidth
				sx={{
					mb: 2,
					'& .MuiToggleButton-root': {
						textTransform: 'none',
						fontSize: '13px',
						borderRadius: '999px',
						py: 1,
						border: '1px solid #e5e7eb',
					},
					'& .Mui-selected': {
						background: '#eef2ff !important',
						color: '#4f46e5',
						fontWeight: 600,
					},
				}}
			>
				<ToggleButton value="FORWARD">Forward</ToggleButton>
				<ToggleButton value="RTO">RTO</ToggleButton>
				<ToggleButton value="REVERSE">Reverse</ToggleButton>
			</ToggleButtonGroup>

			{/* RATE CARD */}
			<Box
				sx={{
					background: '#fafafa',
					borderRadius: 2,
					p: 2,
				}}
			>
				<Stack direction="row" justifyContent="space-between">
					<Box>
						<Typography fontSize={14} fontWeight={600} color="#4f5dff">
							Surface
						</Typography>

						<Stack direction="row" alignItems="baseline" spacing={1} mt={0.5}>
							<Typography fontSize={28} fontWeight={700} color="#4f5dff">
								₹{price.toFixed(2)}
							</Typography>
							<Typography fontSize={12} color="text.secondary">
								/ Delivery in {deliveryDays} days
							</Typography>
						</Stack>
					</Box>

					<LocalShippingOutlinedIcon
						sx={{ fontSize: 44, color: '#9ca3af' }}
					/>
				</Stack>

				<Divider sx={{ my: 1.5 }} />

				<Typography fontSize={12} color="text.secondary">
					ⓘ Shipping cost: ₹{shippingCost.toFixed(2)} + GST charge: ₹
					{gst.toFixed(2)}
				</Typography>
			</Box>
		</Box>
	);
}
