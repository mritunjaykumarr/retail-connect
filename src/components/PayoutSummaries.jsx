"use client";
import React, { useState } from "react";
import { FiCheck, FiX, FiDollarSign, FiInfo } from "react-icons/fi";
import { useToast } from "./ui";
import styles from "./PayoutSummaries.module.scss";

export default function PayoutSummaries() {
  const toast = useToast();
  const [payouts, setPayouts] = useState([
    { id: 1, claimant: "Rohit Sharma", role: "Sales Officer", territory: "North Main", type: "SO Commission", amount: "₹18,450", status: "Pending" },
    { id: 2, claimant: "Aman Verma", role: "Distributor", territory: "Delhi East", type: "Scheme Claim", amount: "₹42,500", status: "Pending" },
    { id: 3, claimant: "Neha Patel", role: "Sales Officer", territory: "West Coast", type: "SO Commission", amount: "₹15,200", status: "Approved" },
    { id: 4, claimant: "Kunal Verma", role: "Distributor", territory: "Delhi Central", type: "Scheme Claim", amount: "₹38,000", status: "Pending" },
    { id: 5, claimant: "Priya Singh", role: "Sales Officer", territory: "East Plaza", type: "SO Commission", amount: "₹12,800", status: "Approved" }
  ]);

  const handleApprove = (id, name, amount) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: "Approved" } : p));
    toast.success("Payout Disbursed", {
      description: `Successfully authorized payment of ${amount} to ${name}.`
    });
  };

  const handleHold = (id, name) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: "On Hold" } : p));
    toast.warning("Payout On Hold", {
      description: `Authorized temporary hold on payout for ${name}.`
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.label}>Pending Claims Approval</span>
          <span className={styles.value}>₹98,950</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.label}>Total Disbursed (MTD)</span>
          <span className={styles.value} style={{ color: "var(--primary)" }}>₹3,45,200</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Claimant / Partner</th>
              <th>Territory Scope</th>
              <th>Payment Type</th>
              <th className={styles.alignRight}>Accrued Amount</th>
              <th className={styles.alignCenter}>Approval Status</th>
              <th className={styles.alignCenter}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className={styles.claimantCell}>
                    <span className={styles.name}>{p.claimant}</span>
                    <span className={styles.role}>{p.role}</span>
                  </div>
                </td>
                <td>{p.territory}</td>
                <td>{p.type}</td>
                <td className={`${styles.numberCell} ${styles.alignRight}`}>{p.amount}</td>
                <td className={styles.alignCenter}>
                  <span className={`${styles.statusBadge} ${
                    p.status === "Approved" ? styles.success : p.status === "On Hold" ? styles.warning : styles.pending
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className={styles.alignCenter}>
                  <div className={styles.actionsCell}>
                    {p.status === "Pending" ? (
                      <>
                        <button 
                          className={styles.approveBtn} 
                          onClick={() => handleApprove(p.id, p.claimant, p.amount)}
                          title="Approve & Disburse Payout"
                        >
                          <FiCheck size={16} />
                        </button>
                        <button 
                          className={styles.holdBtn} 
                          onClick={() => handleHold(p.id, p.claimant)}
                          title="Place Payment on Hold"
                        >
                          <FiX size={16} />
                        </button>
                      </>
                    ) : (
                      <span className={styles.completedText}>Authorized</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
