"use client";

import { useState } from "react";
import { FiUserCheck, FiPhone, FiCompass, FiCalendar, FiMapPin, FiActivity } from "react-icons/fi";
import { Table, Badge, Avatar, Button, StatCard, useToast, Card, CardBody } from "./ui";
import styles from "./FieldMonitoring.module.scss";

const initialOfficers = [
  { id: "SO-101", name: "Rohit Sharma", beat: "North Main Route", visited: 18, total: 20, battery: "92%", lastCheckIn: "14:15 PM", status: "Active", avatar: "https://i.pravatar.cc/150?u=rohit" },
  { id: "SO-102", name: "Neha Patel", beat: "West Coast Markets", visited: 14, total: 15, battery: "78%", lastCheckIn: "14:05 PM", status: "Active", avatar: "https://i.pravatar.cc/150?u=neha" },
  { id: "SO-103", name: "Arjun Mehta", beat: "South Core Loop", visited: 20, total: 25, battery: "65%", lastCheckIn: "13:50 PM", status: "Transit", avatar: "https://i.pravatar.cc/150?u=arjun" },
  { id: "SO-104", name: "Priya Singh", beat: "East Retail Plaza", visited: 12, total: 12, battery: "84%", lastCheckIn: "13:30 PM", status: "Active", avatar: "https://i.pravatar.cc/150?u=priya" },
  { id: "SO-105", name: "Kunal Verma", beat: "Central Commercial B", visited: 5, total: 18, battery: "15%", lastCheckIn: "12:15 PM", status: "Offline", avatar: "https://i.pravatar.cc/150?u=kunal" }
];

export default function FieldMonitoring() {
  const [officers, setOfficers] = useState(initialOfficers);
  const toast = useToast();

  const handlePingOfficer = (name) => {
    toast.success("Officer Pinged", {
      description: `Sent location refresh command to ${name}'s device.`
    });
  };

  const getStatusTone = (status) => {
    switch (status) {
      case "Active": return "success";
      case "Transit": return "info";
      case "Offline": return "neutral";
      default: return "neutral";
    }
  };

  const columns = [
    {
      key: "name",
      header: "Sales Officer",
      sortable: true,
      render: (v, row) => (
        <div className={styles.profile}>
          <Avatar name={v} src={row.avatar} size="sm" shape="rounded" />
          <div className={styles.profileText}>
            <strong>{v}</strong>
            <span>{row.id}</span>
          </div>
        </div>
      )
    },
    {
      key: "beat",
      header: "Assigned Beat",
      sortable: true
    },
    {
      key: "visited",
      header: "Shops Visited",
      align: "center",
      render: (v, row) => (
        <div className={styles.progressStack}>
          <strong>{v} / {row.total}</strong>
          <span className={styles.progressBarBg}>
            <span className={styles.progressBarFill} style={{ width: `${(v / row.total) * 100}%` }}></span>
          </span>
        </div>
      )
    },
    {
      key: "battery",
      header: "Device Battery",
      align: "center",
      mono: true,
    },
    {
      key: "lastCheckIn",
      header: "Last Sync Time",
      mono: true,
    },
    {
      key: "status",
      header: "GPS Tracking",
      render: (v) => (
        <Badge tone={getStatusTone(v)} dot>
          {v === "Active" ? "Connected" : v === "Transit" ? "Moving" : "Disconnected"}
        </Badge>
      )
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (_, row) => (
        <div style={{ display: "flex", gap: "6px" }}>
          <Button size="sm" variant="ghost" leadingIcon={<FiCompass />} onClick={() => handlePingOfficer(row.name)}>
            Ping GPS
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h2>Field Monitoring Hub</h2>
          <p>Monitor Sales Officers in real-time, view sync statuses, and verify route compliance percentages.</p>
        </div>
        <div className={styles.liveClock}>
          <FiActivity className={styles.liveIcon} />
          <span>Real-time Tracking Active</span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total Officers Active" value={4} unit="online" color="var(--success)" />
        <StatCard label="Avg. Visits Target" value="69.2%" unit="completed" color="var(--viz-1)" />
        <StatCard label="Sync Health" value="100%" unit="active" color="var(--viz-2)" />
      </div>

      <Card elevated>
        <CardBody className={styles.bodyPaddingNone}>
          <Table
            columns={columns}
            data={officers}
            rowKey={(row) => row.id}
            pageSize={5}
          />
        </CardBody>
      </Card>
    </div>
  );
}
