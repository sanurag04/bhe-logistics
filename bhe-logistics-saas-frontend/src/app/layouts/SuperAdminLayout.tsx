/** @format */

import { Outlet } from 'react-router-dom';

function SuperAdminLayout() {
	return (
		<div>
			<aside>
				<nav aria-label="Super Admin">
					<ul>
						<li>Dashboard</li>
						<li>Franchises</li>
						<li>Wallets</li>
						<li>Shipments</li>
						<li>Reports</li>
						<li>Settings</li>
					</ul>
				</nav>
			</aside>
			<header>Header</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default SuperAdminLayout;
