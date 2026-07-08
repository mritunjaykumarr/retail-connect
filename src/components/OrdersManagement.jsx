"use client";

import { useState } from "react";
import { 
  FiShoppingBag, 
  FiSearch, 
  FiFilter, 
  FiCheck, 
  FiX, 
  FiPrinter, 
  FiRotateCcw, 
  FiMoreHorizontal,
  FiEye,
  FiTruck,
  FiAlertCircle
} from "react-icons/fi";
import { 
  Table, 
  Badge, 
  Drawer, 
  Button, 
  StatCard, 
  Avatar, 
  Modal, 
  Input, 
  Checkbox,
  Breadcrumbs,
  useToast,
  Card,
  CardBody,
  Tabs
} from "./ui";
import styles from "./OrdersManagement.module.scss";

// Initial orders list representing sales officer bookings
const initialOrders = [
  { id: "#ORD-250618", isNew: true, so: "Rohit Sharma", zone: "North Zone", date: "18 Jun, 2025", time: "10:30 AM", items: 24, value: "₹ 58,230", numericValue: 58230, status: "Pending", avatar: "https://i.pravatar.cc/150?u=rohit" },
  { id: "#ORD-250617", isNew: true, so: "Neha Patel", zone: "West Zone", date: "18 Jun, 2025", time: "09:15 AM", items: 18, value: "₹ 32,450", numericValue: 32450, status: "Accepted", avatar: "https://i.pravatar.cc/150?u=neha" },
  { id: "#ORD-250616", isNew: true, so: "Arjun Mehta", zone: "South Zone", date: "17 Jun, 2025", time: "04:45 PM", items: 30, value: "₹ 76,850", numericValue: 76850, status: "In Transit", avatar: "https://i.pravatar.cc/150?u=arjun" },
  { id: "#ORD-250615", isNew: true, so: "Priya Singh", zone: "East Zone", date: "17 Jun, 2025", time: "02:20 PM", items: 12, value: "₹ 19,800", numericValue: 19800, status: "Delivered", avatar: "https://i.pravatar.cc/150?u=priya" },
  { id: "#ORD-250614", isNew: true, so: "Kunal Verma", zone: "Central Zone", date: "16 Jun, 2025", time: "11:10 AM", items: 20, value: "₹ 41,300", numericValue: 41300, status: "Rejected", avatar: "https://i.pravatar.cc/150?u=kunal" },
  { id: "#ORD-250613", isNew: false, so: "Rohit Sharma", zone: "North Zone", date: "15 Jun, 2025", time: "01:15 PM", items: 15, value: "₹ 28,900", numericValue: 28900, status: "Delivered", avatar: "https://i.pravatar.cc/150?u=rohit" },
  { id: "#ORD-250612", isNew: false, so: "Neha Patel", zone: "West Zone", date: "15 Jun, 2025", time: "11:30 AM", items: 22, value: "₹ 49,100", numericValue: 49100, status: "Accepted", avatar: "https://i.pravatar.cc/150?u=neha" }
];

