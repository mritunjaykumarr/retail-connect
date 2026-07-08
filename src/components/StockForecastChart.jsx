"use client";
import { FiTrendingUp } from "react-icons/fi";
import { AreaChart, Select } from "./ui";
import styles from "./StockForecastChart.module.scss";

const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const series = [
  {
    name: "Demand",
    data: [120, 150, 140, 180, 200, 170, 210, 270, 320],
  },
];

export default function StockForecastChart() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.iconWrapper}>
            <FiTrendingUp size={18} />
          </div>
          <h3>Stock Forecast <span className={styles.subtitle}>(Next 3 Months)</span></h3>
        </div>
        <Select
          options={[{ value: "all", label: "All Categories" }]}
          defaultValue="all"
          className={styles.dropdown}
        />
      </div>

      <div className={styles.yAxisLabel}>Demand (Units)</div>

      <div className={styles.chartWrapper}>
        <AreaChart
          series={series}
          categories={categories}
          height={250}
          showLegend={false}
        />
      </div>
    </div>
  );
}
