import '../../../styles/ActionRequiredCard.css';

interface ActionItem {
  label: string;
  value: number;
}

const actionItems: ActionItem[] = [
  { label: 'High Risk Orders', value: 0 },
  { label: 'Bad Addresses', value: 0 },
  { label: 'To Be Shipped', value: 0 },
  { label: 'Exceptions and NDR', value: 0 },
];

const ActionRequiredCard: React.FC = () => {
  return (
    <div className="action-card">
      <div className="action-header">
        <span className="action-icon">!</span>
        Action Required
      </div>

      <div className="action-grid">
        {actionItems.map((item) => (
          <div key={item.label} className="action-item">
            <div className="action-value">{item.value}</div>
            <div className="action-label">{item.label}</div>
            <button className="action-link">Act now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionRequiredCard;
