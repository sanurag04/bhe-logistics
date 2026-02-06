/** @format */

import {
	Box,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Typography,
	Divider,
	InputAdornment,
	Stack,
} from '@mui/material';
import '../../../styles/RateCalculatorStyle/rate-form.css';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useForm } from 'react-hook-form';

export type RateFormValues = {
	origin: string;
	destination: string;
	packageType: string;
	weight: string;
	dimensions: {
		length: string;
		width: string;
		height: string;
	};
	paymentMode: 'PREPAID' | 'COD';
};

const blackLabelSx = {
	fontSize: '12px',
	color: '#000 !important',
	'&.Mui-focused': {
		color: '#000 !important',
	},
	'&.MuiInputLabel-shrink': {
		color: '#000 !important',
	},
};

type Props = {
	onSubmit: (values: RateFormValues) => void;
};

const denseInput = {
	'& .MuiInputBase-input': {
		fontSize: '12px',
		padding: '6px 8px',
		height: '14px',
	},
};

export default function RateForm({ onSubmit }: Props) {
	const { register, handleSubmit } = useForm<RateFormValues>({
		defaultValues: {
			packageType: 'Plastic cover/Flyer',
			paymentMode: 'PREPAID',
			dimensions: { length: '1', width: '1', height: '1' },
		},
	});

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				border: '1px solid #dbe1ff',
				borderRadius: 2,
				p: 2,
				background: '#fff',
				'& .MuiInputLabel-root': {
					color: '#000',
					fontSize: '12px',
				},
				'& .MuiInputLabel-root.Mui-focused': {
					color: '#000',
				},
			}}>
			{/* TAB */}
			<Typography
				align="center"
				fontSize={13}
				fontWeight={600}
				color="#4f5dff"
				mb={1}>
				Domestic
			</Typography>
			<Divider sx={{ mb: 2 }} />

			{/* PINCODES */}
			<Typography fontSize={13} fontWeight={500} mb={1} color='text.primary'>
				Pickup and delivery pincode
			</Typography>

			<Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
				<TextField
					size="small"
					{...register('origin')}
					defaultValue="411045"
					sx={denseInput}
					InputLabelProps={{
						sx: blackLabelSx,
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<FiberManualRecordIcon sx={{ fontSize: 10, color: 'green' }} />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<Typography fontSize={12} fontWeight={600} color="green">
									MH
								</Typography>
							</InputAdornment>
						),
					}}
				/>

				<Box sx={{ height: 1, flex: 1, background: '#e5e7eb' }} />

				<TextField
					size="small"
					{...register('destination')}
					defaultValue="221106"
					sx={denseInput}
					InputLabelProps={{
						sx: blackLabelSx,
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<FiberManualRecordIcon sx={{ fontSize: 10, color: 'red' }} />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<Typography fontSize={12} fontWeight={600} color="green">
									UP
								</Typography>
							</InputAdornment>
						),
					}}
				/>
			</Box>

			<Box display="flex" justifyContent="space-between" mb={2}>
				<Typography fontSize={11} color="text.secondary">
					Pune, Maharashtra
				</Typography>
				<Typography fontSize={11} color="text.secondary">
					Varanasi, Uttar Pradesh
				</Typography>
			</Box>

			{/* PACKAGE TYPE + WEIGHT */}
			<Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
				<FormControl size="small" fullWidth>
					<InputLabel sx={{ fontSize: 12 }}>Package Type</InputLabel>
					<Select
						label="Package Type"
						defaultValue="Plastic cover/Flyer"
						sx={{
							fontSize: 12,
							'& .MuiSelect-select': { padding: '6px 8px' },
						}}
						{...register('packageType')}>
						<MenuItem value="Plastic cover/Flyer">
							<Stack direction="row" spacing={1} alignItems="center">
								<DescriptionOutlinedIcon fontSize="small" />
								<Typography fontSize={12} color="text.primary">Plastic cover/Flyer</Typography>
							</Stack>
						</MenuItem>
						<MenuItem value="Cardboard Box">
							<Stack direction="row" spacing={1} alignItems="center">
								<Inventory2OutlinedIcon fontSize="small" />
								<Typography fontSize={12} color="text.primary">Cardboard Box</Typography>
							</Stack>
						</MenuItem>
					</Select>
				</FormControl>

				<TextField
					size="small"
					label="Package Weight"
					defaultValue="500"
					sx={denseInput}
					InputLabelProps={{
						sx: blackLabelSx,
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Box
									sx={{
										background: '#f3f4f6',
										px: 1,
										py: '6px',
										borderRadius: 1,
										fontSize: 11,
										color: '#6b7280',
									}}>
									gm
								</Box>
							</InputAdornment>
						),
					}}
					{...register('weight')}
				/>
			</Box>

			<Typography fontSize={11} color="text.secondary" mb={2}>
				Package weight: sum of item's weight and weight of packaging (e.g. box)
			</Typography>

			{/* DIMENSIONS */}
			<Typography fontSize={12} fontWeight={500} mb={1} color='text.primary'>
				Package Dimensions
			</Typography>

			<Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1.5} mb={2}>
				{(['length', 'width', 'height'] as const).map((key) => (
					<TextField
						key={key}
						size="small"
						defaultValue="1"
						sx={denseInput}
						InputLabelProps={{
							sx: blackLabelSx,
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Typography fontSize={11} color="text.secondary">
										cm
									</Typography>
								</InputAdornment>
							),
						}}
						{...register(`dimensions.${key}`)}
					/>
				))}
			</Box>

			{/* VOLUMETRIC INFO */}
			<div className="volumetric-box">
				<strong>ⓘ Volumetric weight calculation</strong>
				<p>
					🚚 Surface: L * B * H / Volumetric Divisor <br />
					(1 x 1 x 1 / 5000 = <b>0.20 grams</b>)
				</p>
			</div>

			{/* PAYMENT MODE */}
			<Typography fontSize={12} fontWeight={500} mb={0.5} color='text.primary'>
				Payment Mode
			</Typography>

			<RadioGroup row defaultValue="PREPAID">
				<FormControlLabel
					value="PREPAID"
					control={<Radio size="small" />}
					label={<Typography fontSize={12} color="text.primary">Prepaid</Typography>}
				/>
				<FormControlLabel
					value="COD"
					control={<Radio size="small" />}
					label={<Typography fontSize={12} color="text.primary">Cash on Delivery (COD)</Typography>}
				/>
			</RadioGroup>
		</Box>
	);
}
