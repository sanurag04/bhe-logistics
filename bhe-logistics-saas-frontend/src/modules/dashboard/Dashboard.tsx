/** @format */

import { Link } from 'react-router-dom';
import CreateShipmentCard from './components/CreateShipmentCard';
function Dashboard() {
	return (
		<div className="space-y-8">
			<header>
				<h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
			</header>
			<section className="space-y-4">
				<h2 className="text-lg font-semibold text-slate-900">
					Create Shipment
				</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<CreateShipmentCard
						title="Forward"
						description="Create a forward shipment"
					/>
					<CreateShipmentCard title="Bulk" description="Book bulk shipments" />
					<CreateShipmentCard
						title="Reverse"
						description="Initiate a reverse shipment"
					/>
					<CreateShipmentCard title="Pickup" description="Schedule a pickup" />
				</div>
			</section>
			<section className="space-y-2">
				<h2 className="text-lg font-semibold text-slate-900">
					Action Required
				</h2>
				<div>Placeholder</div>
			</section>
			<section className="space-y-2">
				<h2 className="text-lg font-semibold text-slate-900">Performance</h2>
				<div>Placeholder</div>
			</section>
			<section className="space-y-2">
				<h2 className="text-lg font-semibold text-slate-900">
					Information Center
				</h2>
				<div>
					<Link
						className="text-sm font-medium text-slate-700 hover:text-slate-900"
						to="/franchise/information-center/rate-calculator">
						Rate Calculator
					</Link>
				</div>
			</section>
		</div>
	);
}

export default Dashboard;
