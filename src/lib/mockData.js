export const kpiData = {
  pendingOrders: { value: 18, trend: "+4 from yesterday", trendType: "up", color: "brand-accent", sparkline: [10, 15, 12, 18, 14, 18] },
  lowStockItems: { value: 12, trend: "-2 from yesterday", trendType: "down", color: "warning", sparkline: [18, 16, 15, 13, 14, 12] },
  totalValue: { value: "₹ 4.82 L", trend: "+12.5% from yesterday", trendType: "up", color: "success", sparkline: [3, 4, 3.5, 4.5, 4.2, 4.82] },
  outOfStock: { value: 4, trend: "+1 from yesterday", trendType: "up", color: "brand-accent", sparkline: [1, 2, 1, 3, 2, 4] }
};

export const orders = [
  { id: "#ORD-250618", so: "Rohit Sharma", avatar: "https://i.pravatar.cc/150?u=rohit", value: "₹ 58,230", items: 24, date: "18 Jun, 2025", time: "10:30 AM", status: "Pending" },
  { id: "#ORD-250617", so: "Neha Patel", avatar: "https://i.pravatar.cc/150?u=neha", value: "₹ 32,450", items: 18, date: "18 Jun, 2025", time: "09:15 AM", status: "Pending" },
  { id: "#ORD-250616", so: "Arjun Mehta", avatar: "https://i.pravatar.cc/150?u=arjun", value: "₹ 76,890", items: 37, date: "17 Jun, 2025", time: "06:20 PM", status: "Pending" },
  { id: "#ORD-250615", so: "Priya Nair", avatar: "https://i.pravatar.cc/150?u=priya", value: "₹ 19,850", items: 12, date: "17 Jun, 2025", time: "04:45 PM", status: "Accepted" },
  { id: "#ORD-250614", so: "Karan Singh", avatar: "https://i.pravatar.cc/150?u=karan", value: "₹ 63,210", items: 31, date: "17 Jun, 2025", time: "03:10 PM", status: "Rejected" },
  { id: "#ORD-250613", so: "Sneha Gupta", avatar: "https://i.pravatar.cc/150?u=sneha", value: "₹ 14,320", items: 9, date: "17 Jun, 2025", time: "01:35 PM", status: "Accepted" },
];

export const forecastData = [
  { month: "Jun '25", actual: 4200 },
  { month: "Jul '25", actual: 6100 },
  { month: "Aug '25", actual: 8700 },
  { month: "Sep '25", actual: 10300 },
];

export const inventory = []; // Not used in this new design view
