export interface SidebarMenuItem {
	label: string;
	icon?: string;
	path?: string;
	children?: SidebarMenuItem[];
}

export const franchiseMenu: SidebarMenuItem[] = [
	{
		label: 'Dashboard',
		icon: 'dashboard',
		path: '/fr-home/dashboard',
	},
	{
		label: 'Shipments',
		icon: 'shipment',
		children: [
			{ label: 'Create Shipment', icon: 'createShipment', path: '/fr-home/shipments/create' },
			{ label: 'All Shipments', icon: 'allShipments', path: '/fr-home/shipments' },
			{ label: 'Tracking', icon: 'tracking', path: '/fr-home/shipments/tracking' },
		],
	},
	{
		label: 'Wallet',
		icon: 'wallet',
		children: [
			{ label: 'Balance', icon: 'balance', path: '/fr-home/wallet' },
			{ label: 'Transactions', icon: 'transactions', path: '/fr-home/wallet/transactions' },
		],
	},
	{
		label: 'Information Center',
		icon: 'information',
		children: [
			{ label: 'Rate Calculator', icon: 'rateCalculator', path: '/information-center/rate-calculator' },
			{ label: 'Rate Card', icon: 'rateCard', path: '/information-center/rate-card' },
			{ label: 'Pincode Serviceability', icon: 'pincode', path: '/information-center/pincode-serviceability' },
			{ label: 'Packaging Guide', icon: 'packaging', path: '/information-center/packaging-guide' },
			{ label: 'Restricted Items', icon: 'restricted', path: '/information-center/restricted-items' },
			{ label: 'Terms & Conditions', icon: 'terms', path: '/information-center/terms-conditions' },
			{ label: 'Fetch AWB Numbers', icon: 'awb', path: '/information-center/fetch-awb' },
		],
	},
	{
		label: 'Settings',
		icon: 'settings',
		path: '/fr-home/settings',
	},
];

export const superAdminMenu: SidebarMenuItem[] = [
	{
		label: 'Dashboard',
		icon: 'dashboard',
		path: '/admin/dashboard',
	},
	{
		label: 'Settings',
		icon: 'settings',
		path: '/admin/settings',
	},
];
