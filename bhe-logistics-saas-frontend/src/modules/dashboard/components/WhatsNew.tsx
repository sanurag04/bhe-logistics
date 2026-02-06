import '../../../styles/WhatsNewItem.css';

interface WhatsNewItem {
    title: string;
    description: string;
    badge?: string;
}

const whatsNewItems: WhatsNewItem[] = [
    {
        title: 'Direct Intracity Shipping',
        description: 'Hire bikes or trucks to deliver goods',
    },
    {
        title: 'Secure with Delhivery Protect',
        description: 'Get cover up to ₹30,000 per shipment',
        badge: 'New',
    },
    {
        title: 'Auto-topup using Remittances',
        description: 'Topup your wallet automatically',
    },
    {
        title: 'Proactive Shipment Communication',
        description: 'Get real time shipment updates',
    },
    {
        title: 'Refer & Earn',
        description: 'Refer Delhivery with others & earn cashback',
    },
];

const WhatsNew: React.FC = () => {
    return (
        <div className="whats-new-card">
            <h3 className="whats-new-title">What’s New</h3>

            <div className="whats-new-list">
                {whatsNewItems.map((item) => (
                    <div key={item.title} className="whats-new-item">
                        <span className="whats-new-dot">•</span>

                        <div className="whats-new-content">
                            <div className="whats-new-item-title">
                                {item.title}
                                {item.badge && (
                                    <span className="whats-new-badge">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <div className="whats-new-item-desc">
                                {item.description}
                            </div>
                        </div>

                        <span className="whats-new-arrow">›</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhatsNew;
