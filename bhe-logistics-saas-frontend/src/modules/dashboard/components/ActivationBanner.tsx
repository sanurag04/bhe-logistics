import '../../../styles/activation-banner.css';

const ActivationBanner: React.FC = () => {
    return (
        <div className="activation-banner">
            {/* Left Content */}
            <div className="activation-content">
                <h2 className="activation-title">
                    Congrats, your account has been activated
                </h2>

                <p className="activation-subtitle">
                    Go ahead and create your shipment now to start shipping
                </p>

                <button type="button" className="activation-button">
                    Create your first shipment
                </button>
            </div>

            {/* Right Illustration */}
            <img
                src="/box-illustration.png"
                alt="Shipment illustration"
                className="activation-image"
            />
        </div>
    );
};

export default ActivationBanner;
