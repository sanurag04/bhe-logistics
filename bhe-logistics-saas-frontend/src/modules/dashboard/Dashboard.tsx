/** @format */
import "../../styles/dashboard.css"
import ActivationBanner from './components/ActivationBanner';
import ActionRequiredCard from './components/ActionRequiredCard';
import UpcomingPickups from './components/UpcomingPickups';
import QuickLinks from './components/QuickLinks';
import WhatsNew from './components/WhatsNew';

const Dashboard: React.FC = () => {
	return (
		<div className="mx-auto max-w-7xl px-6 py-6">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12 dashboard-grid">
				{/* LEFT */}
				<div className="space-y-4 lg:col-span-9 dashboard-cards">
					<ActivationBanner />
					<ActionRequiredCard />
					<UpcomingPickups />
				</div>

				{/* RIGHT */}
				<div className="right-panel lg:col-span-3">
					<WhatsNew />
					<QuickLinks />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
