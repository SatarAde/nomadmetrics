import { useState, useMemo } from "react";
import { Trip } from "../types";
import { trips } from "../data/travelData";

type FilterStatus = "all" | "completed" | "upcoming" | "planning";
type SortKey = "date" | "cost" | "days" | "rating";

export function useTrips() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredAndSorted = useMemo(() => {
    let result = [...trips];

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((t) => t.status === filterStatus);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.country.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortKey) {
        case "date":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case "cost":
          return b.cost - a.cost;
        case "days":
          return b.days - a.days;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [filterStatus, sortKey, searchQuery]);

  const stats = useMemo(() => ({
    total: trips.length,
    completed: trips.filter((t) => t.status === "completed").length,
    upcoming: trips.filter((t) => t.status === "upcoming").length,
    totalDays: trips.reduce((sum, t) => sum + t.days, 0),
    totalSpend: trips.reduce((sum, t) => sum + t.cost, 0),
  }), []);

  return {
    trips: filteredAndSorted,
    stats,
    filterStatus,
    setFilterStatus,
    sortKey,
    setSortKey,
    searchQuery,
    setSearchQuery,
  };
}