export default function OrdersManagement({ onBackToDashboard }) {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");
  const [orderToReject, setOrderToReject] = useState(null);
  const toast = useToast();

  const tabs = ["All Orders", "Pending", "Accepted", "In Transit", "Delivered", "Rejected"];

  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter(o => {
    const matchesTab = activeTab === "All Orders" || o.status === activeTab;
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.so.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

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

  // Stats calculation
  const totalOrders = orders.length;
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const acceptedCount = orders.filter(o => o.status === "Accepted").length;
  const totalValue = orders.reduce((sum, o) => sum + o.numericValue, 0);

  const handleApproveOrder = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "Accepted", isNew: false } : o));
    toast.success("Order Approved", {
      description: `Order ${orderId} has been accepted and is ready for fulfillment.`
    });
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: "Accepted" }));
    }
  };

  const handleDispatchOrder = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "In Transit" } : o));
    toast.info("Order Dispatched", {
      description: `Order ${orderId} has been handed off to transit.`
    });
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: "In Transit" }));
    }
  };

  const handleRejectOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderToReject) return;
    
    setOrders(prev => prev.map(o => o.id === orderToReject.id ? { ...o, status: "Rejected", isNew: false } : o));
    toast.danger("Order Rejected", {
      description: `Order ${orderToReject.id} rejected. Reason: ${rejectionNote || 'Not specified'}`
    });
    
    setRejectModalOpen(false);
    setRejectionNote("");
    setOrderToReject(null);
    if (selectedOrder?.id === orderToReject.id) {
      setSelectedOrder(null);
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
          <Avatar name={v} src={row.avatar} size="sm" shape="rounded" />
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
          
          {row.status === 'Pending' && (
            <>
              <button 
                className={`${styles.actionIconBtn} ${styles.actionAccept}`}
                title="Accept Order"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApproveOrder(row.id);
                }}
              >
                <FiCheck size={14} />
              </button>
              <button 
                className={`${styles.actionIconBtn} ${styles.actionReject}`}
                title="Reject Order"
                onClick={(e) => {
                  e.stopPropagation();
                  setOrderToReject(row);
                  setRejectModalOpen(true);
                }}
              >
                <FiX size={14} />
              </button>
            </>
          )}

          {row.status === 'Accepted' && (
            <button 
              className={`${styles.actionIconBtn} ${styles.actionDispatch}`}
              title="Dispatch / Ship"
              onClick={(e) => {
                e.stopPropagation();
                handleDispatchOrder(row.id);
              }}
            >
              <FiTruck size={14} />
            </button>
          )}

          {(row.status === 'Accepted' || row.status === 'Delivered' || row.status === 'In Transit') && (
            <button className={styles.actionIconBtn} onClick={(e) => e.stopPropagation()}><FiPrinter size={14} /></button>
          )}

          <button className={styles.actionIconBtn} onClick={(e) => e.stopPropagation()}><FiMoreHorizontal size={14} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbsRow}>
        <Breadcrumbs
          items={[
            { label: "Dashboard", onClick: onBackToDashboard },
            { label: "Operations" },
            { label: "Orders Management" },
          ]}
        />
      </div>

      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h2>Order Inbox &amp; Fulfillment</h2>
          <p>Accept, fulfill, or reject secondary orders received from field sales officers.</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      {/* Orders stats summary cards */}
      <div className={styles.statsGrid}>
        <StatCard label="Total Booked" value={totalOrders} unit="orders" />
        <StatCard label="Pending Approval" value={pendingCount} unit="orders" color="var(--viz-1)" />
        <StatCard label="Approved &amp; Accepted" value={acceptedCount} unit="orders" color="var(--viz-2)" />
        <StatCard label="Total Value" value={`₹ ${(totalValue / 1000).toFixed(1)}k`} unit="" />
      </div>

      <Card elevated>
        <CardBody className={styles.cardBodyPaddingNone}>
          {/* Filters area */}
          <div className={styles.filtersArea}>
            <div className={styles.searchBox}>
              <Input
                leading={<FiSearch />}
                placeholder="Search orders, sales officers, or zones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className={styles.filterActions}>
              <Button size="sm" variant="outline" leadingIcon={<FiFilter />}>
                Filter
              </Button>
            </div>
          </div>

          {/* Tabs bar */}
          <div className={styles.tabsWrap}>
            <Tabs
              items={tabs.map(tab => {
                const count = orders.filter(o => tab === "All Orders" || o.status === tab).length;
                return { value: tab, label: tab, badge: count > 0 ? count : undefined };
              })}
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
        </CardBody>
      </Card>

      {/* Details Drawer */}
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
              <>
                <Button 
                  variant="danger" 
                  onClick={() => {
                    setOrderToReject(selectedOrder);
                    setRejectModalOpen(true);
                  }}
                >
                  Reject
                </Button>
                <Button onClick={() => handleApproveOrder(selectedOrder.id)}>
                  Approve Order
                </Button>
              </>
            )}
            {selectedOrder?.status === "Accepted" && (
              <Button onClick={() => handleDispatchOrder(selectedOrder.id)}>
                Dispatch / Fulfill
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

      {/* Reject Order Reason Modal */}
      <Modal
        open={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false);
          setRejectionNote("");
          setOrderToReject(null);
        }}
        title="Reject Order Booking"
        description={`Reason for rejecting order ${orderToReject?.id}`}
        footer={
          <>
            <Button 
              variant="ghost" 
              onClick={() => {
                setRejectModalOpen(false);
                setRejectionNote("");
                setOrderToReject(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleRejectOrderSubmit}>
              Confirm Rejection
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-2)", lineHeight: "1.5" }}>
            Rejecting this order booked by <strong>{orderToReject?.so}</strong>. The Sales Officer will be notified instantly.
          </p>
          <Input 
            label="Rejection Reason" 
            placeholder="e.g., Stock unavailable, credit limit exceeded..." 
            value={rejectionNote}
            onChange={(e) => setRejectionNote(e.target.value)}
            required
          />
          <Checkbox label="Send immediate SMS alert to Sales Officer" defaultChecked />
        </div>
      </Modal>
    </div>
  );
}
