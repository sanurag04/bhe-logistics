/** @format */

import {
	Box,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
	Divider,
	Stack,
} from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import type { CarrierRate } from '../../shipment/services/rate.service.ts';

type RateResultTableProps = {
	results: CarrierRate[];
};

export default function RateResultTable({ results }: RateResultTableProps) {
	// Temporary fallback (until API wiring is finalized)
	const rate = results[0];

	if (!rate) {
		return (
			<Box
				sx={{
					border: '1px dashed #d1d5db',
					borderRadius: 2,
					p: 4,
					textAlign: 'center',
					color: '#9ca3af',
					fontSize: 13,
				}}
			>
				Enter details to view rates
			</Box>
		);
	}

	return (
		<Box
			sx={{
				border: '1px solid #e0e7ff',
				borderRadius: 2,
				p: 2,
				background: '#fff',
			}}
		>
			{/* MODE TABS */}
			<ToggleButtonGroup
				exclusive
				fullWidth
				value="FORWARD"
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
						<Typography fontSize={14} fontWeight={600}>
							Surface
						</Typography>

						<Stack direction="row" alignItems="baseline" spacing={1} mt={0.5}>
							<Typography fontSize={28} fontWeight={700}>
								₹{rate.rate.toFixed(2)}
							</Typography>
							<Typography fontSize={12} color="text.secondary">
								/ Delivery in {rate.estimatedDeliveryDays ?? 1} days
							</Typography>
						</Stack>
					</Box>

					<LocalShippingOutlinedIcon
						sx={{ fontSize: 44, color: '#9ca3af' }}
					/>
				</Stack>

				<Divider sx={{ my: 1.5 }} />

				<Typography fontSize={12} color="text.secondary">
					ⓘ Shipping cost: ₹{(rate.rate * 0.85).toFixed(2)} + GST charge: ₹
					{(rate.rate * 0.15).toFixed(2)}
				</Typography>
			</Box>

			{/* CTA */}
			<Box
				sx={{
					mt: 2,
					textAlign: 'center',
					fontSize: 13,
					color: '#4f46e5',
					cursor: 'pointer',
				}}
			>
				View Detailed Rate Card
			</Box>
		</Box>
	);
}
