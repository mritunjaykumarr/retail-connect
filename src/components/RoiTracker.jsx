"use client";
import React, { useState } from "react";
import { FiTrendingUp, FiLayers, FiInfo, FiSearch } from "react-icons/fi";
import styles from "./RoiTracker.module.scss";

export default function RoiTracker() {
  const [searchTerm, setSearchTerm] = useState("");

  const schemes = [
    { name: "Maggi Buy 10 Get 1 Free", territory: "Delhi East", budget: "₹45,000", returns: "₹2,400", incremental: "₹1,85,000", roi: "411%", status: "High ROI" },
    { name: "Tata Salt Bulk 5% Discount", territory: "All Regions", budget: "₹85,000", returns: "₹1,200", incremental: "₹2,68,000", roi: "315%", status: "On Track" },
    { name: "KitKat Supermarket Premium Display", territory: "Noida Central", budget: "₹30,000", returns: "₹800", incremental: "₹62,000", roi: "206%", status: "Low ROI" },
    { name: "Munch Buy 5 Cartons Get ₹500 Claim", territory: "Gurugram Central", budget: "₹25,000", returns: "₹3,500", incremental: "₹58,000", roi: "232%", status: "On Track" }
  ];

  const filteredSchemes = schemes.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.territory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.label}>Total Promo Budget</span>
          <span className={styles.value}>₹1,85,000</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.label}>Net Incremental Sales</span>
          <span className={styles.value}>₹5,73,000</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.label}>Overall Campaign ROI</span>
          <span className={styles.value} style={{ color: "var(--success)" }}>309%</span>
        </div>
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.searchBox}>
          <FiSearch size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search active schemes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Active Scheme Campaign</th>
              <th>Territory Scope</th>
              <th className={styles.alignRight}>Budget Spent</th>
              <th className={styles.alignRight}>Returns Impact</th>
              <th className={styles.alignRight}>Incremental Rev</th>
              <th className={styles.alignRight}>Net ROI %</th>
              <th className={styles.alignCenter}>Performance</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchemes.map((scheme, idx) => (
              <tr key={idx}>
                <td className={styles.schemeName}>{scheme.name}</td>
                <td>{scheme.territory}</td>
                <td className={`${styles.numberCell} ${styles.alignRight}`}>{scheme.budget}</td>
                <td className={`${styles.numberCell} ${styles.alignRight} ${styles.returnsText}`}>{scheme.returns}</td>
                <td className={`${styles.numberCell} ${styles.alignRight} ${styles.incText}`}>{scheme.incremental}</td>
                <td className={`${styles.numberCell} ${styles.alignRight} ${styles.roiText}`}>{scheme.roi}</td>
                <td className={styles.alignCenter}>
                  <span className={`${styles.statusBadge} ${
                    scheme.status === "High ROI" ? styles.success : scheme.status === "Low ROI" ? styles.danger : styles.warning
                  }`}>
                    {scheme.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
