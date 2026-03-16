import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changePositive?: boolean;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  changePositive = true,
  icon,
}) => {
  return (
    <div className="stat-card">
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className={`stat-change ${changePositive ? "positive" : "negative"}`}>
          {changePositive ? "↑" : "↓"} {change}
        </div>
      )}
    </div>
  );
};

export default StatCard;
