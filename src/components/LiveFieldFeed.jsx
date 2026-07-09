"use client";

import { Table, Badge, Avatar, Card, CardBody } from "./ui";
import { FiActivity, FiMapPin } from "react-icons/fi";
import styles from "./LiveFieldFeed.module.scss";

const initialFeed = [
  { id: 1, officer: "Rohit Sharma", beat: "North Main Beat", shop: "Balaji Supermarket", time: "14:15 PM", status: "Checked In", avatar: "https://i.pravatar.cc/150?u=rohit" },
  { id: 2, officer: "Neha Patel", beat: "West Coast Route", shop: "Krishna Groceries", time: "14:05 PM", status: "Checked In", avatar: "https://i.pravatar.cc/150?u=neha" },
  { id: 3, officer: "Arjun Mehta", beat: "South Market Loop", shop: "AP Traders", time: "13:50 PM", status: "Travel", avatar: "https://i.pravatar.cc/150?u=arjun" },
  { id: 4, officer: "Priya Singh", beat: "East Plaza Beat", shop: "Metro Mart", time: "13:30 PM", status: "Checked In", avatar: "https://i.pravatar.cc/150?u=priya" },
  { id: 5, officer: "Kunal Verma", beat: "Central Loop B", shop: "Verma Retail", time: "12:15 PM", status: "Offline", avatar: "https://i.pravatar.cc/150?u=kunal" }
];

export default function LiveFieldFeed() {
  const getStatusTone = (status) => {
    switch (status) {
      case "Checked In": return "success";
      case "Travel": return "info";
      case "Offline": return "neutral";
      default: return "neutral";
    }
  };

  const columns = [
    {
      key: "officer",
      header: "Sales Officer",
      render: (v, row) => (
        <div className={styles.profile}>
          <Avatar name={v} src={row.avatar} size="sm" shape="rounded" />
          <strong>{v}</strong>
        </div>
      )
    },
    {
      key: "beat",
      header: "Beat Route",
    },
    {
      key: "shop",
      header: "Active Store Target",
      render: (v) => (
        <span className={styles.shopLocation}>
          <FiMapPin size={12} style={{ marginRight: 6, color: "var(--text-3)" }} />
          {v}
        </span>
      )
    },
    {
      key: "time",
      header: "Check-In Time",
      mono: true
    },
    {
      key: "status",
      header: "Field State",
      render: (v) => (
        <Badge tone={getStatusTone(v)} dot>
          {v}
        </Badge>
      )
    }
  ];

  return (
    <Card elevated className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.iconWrapper}>
            <FiActivity size={16} />
          </div>
          <h3>Live Field Activity</h3>
        </div>
        <span className={styles.liveIndicator}>
          <span className={styles.dot}></span>
          Live Sync
        </span>
      </div>
      <CardBody className={styles.bodyPaddingNone}>
        <Table
          columns={columns}
          data={initialFeed}
          rowKey={(row) => row.id}
          pageSize={5}
        />
      </CardBody>
    </Card>
  );
}
