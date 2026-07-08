"use client";
import { useState } from "react";
import { FiClipboard, FiFilter, FiMoreHorizontal, FiEye, FiCheck, FiPrinter, FiRotateCcw } from "react-icons/fi";
import { Table, Badge, Drawer, Button, StatCard, Avatar, Tabs } from "./ui";
import styles from "./OrderInbox.module.scss";

// Hardcoded data matching screenshot
const initialOrders = [
  { id: "#ORD-250618", isNew: true, so: "Rohit Sharma", zone: "North Zone", date: "18 Jun, 2025", time: "10:30 AM", items: 24, value: "₹ 58,230", status: "Pending", avatar: "https://i.pravatar.cc/150?u=rohit" },
  { id: "#ORD-250617", isNew: true, so: "Neha Patel", zone: "West Zone", date: "18 Jun, 2025", time: "09:15 AM", items: 18, value: "₹ 32,450", status: "Accepted", avatar: "https://i.pravatar.cc/150?u=neha" },
  { id: "#ORD-250616", isNew: true, so: "Arjun Mehta", zone: "South Zone", date: "17 Jun, 2025", time: "04:45 PM", items: 30, value: "₹ 76,850", status: "In Transit", avatar: "https://i.pravatar.cc/150?u=arjun" },
  { id: "#ORD-250615", isNew: true, so: "Priya Singh", zone: "East Zone", date: "17 Jun, 2025", time: "02:20 PM", items: 12, value: "₹ 19,800", status: "Delivered", avatar: "https://i.pravatar.cc/150?u=priya" },
  { id: "#ORD-250614", isNew: true, so: "Kunal Verma", zone: "Central Zone", date: "16 Jun, 2025", time: "11:10 AM", items: 20, value: "₹ 41,300", status: "Rejected", avatar: "https://i.pravatar.cc/150?u=kunal" },
];

export default function OrderInbox() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const tabItems = ["All Orders", "Pending", "Accepted", "In Transit", "Delivered", "Rejected"].map(t => ({ value: t, label: t }));
  const filteredOrders = initialOrders.filter(o => activeTab === "All Orders" || o.status === activeTab);

  const getStatusTone = (status) => {
    switch(status) {
      case "Pending": return "warning";
      case "Accepted": return "success";
      case "In Transit": return "info";
      case "Delivered": return "success";
      case "Rejected": return "danger";
      default: return "neutral";
    }
  };

  const columns = [
    {
      key: "id",
      header: "Order ID",
      sortable: true,
      render: (v, row) => (
        <div className={styles.orderIdStack}>
          <strong>{v}</strong>
          {row.isNew && <span className={styles.newBadge}>New</span>}
        </div>
      ),
    },
    {
      key: "so",
      header: "Sales Officer",
      sortable: true,
      render: (v, row) => (
        <div className={styles.soProfile}>
          <img src={row.avatar} alt={v} className={styles.avatar} />
          <div className={styles.soInfo}>
            <span className={styles.soName}>{v}</span>
            <span className={styles.soZone}>{row.zone}</span>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date & Time",
      sortable: true,
      render: (v, row) => (
        <div className={styles.datetime}>
          <span className={styles.date}>{v}</span>
          <span className={styles.time}>{row.time}</span>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      align: "right",
      mono: true,
      sortable: true,
    },
    {
      key: "value",
      header: "Total Value",
      align: "right",
      mono: true,
      sortable: true,
      render: (v) => <strong>{v}</strong>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (v) => (
        <Badge tone={getStatusTone(v)} dot>
          {v}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (_, row) => (
        <div className={styles.actions}>
          <button 
            className={styles.actionIconBtn}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedOrder(row);
            }}
          >
            <FiEye size={14} />
          </button>
          {row.status === 'Pending' && <button className={styles.actionIconBtn} onClick={(e) => e.stopPropagation()}><FiCheck size={14} /></button>}
          {(row.status === 'Accepted' || row.status === 'Delivered') && <button className={styles.actionIconBtn} onClick={(e) => e.stopPropagation()}><FiPrinter size={14} /></button>}
          {row.status === 'In Transit' && <button className={styles.actionIconBtn} onClick={(e) => e.stopPropagation()}><FiPrinter size={14} /></button>}
          {row.status === 'Rejected' && <button className={styles.actionIconBtn} onClick={(e) => e.stopPropagation()}><FiRotateCcw size={14} /></button>}
          <button className={styles.actionIconBtn} onClick={(e) => e.stopPropagation()}><FiMoreHorizontal size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.iconWrapper}>
            <FiClipboard size={20} />
          </div>
          <h3>Order Inbox</h3>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.filterBtn}>
            Filter <FiFilter size={14} />
          </button>
          <button className={styles.iconBtn}>
            <FiMoreHorizontal size={16} />
          </button>
        </div>
      </div>
      
      <div className={styles.tabsWrap}>
        <Tabs
          items={tabItems}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
          size="sm"
        />
      </div>

      <Table
        columns={columns}
        data={filteredOrders}
        rowKey={(row) => row.id}
        pageSize={5}
        onRowClick={(row) => setSelectedOrder(row)}
      />

      <Drawer
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder?.id}
        description="Verify order items, values, and status."
        footer={
          <div style={{ display: "flex", gap: "var(--space-3)", width: "100%", justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
              Close
            </Button>
            {selectedOrder?.status === "Pending" && (
              <Button onClick={() => setSelectedOrder(null)}>
                Approve Order
              </Button>
            )}
          </div>
        }
      >
        {selectedOrder && (
          <div className={styles.drawerBody}>
            <div className={styles.drawerStats}>
              <StatCard 
                label="Invoice value" 
                value={selectedOrder.value.replace(/[^\d.]/g, '')} 
                unit="INR" 
              />
              <StatCard 
                label="Total items" 
                value={selectedOrder.items} 
                unit="units" 
              />
            </div>

            <h4 className={styles.drawerSubTitle}>Sales Officer</h4>
            <ul className={styles.drawerList}>
              <li>
                <Avatar name={selectedOrder.so} src={selectedOrder.avatar} size="sm" shape="rounded" />
                <div className={styles.drawerListText}>
                  <span>{selectedOrder.so}</span>
                  <span>{selectedOrder.zone}</span>
                </div>
                <Badge tone={getStatusTone(selectedOrder.status)} dot>
                  {selectedOrder.status}
                </Badge>
              </li>
            </ul>

            <h4 className={styles.drawerSubTitle}>Metadata</h4>
            <ul className={styles.drawerList}>
              <li>
                <div className={styles.drawerListText}>
                  <span>Date &amp; Time</span>
                  <span>{selectedOrder.date} · {selectedOrder.time}</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </Drawer>
    </div>
  );
}
