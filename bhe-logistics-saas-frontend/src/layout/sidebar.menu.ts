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
		label: 'Shipments & Pickups',
		icon: 'shipment',
		children: [
			{ label: 'Create Forward Shipment', icon: 'createShipment', path: '/fr-home/shipments/forward/create' },
			{ label: 'Create Reverse Shipment', icon: 'reverseShipment', path: '/fr-home/shipments/reverse/create' },
			{ label: 'Pickup Requests', icon: 'pickupRequests', path: '/fr-home/shipments/pickup-requests/domestic' },
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
			{ label: 'Rate Calculator', icon: 'rateCalculator', path: '/fr-home/information-center/rate-calculator' },
			{ label: 'Rate Card', icon: 'rateCard', path: '/fr-home/information-center/rate-card' },
			{ label: 'Pincode Serviceability', icon: 'pincode', path: '/fr-home/information-center/pincode-serviceability' },
			{ label: 'Packaging Guide', icon: 'packaging', path: '/fr-home/information-center/packaging-guide' },
			{ label: 'Restricted Items', icon: 'restricted', path: '/fr-home/information-center/restricted-items' },
			{ label: 'Terms & Conditions', icon: 'terms', path: '/fr-home/information-center/terms-conditions' },
			{ label: 'Fetch AWB Numbers', icon: 'awb', path: '/fr-home/information-center/fetch-awb' },
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
