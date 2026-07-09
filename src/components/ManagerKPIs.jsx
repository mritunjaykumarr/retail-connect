"use client";

import { StatCard } from "./ui";
import styles from "./ManagerKPIs.module.scss";

export default function ManagerKPIs() {
  return (
    <div className={styles.container}>
      <StatCard
        label="Active Beats Today"
        value={14}
        unit="routes"
        color="var(--primary)"
      />
      <StatCard
        label="Beat Coverage Rate"
        value="94.2%"
        unit="of outlets"
        color="var(--success)"
      />
      <StatCard
        label="Active Schemes"
        value={5}
        unit="promos"
        color="var(--warning)"
      />
      <StatCard
        label="Target Progress"
        value="82.5%"
        unit="achieved"
        color="var(--info)"
      />
    </div>
  );
}
