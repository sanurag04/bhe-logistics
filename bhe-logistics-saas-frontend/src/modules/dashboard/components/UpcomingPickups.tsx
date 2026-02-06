import "../../../styles/UpcomingPickups.css";

const UpcomingPickups: React.FC = () => {
    return (
        <div className="up-card">
            <div className="up-header">
                <div className="up-title">
                    <span className="up-icon">🚚</span>
                    Upcoming Pickups
                </div>

                <button type="button" className="up-create-btn">
                    + Create New Pickup
                </button>
            </div>

            <div className="up-empty">
                <p className="up-empty-title">No upcoming pickups</p>
                <p className="up-empty-subtitle">
                    Your upcoming pickup requests appear here
                </p>
            </div>
        </div>
    );
};

export default UpcomingPickups;
