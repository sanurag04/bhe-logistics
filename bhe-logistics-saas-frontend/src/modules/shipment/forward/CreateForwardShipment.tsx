/** @format */
import {
	Box,
	Grid,
	Card,
	CardContent,
	Typography,
	FormControl,
	TextField,
	Select,
	MenuItem,
	Button,
	IconButton,
	Radio,
	RadioGroup,
	FormControlLabel,
	Checkbox,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import UndoIcon from '@mui/icons-material/Undo';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import './create-forward-shipment.css';
import AddSellerDialog from '../components/AddSellerDialog/AddSellerDialog';
import AddCustomerDialog from '../components/AddCustomerDialog/AddCustomerDialog';
import VerticalStepIndicator from '../../../components/common/VerticalStepIndicator/VerticalStepIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type CostRowProps = {
	label: string;
	value: string;
	bold?: boolean;
};

const CostRow = ({ label, value, bold = false }: CostRowProps) => (
	<Box display="flex" justifyContent="space-between" alignItems="center">
		<Typography
			fontSize="12px"
			fontWeight={bold ? 600 : 500}
			sx={{ color: '#000' }}>
			{label}
		</Typography>
		<Typography
			fontSize="12px"
			fontWeight={bold ? 600 : 500}
			sx={{ color: '#000' }}>
			{value}
		</Typography>
	</Box>
);

