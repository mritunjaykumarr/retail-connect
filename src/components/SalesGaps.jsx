"use client";
import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiAlertCircle, FiTrendingDown, FiArrowDown } from "react-icons/fi";
import { Table, Badge } from "./ui";
import styles from "./SalesGaps.module.scss";

export default function SalesGaps() {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");

  const gapData = [
    { territory: "East Plaza Beat (East)", target: "₹2,50,000", actual: "₹1,85,000", gap: "₹65,000", deviation: "-26.0%", status: "Critical", trend: "down" },
    { territory: "West Coast Route (West)", target: "₹3,00,000", actual: "₹2,82,000", gap: "₹18,000", deviation: "-6.0%", status: "On Track", trend: "up" },
    { territory: "North Main Beat (North)", target: "₹4,20,000", actual: "₹3,45,000", gap: "₹75,000", deviation: "-17.8%", status: "High Risk", trend: "down" },
    { territory: "South Market Loop (South)", target: "₹3,50,000", actual: "₹3,38,000", gap: "₹12,000", deviation: "-3.4%", status: "On Track", trend: "up" },
    { territory: "East Bypass Path (East)", target: "₹1,80,000", actual: "₹1,20,000", gap: "₹60,000", deviation: "-33.3%", status: "Critical", trend: "down" },
    { territory: "North Suburban Loop (North)", target: "₹2,80,000", actual: "₹2,68,000", gap: "₹12,000", deviation: "-4.3%", status: "On Track", trend: "up" }
  ];

  const filteredData = gapData.filter((item) => {
    const matchesSearch = item.territory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === "All" || item.territory.includes(`(${regionFilter})`);
    return matchesSearch && matchesRegion;
  });

  const columns = [
    {
      key: "territory",
      header: "Territory Route",
      render: (v) => <span className={styles.territoryName}>{v}</span>
    },
    {
      key: "target",
      header: "Target Sales",
      align: "right",
      mono: true
    },
    {
      key: "actual",
      header: "Actual Sales",
      align: "right",
      mono: true
    },
    {
      key: "gap",
      header: "Sales Gap",
      align: "right",
      mono: true,
      render: (v) => <span className={styles.gapAmount}>{v}</span>
    },
    {
      key: "deviation",
      header: "Deviation %",
      align: "right",
      mono: true,
      render: (v, row) => (
        <span className={row.trend === "down" ? styles.negative : styles.positive}>
          {v}
          <FiArrowDown className={styles.trendArrow} style={{ transform: row.trend === "up" ? "rotate(180deg)" : "none" }} />
        </span>
      )
    },
    {
      key: "status",
      header: "Risk Level",
      align: "center",
      render: (v) => (
        <Badge 
          tone={v === "Critical" ? "danger" : v === "High Risk" ? "warning" : "success"} 
          variant="soft"
        >
          {v}
        </Badge>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.alertPanel}>
        <div className={styles.alertHeader}>
          <FiAlertCircle size={20} className={styles.alertIcon} />
          <h4>Priority Gap Notice</h4>
        </div>
        <p>
          Territories in <strong>East Region</strong> are showing a total deficit of <strong>₹1,25,000</strong> against secondary targets this week. Underperformance is primarily driven by logistics delay in Maggi SKU dispatch.
        </p>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.searchBox}>
          <FiSearch size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search territories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterMenu}>
          <select 
            value={regionFilter} 
            onChange={(e) => setRegionFilter(e.target.value)}
            className={styles.selectInput}
          >
            <option value="All">All Regions</option>
            <option value="North">North Region</option>
            <option value="South">South Region</option>
            <option value="East">East Region</option>
            <option value="West">West Region</option>
          </select>
          <FiChevronDown size={16} className={styles.chevron} />
        </div>
      </div>

      <Table 
        columns={columns}
        data={filteredData}
        rowKey={(row) => row.territory}
        pageSize={5}
      />
    </div>
  );
}
