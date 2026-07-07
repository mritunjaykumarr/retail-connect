"use client";
import { useState } from "react";
import { ClipboardList, Filter, MoreHorizontal, Eye, Check, Printer, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const tabs = ["All Orders", "Pending", "Accepted", "In Transit", "Delivered", "Rejected"];
  const filteredOrders = initialOrders.filter(o => activeTab === "All Orders" || o.status === activeTab);

  const getStatusClass = (status) => {
    switch(status) {
      case "Pending": return styles.pending;
      case "Accepted": return styles.accepted;
      case "In Transit": return styles.transit;
      case "Delivered": return styles.delivered;
      case "Rejected": return styles.rejected;
      default: return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.iconWrapper}>
            <ClipboardList size={20} strokeWidth={1.5} />
          </div>
          <h3>Order Inbox</h3>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.filterBtn}>
            Filter <Filter size={14} />
          </button>
          <button className={styles.iconBtn}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.table}>
        <div className={styles.thead}>
          <div>Order ID</div>
          <div>Sales Officer</div>
          <div>Date & Time</div>
          <div>Items</div>
          <div>Total Value</div>
          <div>Status</div>
          <div className={styles.centerAlign}>Actions</div>
        </div>
        
        <div className={styles.tbody}>
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <motion.div 
                key={order.id} 
                className={styles.row}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                layout
              >
                <div className={styles.cell}>
                  <div className={styles.orderIdStack}>
                    <strong>{order.id}</strong>
                    {order.isNew && <span className={styles.newBadge}>New</span>}
                  </div>
                </div>
                
                <div className={`${styles.cell} ${styles.soProfile}`}>
                  <img src={order.avatar} alt={order.so} className={styles.avatar} />
                  <div className={styles.soInfo}>
                    <span className={styles.soName}>{order.so}</span>
                    <span className={styles.soZone}>{order.zone}</span>
                  </div>
                </div>

                <div className={styles.cell}>
                  <div className={styles.datetime}>
                    <span className={styles.date}>{order.date}</span>
                    <span className={styles.time}>{order.time}</span>
                  </div>
                </div>

                <div className={styles.cell}>{order.items}</div>
                
                <div className={styles.cell}><strong>{order.value}</strong></div>
                
                <div className={styles.cell}>
                  <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className={styles.actions}>
                  <button className={styles.actionIconBtn}><Eye size={14} color="#3b82f6" /></button>
                  {order.status === 'Pending' && <button className={styles.actionIconBtn}><Check size={14} color="#10b981" /></button>}
                  {(order.status === 'Accepted' || order.status === 'Delivered') && <button className={styles.actionIconBtn}><Printer size={14} color="#3b82f6" /></button>}
                  {order.status === 'In Transit' && <button className={styles.actionIconBtn}><Printer size={14} color="#3b82f6" /></button>}
                  {order.status === 'Rejected' && <button className={styles.actionIconBtn}><RotateCcw size={14} color="#3b82f6" /></button>}
                  <button className={styles.actionIconBtn}><MoreHorizontal size={14} color="#a0a0a0" /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <div className={styles.footerRow}>
        <button className={styles.viewAllBtn}>View All Orders &rarr;</button>
      </div>
    </div>
  );
}