const CreateForwardShipment = () => {
	const [openSeller, setOpenSeller] = useState(false);
	const [openCustomer, setOpenCustomer] = useState(false);

	// const [boxOption, setBoxOption] = useState<number | 'more' | null>(null);
	const [customBoxCount, setCustomBoxCount] = useState<number | ''>('');

	// 	-------Use this logic when submitting the form--------
	// 	const finalBoxCount =
	//   boxOption === 'more' ? customBoxCount : boxOption;

	return (
		<Box className="cfs-root">
			<Grid
				container
				spacing={3}
				alignItems="flex-start"
				justifyContent="center"
				marginBottom={3}>
				{/* LEFT SECTION */}
				<Grid
					size={{ xs: 10, md: 5 }}
					className="cfs-left-col"
					sx={{ display: 'grid', gap: 3 }}>
					{/* Order Details */}
					<Card className="cfs-card">
						<CardContent>
							<div className="cfs-card-header">
								<ShoppingBasketOutlinedIcon className="cfs-card-icon" />
								<Typography className="cfs-title">Order Details</Typography>
							</div>
							<TextField
								fullWidth
								label="Order ID / Reference Number"
								placeholder="Enter Order ID / Reference Number"
								size="small"
								InputLabelProps={{
									sx: {
										fontSize: '12px',
										lineHeight: '16px',
										fontWeight: 500,
										fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
									},
								}}
							/>
						</CardContent>
					</Card>

					{/* Shipment Details */}
					<Card className="cfs-card">
						<CardContent>
							{/* Header */}
							<div className="cfs-card-header">
								<ShoppingBasketOutlinedIcon className="cfs-card-icon" />
								<Typography className="cfs-title">Shipment Details</Typography>
							</div>

							<Grid container spacing={2}>
								{/* Shipment Description */}
								<Grid size={{ xs: 8 }} sx={{ pt: 3 }}>
									<TextField
										fullWidth
										label="Shipment Description"
										placeholder="Enter a description of the item"
										size="small"
										InputLabelProps={{
											sx: {
												fontSize: '12px',
												lineHeight: '16px',
												fontWeight: 500,
												fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
											},
										}}
									/>
								</Grid>

								{/* Item Count */}
								<Grid size={{ xs: 4 }}>
									<Typography className="cfs-field-label cfs-title">
										Item Count
									</Typography>
									<Box className="cfs-counter-input">
										<IconButton size="small">
											<RemoveIcon />
										</IconButton>
										<Typography
											className="cfs-counter-value"
											sx={{ color: 'black' }}>
											0
										</Typography>
										<IconButton size="small">
											<AddIcon />
										</IconButton>
									</Box>
								</Grid>

								{/* Product Category (INPUT style) */}
								<Grid size={{ xs: 6 }}>
									<TextField
										fullWidth
										label="Product Category"
										placeholder="Select Product Category"
										size="small"
										InputLabelProps={{
											sx: {
												fontSize: '12px',
												lineHeight: '16px',
												fontWeight: 500,
												fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
											},
										}}
									/>
								</Grid>

								{/* HSN Code */}
								<Grid size={{ xs: 6 }}>
									<TextField
										fullWidth
										label="HSN Code (Optional)"
										placeholder="Enter HSN Code"
										size="small"
										InputLabelProps={{
											sx: {
												fontSize: '12px',
												lineHeight: '16px',
												fontWeight: 500,
												fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
											},
										}}
									/>
								</Grid>

								{/* Shipment / Tax / Total row */}
								<Grid size={{ xs: 12 }}>
									{/* TOP ROW: Inputs + Symbols */}
									<div className="cfs-value-row-top">
										<div className="cfs-value-col">
											<TextField
												fullWidth
												label="Shipment Value"
												placeholder="Enter Item Value"
												size="small"
												InputLabelProps={{
													sx: {
														fontSize: '12px',
														lineHeight: '16px',
														fontWeight: 500,
														fontFamily:
															'"IBM Plex Sans", ui-sans-serif, system-ui',
													},
												}}
											/>
										</div>

										<div className="cfs-math-symbol">+</div>

										<div className="cfs-value-col">
											<TextField
												fullWidth
												label="Tax Value"
												placeholder="Enter Tax Value"
												size="small"
												InputLabelProps={{
													sx: {
														fontSize: '12px',
														lineHeight: '16px',
														fontWeight: 500,
														fontFamily:
															'"IBM Plex Sans", ui-sans-serif, system-ui',
													},
												}}
											/>
										</div>

										<div className="cfs-math-symbol">=</div>

										<div className="cfs-value-col">
											<TextField
												fullWidth
												label="Total Value"
												placeholder="Enter Total Value"
												size="small"
												InputLabelProps={{
													sx: {
														fontSize: '12px',
														lineHeight: '16px',
														fontWeight: 500,
														fontFamily:
															'"IBM Plex Sans", ui-sans-serif, system-ui',
													},
												}}
											/>
										</div>
									</div>

									{/* BOTTOM ROW: Helper Text */}
									<div className="cfs-value-row-bottom">
										<Typography
											sx={{ color: 'black', fontSize: '12px' }}
											className="cfs-helper-text">
											Total value without tax
										</Typography>
										<span /> {/* spacer */}
										<span /> {/* spacer */}
										<Typography
											sx={{
												color: 'black',
												fontSize: '12px',
												paddingRight: '20px',
											}}
											className="cfs-helper-text">
											Auto Calculated (Editable)
										</Typography>
									</div>

									{/* Fragile Checkbox */}
									<Grid size={{ xs: 12 }}>
										<FormControlLabel
											control={<Checkbox size="small" />}
											label="My package contains fragile items"
											sx={{
												fontSize: 12,
												color: '#000',
												'& .MuiFormControlLabel-label': {
													color: '#000',
													fontSize: 12,
												},
											}}
										/>
									</Grid>
								</Grid>
							</Grid>
						</CardContent>
					</Card>

					{/* Payment Details */}
					<Card className="cfs-card">
						<CardContent>
							{/* Header */}
							<Box display="flex" alignItems="center" gap={1.5} mb={3}>
								<AccountBalanceWalletOutlinedIcon className="cfs-card-icon" />
								<Typography className="cfs-title" sx={{ py: 2 }}>
									Payment Details
								</Typography>{' '}
							</Box>

							<Grid container spacing={2}>
								<Grid size={{ xs: 6 }}>
									<TextField
										fullWidth
										label="Invoice Number (Optional)"
										size="small"
										InputLabelProps={{
											sx: {
												fontSize: '12px',
												lineHeight: '16px',
												fontWeight: 500,
												fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
											},
										}}
									/>
								</Grid>

								<Grid size={{ xs: 6 }}>
									<TextField
										fullWidth
										label="Invoice Date (Optional)"
										size="small"
										InputLabelProps={{
											sx: {
												fontSize: '12px',
												lineHeight: '16px',
												fontWeight: 500,
												fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
											},
										}}
									/>
								</Grid>

								<Grid size={{ xs: 6 }}>
									<Select
										fullWidth
										size="small"
										value="PREPAID"
										sx={{
											height: '2.3rem',
											'& .MuiSelect-select': {
												fontSize: '12px !important',
												fontWeight: 500,
												fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
											},
										}}>
										<MenuItem value="PREPAID">PREPAID</MenuItem>
										<MenuItem value="COD">COD</MenuItem>
									</Select>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>

				{/* RIGHT SECTION */}
				<Grid
					size={{ xs: 12, md: 4 }}
					className="cfs-right-col"
					sx={{ display: 'grid', gap: 3 }}>
					{/* Delivery Details */}
					<Card className="cfs-card">
						<CardContent>
							{/* Header */}
							<Box display="flex" alignItems="center" gap={1.5} mb={2}>
								<LocationOnOutlinedIcon className="cfs-card-icon" />
								<Typography className="cfs-title">Delivery Details</Typography>
								<InfoOutlinedIcon fontSize="small" sx={{ color: '#9ca3af' }} />
							</Box>

							{/* Timeline + Content */}
							<Box display="flex" gap={2}>
								{/* Timeline */}
								<Box className="cfs-timeline">
									<VerticalStepIndicator activeStep="seller" />
								</Box>

								{/* Content */}
								<Box flex={1}>
									{/* Facility */}
									<FormControl fullWidth size="small" sx={{ mb: 2 }}>
										{/* <InputLabel shrink>Select Facility</InputLabel> */}
										<Select
											value="Select Facility"
											size="small"
											sx={{
												height: '2.3rem',
												'& .MuiSelect-select': {
													fontSize: '12px !important',
													fontWeight: 500,
													fontFamily:
														'"IBM Plex Sans", ui-sans-serif, system-ui',
												},
											}}>
											<MenuItem value="Select Facility">
												Select Facility
											</MenuItem>
											<MenuItem value="BHE1">BHE1</MenuItem>
											<MenuItem value="BHE2">BHE2</MenuItem>
										</Select>
									</FormControl>

									{/* Seller */}
									<Box className="cfs-seller-row">
										<Button
											sx={{ paddingLeft: '2rem' }}
											onClick={() => setOpenSeller(true)}
											fullWidth
											variant="text"
											startIcon={<EditOutlinedIcon />}
											className="cfs-link-btn">
											Add Seller Details
										</Button>
									</Box>

									{/* Popup */}
									<AddSellerDialog
										open={openSeller}
										onClose={() => setOpenSeller(false)}
									/>

									{/* Customer */}
									<Box className="cfs-customer-row">
										<Button
											onClick={() => setOpenCustomer(true)}
											fullWidth
											variant="text"
											startIcon={<PersonAddAltOutlinedIcon />}
											className="cfs-link-btn">
											Add Customer Details
										</Button>
									</Box>

									<AddCustomerDialog
										open={openCustomer}
										onClose={() => setOpenCustomer(false)}
									/>
								</Box>
							</Box>
						</CardContent>
					</Card>

					<Card className="cfs-card">
						<CardContent>
							<Typography className="cfs-title">Box Details</Typography>

							<Typography
								className="cfs-label"
								sx={{
									fontSize: 14,
									'& .MuiFormControlLabel-label': {
										fontSize: 12,
									},
								}}>
								How many boxes will you ship?
							</Typography>

							<Box display="flex" alignItems="center" gap={1} width="100%">
								{/* Radios (fixed width) */}
								<RadioGroup row sx={{ flexShrink: 0 }}>
									{[1, 2, 3, 4, 5].map((v) => (
										<FormControlLabel
										key={v}
										value={v}
										label={v}
										control={<Radio />}
											sx={{
												mr: 1, 
												'& .MuiFormControlLabel-label': {
													color: '#000',
													fontWeight: 500,
												},
											}}
										/>
									))}
								</RadioGroup>

								{/* Auto-expanding input */}
								<TextField
									type="number"
									size="small"
									placeholder="6+"
									value={customBoxCount}
									onChange={(e) => setCustomBoxCount(Number(e.target.value))}
									inputProps={{ min: 6 }}
									sx={{
										flex: 1, // ✅ THIS is what was missing
										minWidth: 0, // ✅ IMPORTANT for flexbox
										backgroundColor: '#fff',
										borderRadius: '6px',
										'& .MuiInputBase-input': {
											textAlign: 'center',
											fontWeight: 500,
											padding: '6px 8px',
										},
									}}
								/>
							</Box>

							{/* <RadioGroup
								row
								value={boxOption}
								onChange={(e) =>
									setBoxOption(
										e.target.value === 'more' ? 'more' : Number(e.target.value),
									)
								}
								sx={{ alignItems: 'center', gap: 1 }}>
								{[1, 2, 3, 4, 5].map((v) => (
									<FormControlLabel
										key={v}
										value={v}
										label={v}
										control={
											<Radio
												sx={{
													color: '#000',
													'&.Mui-checked': { color: '#000' },
												}}
											/>
										}
										sx={{
											'& .MuiFormControlLabel-label': {
												color: '#000',
												fontWeight: 500,
											},
										}}
									/>
								))}

 								<FormControlLabel
									value="more"
									control={
										<Radio
											sx={{
												color: '#000',
												'&.Mui-checked': { color: '#000' },
											}}
										/> 
									}
									sx={{
											'& .MuiFormControlLabel-label': {
												color: '#000',
												fontWeight: 500,
												fontSize: 12,
											},
										}}
									label="more than 5"
								/>

 								{boxOption === 'more' && (
									<TextField
										type="number"
										size="small"
										value={customBoxCount} 
										onChange={(e) => setCustomBoxCount(Number(e.target.value))}
										inputProps={{
											min: 6,
											style: { textAlign: 'center' },
										}}
										sx={{
											width: 80,
											color: '#000',
											'& .MuiInputBase-input': {
												padding: '3px 0',
											},
											ml: 1,
											'& input': {
												fontWeight: 500,
											},
										}}
									/>
								)}
							</RadioGroup> */}

							<Grid size={{ xs: 12 }}>
								<Select
									fullWidth
									size="small"
									value="Select"
									sx={{
										color: '#000 !important',
										height: '2.3rem',
										'& .MuiSelect-select': {
											fontSize: '12px !important',
											color: '#000 !important',
											fontWeight: 500,
											fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
										},
									}}>
									<MenuItem value="Select">Select Package Type</MenuItem>
									<MenuItem value="Plastic">Plastic cover/Flyer</MenuItem>
									<MenuItem value="Cardboard">Cardboard Box</MenuItem>
								</Select>

								<Typography variant="caption" color="text.secondary">
									Select package which will be used to ship
								</Typography>
							</Grid>

							<Box className="cfs-dimension">
								<TextField
									label="L"
									size="small"
									InputLabelProps={{
										sx: {
											fontSize: '12px',
											lineHeight: '16px',
											fontWeight: 500,
											fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
										},
									}}
								/>
								<TextField
									label="B"
									size="small"
									InputLabelProps={{
										sx: {
											fontSize: '12px',
											lineHeight: '16px',
											fontWeight: 500,
											fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
										},
									}}
								/>
								<TextField
									label="H"
									size="small"
									InputLabelProps={{
										sx: {
											fontSize: '1px',
											lineHeight: '16px',
											fontWeight: 500,
											fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
										},
									}}
								/>
								<Box className="cfs-unit">cm</Box>
							</Box>
							<Typography variant="caption" color="text.secondary">
								Length + Breadth + Height should be at-least 15 cm
							</Typography>

							<TextField
								fullWidth
								label="Packaged Weight"
								size="small"
								sx={{ mt: 2 }}
								InputLabelProps={{
									sx: {
										fontSize: '12px',
										lineHeight: '16px',
										fontWeight: 500,
										fontFamily: '"IBM Plex Sans", ui-sans-serif, system-ui',
									},
								}}
							/>
							<Typography variant="caption" color="text.secondary">
								Packaged weight should be at least 50 grams
							</Typography>

							<Divider sx={{ my: 2 }} />

							{/* Total Chargeable Weight */}
							<div className="volumetric-box">
								<strong>Total Chargeable Weight ⓘ</strong>
								<p>
									(Calculated based on the dimensions and weight you entered){' '}
									<br />
									(-- grams)
								</p>
							</div>

							<Typography className="cfs-label">
								Choose shipping mode
							</Typography>

							<Box className="cfs-shipping-modes">
								<Card className="cfs-mode active">
									<LocalShippingIcon />
									<Typography sx={{ color: 'black', fontSize: '12px' }}>
										SURFACE
									</Typography>
								</Card>

								<Card className="cfs-mode">
									<UndoIcon />
									<Typography sx={{ color: 'black', fontSize: '12px' }}>
										EXPRESS
									</Typography>
								</Card>
							</Box>

							<Divider sx={{ my: 2 }} />

							<Accordion
								disableGutters
								elevation={0}
								sx={{
									color: '#000',
									borderTop: '1px solid #e5e7eb',
									borderBottom: '1px solid #e5e7eb',
									'&:before': { display: 'none' },
								}}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}
									sx={{
										px: 0,
										minHeight: 40,
										'& .MuiAccordionSummary-expandIconWrapper': {
											color: '#6b7280',
											ml: 'auto',
										},
										'& .MuiAccordionSummary-content': {
											margin: 0,
										},
									}}>
									<Typography
										fontWeight={600}
										fontSize={13}
										color="text.primary">
										Shipping Cost Breakup
									</Typography>
								</AccordionSummary>

								<AccordionDetails sx={{ px: 0, pt: 0.5, pb: 1 }}>
									<Box display="flex" flexDirection="column" gap={0.75}>
										<CostRow label="Freight Cost" value="--" />
										<Divider sx={{ borderColor: '#e5e7eb' }} />
										<CostRow label="Fuel Surcharge" value="--" />
										<Divider sx={{ borderColor: '#e5e7eb' }} />
										<CostRow label="GST - 18% (CGST+SGST)" value="--" />
										<Divider sx={{ borderColor: '#e5e7eb' }} />
										<CostRow label="Total" value="--" bold />
									</Box>
								</AccordionDetails>
							</Accordion>
							<Divider sx={{ my: 2 }} />

							<div className="volumetric-box">
								<p>
									(ⓘ Shipping cost will be based on total weight and shipping
									mode)
								</p>
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* FOOTER ACTIONS */}
			<Box className="cfs-footer">
				<Button variant="contained">Cancel</Button>
				<Button variant="contained">Create Forward Shipment</Button>
			</Box>
		</Box>
	);
};

export default CreateForwardShipment;
