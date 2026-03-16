export interface Trip {
  id: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  days: number;
  cost: number;
  currency: string;
  status: "completed" | "upcoming" | "planning";
  rating: number;
  emoji: string;
  continent: string;
  tags: string[];
}

export interface MonthlySpend {
  month: string;
  amount: number;
  trips: string[];
}

export interface SpendCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
}

export interface TravelStats {
  totalCountries: number;
  totalCities: number;
  totalDays: number;
  totalMiles: number;
  totalSpend: number;
  tripsThisYear: number;
}

export interface Destination {
  country: string;
  flag: string;
  visits: number;
  days: number;
  cities: string[];
  percentage: number;
}
