"use client";
import React, { useState } from "react";
import { FiCheck, FiX, FiDollarSign, FiInfo } from "react-icons/fi";
import { useToast, Table, Badge, Card, CardBody, Avatar } from "./ui";
import styles from "./PayoutSummaries.module.scss";

export default function PayoutSummaries() {
  const toast = useToast();
  const [payouts, setPayouts] = useState([
    { id: 1, claimant: "Rohit Sharma", role: "Sales Officer", territory: "North Main", type: "SO Commission", amount: "₹ 18,450", status: "Pending", avatar: "https://i.pravatar.cc/150?u=rohit" },
    { id: 2, claimant: "Aman Verma", role: "Distributor", territory: "Delhi East", type: "Scheme Claim", amount: "₹ 42,500", status: "Pending", avatar: "https://i.pravatar.cc/150?u=aman" },
    { id: 3, claimant: "Neha Patel", role: "Sales Officer", territory: "West Coast", type: "SO Commission", amount: "₹ 15,200", status: "Approved", avatar: "https://i.pravatar.cc/150?u=neha" },
    { id: 4, claimant: "Kunal Verma", role: "Distributor", territory: "Delhi Central", type: "Scheme Claim", amount: "₹ 38,000", status: "Pending", avatar: "https://i.pravatar.cc/150?u=kunal" },
    { id: 5, claimant: "Priya Singh", role: "Sales Officer", territory: "East Plaza", type: "SO Commission", amount: "₹ 12,800", status: "Approved", avatar: "https://i.pravatar.cc/150?u=priya" }
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

  const columns = [
    {
      key: "claimant",
      header: "Claimant / Partner",
      render: (v, row) => (
        <div className={styles.claimantProfile}>
          <Avatar name={v} src={row.avatar} size="sm" shape="rounded" />
          <div className={styles.claimantCell}>
            <span className={styles.name}>{v}</span>
            <span className={styles.role}>{row.role}</span>
          </div>
        </div>
      )
    },
    {
      key: "territory",
      header: "Territory Scope"
    },
    {
      key: "type",
      header: "Payment Type"
    },
    {
      key: "amount",
      header: "Accrued Amount",
      align: "right",
      mono: true
    },
    {
      key: "status",
      header: "Approval Status",
      align: "center",
      render: (v) => (
        <Badge 
          tone={v === "Approved" ? "success" : v === "On Hold" ? "danger" : "warning"} 
          variant="soft"
          dot
        >
          {v}
        </Badge>
      )
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (_, p) => (
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
      )
    }
  ];

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

      <Card elevated>
        <CardBody className={styles.cardBodyPaddingNone}>
          <Table 
            columns={columns}
            data={payouts}
            rowKey={(row) => row.id}
            pageSize={5}
          />
        </CardBody>
      </Card>
    </div>
  );
}
