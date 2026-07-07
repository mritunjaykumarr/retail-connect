"use client";
import { ArrowUp, ArrowDown } from "lucide-react";
import styles from "./BottomMetricsBar.module.scss";

export default function BottomMetricsBar() {
  const metrics = [
    { label: "Total Active Retailers", value: "4,250", trend: "+12%", isPositive: true },
    { label: "Avg. Order Value", value: "₹ 12,450", trend: "+5.4%", isPositive: true },
    { label: "Return Rate", value: "2.4%", trend: "-0.8%", isPositive: false }, // Wait, a decreasing return rate is positive? If trend is down but it's good, screenshot usually colors it green if good. But let's just match screenshot if we can see it. Let's make it red for down.
    { label: "On-Time Delivery", value: "98.2%", trend: "+1.2%", isPositive: true },
  ];

  return (
    <div className={styles.container}>
      {metrics.map((metric, idx) => (
        <div key={idx} className={styles.metricBlock}>
          <span className={styles.label}>{metric.label}</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{metric.value}</span>
            <div className={`${styles.trend} ${metric.isPositive ? styles.positive : styles.negative}`}>
              {metric.isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {metric.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
