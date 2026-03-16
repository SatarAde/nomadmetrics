import React from "react";
import { Trip } from "../types";

interface TripCardProps {
  trip: Trip;
  onClick?: (trip: Trip) => void;
}

const statusColors: Record<Trip["status"], string> = {
  completed: "#7DB88A",
  upcoming: "#D4893A",
  planning: "#9A8E7E",
};

const TripCard: React.FC<TripCardProps> = ({ trip, onClick }) => {
  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderStars = (rating: number): string => {
    if (rating === 0) return "Not yet rated";
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div
      className="trip-card"
      onClick={() => onClick?.(trip)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(trip)}
    >
      <div className="trip-card-header">
        <span className="trip-emoji">{trip.emoji}</span>
        <span
          className="trip-status-badge"
          style={{ color: statusColors[trip.status] }}
        >
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </span>
      </div>

      <div className="trip-card-body">
        <div className="trip-continent">{trip.continent}</div>
        <h3 className="trip-country">{trip.country}</h3>
        <p className="trip-cities">{trip.city}</p>

        <div className="trip-dates">
          {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
        </div>

        <div className="trip-tags">
          {trip.tags.map((tag) => (
            <span key={tag} className="trip-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="trip-card-footer">
        <div className="trip-cost">
          <span className="trip-cost-label">
            {trip.status === "planning" ? "Est. budget" : "Total"}
          </span>
          <span className="trip-cost-value">
            ${trip.cost.toLocaleString()}
          </span>
        </div>
        <div className="trip-meta">
          <span className="trip-days">{trip.days}d</span>
          <span className="trip-rating">{renderStars(trip.rating)}</span>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
