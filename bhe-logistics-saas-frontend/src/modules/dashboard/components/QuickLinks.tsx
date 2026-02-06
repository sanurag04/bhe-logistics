import "../../../styles/QuickLinks.css";

const QuickLinks: React.FC = () => {
    return (
        <div className="quick-links-grid">
            <div className="quick-link-card">
                <span className="quick-link-icon">📘</span>
                <p className="quick-link-text">Knowledge Base</p>
            </div>

            <div className="quick-link-card">
                <span className="quick-link-icon">🧮</span>
                <p className="quick-link-text">Rate Calculator</p>
            </div>
        </div>
    );
};

export default QuickLinks;
