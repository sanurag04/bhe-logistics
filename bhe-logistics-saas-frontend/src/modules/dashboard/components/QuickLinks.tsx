/** @format */

import { useNavigate } from 'react-router-dom';
import "../../../styles/QuickLinks.css";

const QuickLinks: React.FC = () => {
	const navigate = useNavigate();
    const openKnowledgeBase = () => {
		window.open('https://help.delhivery.com/', '_blank', 'noopener,noreferrer');
	};

	return (
		<div className="quick-links-grid">
			<div
				className="quick-link-card"
				onClick={openKnowledgeBase}
				role="button"
			>
				<span className="quick-link-icon">📘</span>
				<p className="quick-link-text">Knowledge Base</p>
			</div>

			<div
				className="quick-link-card"
				onClick={() => navigate('/fr-home/information-center/rate-calculator')}
				role="button"
			>
				<span className="quick-link-icon">🧮</span>
				<p className="quick-link-text">Rate Calculator</p>
			</div>
		</div>
	);
};

export default QuickLinks;
