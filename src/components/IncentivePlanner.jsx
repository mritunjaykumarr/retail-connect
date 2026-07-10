"use client";

import { useState } from "react";
import { FiAward, FiTrendingUp, FiDollarSign, FiPlus, FiChevronDown } from "react-icons/fi";
import { Table, Badge, Avatar, Button, StatCard, useToast, Card, CardBody } from "./ui";
import styles from "./IncentivePlanner.module.scss";

const initialPayouts = [
  { id: "PAY-101", officer: "Rohit Sharma", sales: "₹ 1,58,230", target: "₹ 1,50,000", achieved: "105.4%", earnings: "₹ 7,910", status: "Accrued", avatar: "https://i.pravatar.cc/150?u=rohit" },
  { id: "PAY-102", officer: "Neha Patel", sales: "₹ 1,42,450", target: "₹ 1,30,000", achieved: "109.5%", earnings: "₹ 8,540", status: "Approved", avatar: "https://i.pravatar.cc/150?u=neha" },
  { id: "PAY-103", officer: "Arjun Mehta", sales: "₹ 1,86,850", target: "₹ 2,00,000", achieved: "93.4%", earnings: "₹ 4,340", status: "Accrued", avatar: "https://i.pravatar.cc/150?u=arjun" },
  { id: "PAY-104", officer: "Priya Singh", sales: "₹ 1,19,800", target: "₹ 1,20,000", achieved: "99.8%", earnings: "₹ 3,590", status: "Paid", avatar: "https://i.pravatar.cc/150?u=priya" },
  { id: "PAY-105", officer: "Kunal Verma", sales: "₹ 41,300", target: "₹ 1,00,000", achieved: "41.3%", earnings: "₹ 0", status: "Ineligible", avatar: "https://i.pravatar.cc/150?u=kunal" }
];

export default function IncentivePlanner() {
  const [payouts, setPayouts] = useState(initialPayouts);
  const toast = useToast();

  const handleDisburseIncentive = (officer) => {
    toast.success("Payout Approved", {
      description: `Incentives disbursemnt for ${officer} has been queued.`
    });
  };

  const getStatusTone = (status) => {
    switch (status) {
      case "Paid": return "success";
      case "Approved": return "info";
      case "Accrued": return "warning";
      case "Ineligible": return "danger";
      default: return "neutral";
    }
  };

  const columns = [
    {
      key: "officer",
      header: "Sales Officer",
      sortable: true,
      render: (v, row) => (
        <div className={styles.profile}>
          <Avatar name={v} src={row.avatar} size="sm" shape="rounded" />
          <strong>{v}</strong>
        </div>
      )
    },
    { key: "sales", header: "Sales Achieved", mono: true },
    { key: "target", header: "Target Quota", mono: true },
    {
      key: "achieved",
      header: "% Quota Achieved",
      mono: true,
      sortable: true,
      render: (v) => (
        <strong className={parseFloat(v) >= 100 ? styles.achievedTarget : ""}>
          {v}
        </strong>
      )
    },
    { key: "earnings", header: "Incentive Earnings", mono: true, render: (v) => <strong>{v}</strong> },
    {
      key: "status",
      header: "Payout Status",
      render: (v) => (
        <Badge tone={getStatusTone(v)} dot>
          {v}
        </Badge>
      )
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (_, row) => (
        <div style={{ display: "flex", gap: "6px" }}>
          {row.status === "Approved" && (
            <Button size="sm" onClick={() => handleDisburseIncentive(row.officer)}>
              Disburse
            </Button>
          )}
          {row.status === "Accrued" && (
            <Button size="sm" variant="outline" onClick={() => handleDisburseIncentive(row.officer)}>
              Approve Payout
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h2>Incentive &amp; Commission Planner</h2>
          <p>Configure sales commission models, review quota achievements, and disburse Sales Officer incentives.</p>
        </div>
        <Button leadingIcon={<FiPlus />}>Create Incentive Tier</Button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total Accrued Payouts" value="₹ 24,380" unit="" />
        <StatCard label="Top Performer" value="Neha Patel" unit="109.5%" color="var(--viz-1)" />
        <StatCard label="Plan Execution Status" value="On Track" unit="" color="var(--success)" />
      </div>

      <Card elevated>
        <CardBody className={styles.bodyPaddingNone}>
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
