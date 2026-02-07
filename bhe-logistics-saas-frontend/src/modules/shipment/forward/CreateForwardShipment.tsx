/** @format */
import {
	Box,
	Grid,
	Card,
	CardContent,
	Typography,
	FormControl,
	InputLabel,
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
} from '@mui/material';

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

const CreateForwardShipment = () => {
	return (
		<Box className="cfs-root">
			<Grid container spacing={3}>
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
									/>
								</Grid>

								{/* HSN Code */}
								<Grid size={{ xs: 6 }}>
									<TextField
										fullWidth
										label="HSN Code (Optional)"
										placeholder="Enter HSN Code"
										size="small"
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
											/>
										</div>

										<div className="cfs-math-symbol">+</div>

										<div className="cfs-value-col">
											<TextField
												fullWidth
												label="Tax Value"
												placeholder="Enter Tax Value"
												size="small"
											/>
										</div>

										<div className="cfs-math-symbol">=</div>

										<div className="cfs-value-col">
											<TextField
												fullWidth
												label="Total Value"
												placeholder="Enter Total Value"
												size="small"
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
									/>
								</Grid>

								<Grid size={{ xs: 6 }}>
									<TextField
										fullWidth
										label="Invoice Date (Optional)"
										size="small"
									/>
								</Grid>

								<Grid size={{ xs: 6 }}>
									<Select fullWidth size="small" value="PREPAID">
										<MenuItem value="PREPAID">PREPAID</MenuItem>
										<MenuItem value="COD">COD</MenuItem>
									</Select>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>

				{/* RIGHT SECTION */}
				<Grid size={{ xs: 12, md: 4 }} className="cfs-right-col">
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
								<Box className="cfs-delivery-timeline">
									<span className="cfs-dot cfs-dot-orange" />
									<span className="cfs-line" />
									<span className="cfs-dot cfs-dot-green" />
								</Box>

								{/* Content */}
								<Box flex={1}>
									{/* Facility */}
									<FormControl fullWidth size="small" sx={{ mb: 2 }}>
										<InputLabel shrink>Select Facility</InputLabel>
										<Select displayEmpty>
											<MenuItem value="">Select Facility</MenuItem>
										</Select>
									</FormControl>

									{/* Seller */}
									<Button
										fullWidth
										variant="text"
										startIcon={<EditOutlinedIcon />}
										className="cfs-link-btn">
										Add Seller Details
									</Button>

									{/* Customer */}
									<Button
										fullWidth
										variant="text"
										startIcon={<PersonAddAltOutlinedIcon />}
										className="cfs-link-btn">
										Add Customer Details
									</Button>
								</Box>
							</Box>
						</CardContent>
					</Card>

					<Card className="cfs-card">
						<CardContent>
							<Typography className="cfs-title">Box Details</Typography>

							<Typography className="cfs-label">
								How many boxes will you ship?
							</Typography>

							<RadioGroup row>
								{[1, 2, 3, 4, 5].map((v) => (
									<FormControlLabel
										key={v}
										value={v}
										control={<Radio />}
										label={v}
									/>
								))}
							</RadioGroup>

							<Select fullWidth size="small" displayEmpty>
								<MenuItem value="">Select Package Type</MenuItem>
							</Select>

							<Box className="cfs-dimension">
								<TextField label="L" size="small" />
								<TextField label="B" size="small" />
								<TextField label="H" size="small" />
								<Box className="cfs-unit">cm</Box>
							</Box>

							<TextField
								fullWidth
								label="Packaged Weight"
								size="small"
								sx={{ mt: 2 }}
							/>

							<FormControlLabel
								control={<Checkbox />}
								label="My package contains fragile items"
								sx={{ mt: 1 }}
							/>

							<Divider sx={{ my: 2 }} />

							<Typography className="cfs-label">
								Choose shipping mode
							</Typography>

							<Box className="cfs-shipping-modes">
								<Card className="cfs-mode active">
									<LocalShippingIcon />
									<Typography sx={{ color: 'black' }}>SURFACE</Typography>
								</Card>

								<Card className="cfs-mode">
									<UndoIcon />
									<Typography sx={{ color: 'black' }}>EXPRESS</Typography>
								</Card>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* FOOTER ACTIONS */}
			<Box className="cfs-footer">
				<Button variant="outlined">Cancel</Button>
				<Button variant="contained">Create Forward Shipment</Button>
			</Box>
		</Box>
	);
};

export default CreateForwardShipment;
