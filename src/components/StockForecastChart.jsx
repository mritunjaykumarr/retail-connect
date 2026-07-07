"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";
import styles from "./StockForecastChart.module.scss";

const forecastData = [
  { month: "Jan", actual: 120 },
  { month: "Feb", actual: 150 },
  { month: "Mar", actual: 140 },
  { month: "Apr", actual: 180 },
  { month: "May", actual: 200 },
  { month: "Jun", actual: 170 },
  { month: "Jul", actual: 210 },
  { month: "Aug", actual: 270 },
  { month: "Sep", actual: 320 },
];

export default function StockForecastChart() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.iconWrapper}>
            <TrendingUp size={18} color="#5438ff" />
          </div>
          <h3>Stock Forecast <span className={styles.subtitle}>(Next 3 Months)</span></h3>
        </div>
        <select className={styles.dropdown}>
          <option>All Categories</option>
        </select>
      </div>

      <div className={styles.yAxisLabel}>Demand (Units)</div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={forecastData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5438ff" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#5438ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={[0, 350]} ticks={[0, 50, 100, 150, 200, 250, 300, 350]} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="actual" 
              stroke="#5438ff" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorDemand)" 
              dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#5438ff" }}
              activeDot={{ r: 6, fill: "#5438ff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
