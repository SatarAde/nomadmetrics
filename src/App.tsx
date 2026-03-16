import React, { useState } from "react";
import StatCard from "./components/StatCard";
import TripCard from "./components/TripCard";
import SpendChart from "./components/SpendChart";
import { useTrips } from "./hooks/useTrips";
import { travelStats, monthlySpend, spendCategories, topDestinations } from "./data/travelData";
import { Trip } from "./types";
import "./styles/app.css";

type Page = "dashboard" | "trips" | "analytics";

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const {
    trips,
    stats,
    filterStatus,
    setFilterStatus,
    sortKey,
    setSortKey,
    searchQuery,
    setSearchQuery,
  } = useTrips();

  const handleTripClick = (trip: Trip) => {
    console.log("Trip clicked:", trip);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-logo">
          Nomad<span>Metrics</span>
        </div>
        <ul className="nav-links">
          {(["dashboard", "trips", "analytics"] as Page[]).map((page) => (
            <li key={page}>
              <button
                className={`nav-link ${activePage === page ? "active" : ""}`}
                onClick={() => setActivePage(page)}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <button className="nav-cta">Plan a Trip</button>
      </nav>

      <main className="main-content">
        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <div className="page dashboard-page">
            <div className="page-header">
              <div className="hero-badge">✦ 2024 Travel Report</div>
              <h1 className="hero-title">
                Your journeys,{" "}
                <em>beautifully</em> quantified.
              </h1>
              <p className="hero-sub">
                Track every mile, memory, and moment across your global adventures.
              </p>
            </div>

            <div className="stats-row">
              <StatCard label="Countries" value={travelStats.totalCountries} change="3 new this year" icon="🌍" />
              <StatCard label="Days Abroad" value={travelStats.totalDays} change="18% more than 2023" icon="📅" />
              <StatCard label="Miles Flown" value={`${(travelStats.totalMiles / 1000).toFixed(0)}k`} change="12.4% this year" icon="✈️" />
              <StatCard label="Total Spend" value={`$${(travelStats.totalSpend / 1000).toFixed(0)}k`} change="8% over budget" changePositive={false} icon="💰" />
            </div>

            <div className="dashboard-grid">
              <div className="card">
                <SpendChart data={monthlySpend} />
              </div>

              <div className="card">
                <h3 className="card-title">Top Destinations</h3>
                <div className="destinations-list">
                  {topDestinations.map((dest) => (
                    <div key={dest.country} className="dest-item">
                      <span className="dest-flag">{dest.flag}</span>
                      <div className="dest-info">
                        <span className="dest-name">{dest.country}</span>
                        <span className="dest-sub">{dest.cities.join(", ")}</span>
                      </div>
                      <div className="dest-bar-wrap">
                        <div className="dest-bar-bg">
                          <div
                            className="dest-bar-fill"
                            style={{ width: `${dest.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="dest-days">{dest.days}d</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRIPS */}
        {activePage === "trips" && (
          <div className="page trips-page">
            <div className="page-header">
              <h1 className="page-title">My Trips</h1>
              <p className="page-sub">
                {stats.completed} completed · {stats.upcoming} upcoming · {stats.totalDays} total days
              </p>
            </div>

            <div className="trips-controls">
              <input
                className="search-input"
                type="text"
                placeholder="Search by country, city, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="filter-row">
                {(["all", "completed", "upcoming", "planning"] as const).map((s) => (
                  <button
                    key={s}
                    className={`filter-chip ${filterStatus === s ? "active" : ""}`}
                    onClick={() => setFilterStatus(s)}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
                <select
                  className="sort-select"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as any)}
                >
                  <option value="date">Sort: Date</option>
                  <option value="cost">Sort: Cost</option>
                  <option value="days">Sort: Days</option>
                  <option value="rating">Sort: Rating</option>
                </select>
              </div>
            </div>

            {trips.length === 0 ? (
              <div className="empty-state">
                <p>No trips found matching your filters.</p>
              </div>
            ) : (
              <div className="trips-grid">
                {trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} onClick={handleTripClick} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS */}
        {activePage === "analytics" && (
          <div className="page analytics-page">
            <div className="page-header">
              <h1 className="page-title">Analytics</h1>
              <p className="page-sub">Deep-dive into your travel patterns and spending habits.</p>
            </div>

            <div className="analytics-grid">
              <div className="card wide-card">
                <h3 className="card-title">Spending Breakdown</h3>
                <div className="spend-list">
                  {spendCategories.map((cat) => (
                    <div key={cat.name} className="spend-row">
                      <span className="spend-icon">{cat.icon}</span>
                      <span className="spend-name">{cat.name}</span>
                      <div className="spend-bar-bg">
                        <div
                          className="spend-bar-fill"
                          style={{
                            width: `${cat.percentage}%`,
                            background: cat.color,
                          }}
                        />
                      </div>
                      <span className="spend-amount">
                        ${cat.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <SpendChart data={monthlySpend} />
              </div>

              <div className="card">
                <h3 className="card-title">Travel Timeline</h3>
                <div className="timeline">
                  {trips
                    .filter((t) => t.status !== "planning")
                    .map((trip) => (
                      <div key={trip.id} className="timeline-item">
                        <div
                          className="tl-dot"
                          style={{
                            background:
                              trip.status === "completed" ? "#C4622D" : "#D4893A",
                          }}
                        />
                        <div className="tl-content">
                          <span className="tl-title">
                            {trip.emoji} {trip.country}
                          </span>
                          <span className="tl-date">
                            {trip.startDate} · {trip.days} days
                          </span>
                        </div>
                        <span className={`tl-badge tl-${trip.status}`}>
                          {trip.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
