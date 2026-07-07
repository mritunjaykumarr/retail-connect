"use client";
import { useState } from "react";
import { 
  Home, 
  ShoppingBag, 
  Box, 
  CornerDownLeft, 
  ArrowLeftRight, 
  BarChart2, 
  TrendingUp, 
  Award,
  Users,
  UserCheck,
  Truck,
  Bell,
  FileText,
  Blocks,
  Settings,
  User,
  Crown
} from "lucide-react";
import styles from "./Sidebar.module.scss";

export default function Sidebar({ isOpen, closeSidebar }) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuSections = [
    {
      title: null,
      items: [
        { icon: <Home size={18} />, label: "Dashboard" }
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { icon: <ShoppingBag size={18} />, label: "Orders", badge: 18 },
        { icon: <Box size={18} />, label: "Inventory" },
        { icon: <CornerDownLeft size={18} />, label: "Returns" },
        { icon: <ArrowLeftRight size={18} />, label: "Stock Transfers" },
      ]
    },
    {
      title: "ANALYTICS",
      items: [
        { icon: <BarChart2 size={18} />, label: "Sales Analytics" },
        { icon: <TrendingUp size={18} />, label: "Forecast" },
        { icon: <Award size={18} />, label: "Performance" },
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { icon: <Users size={18} />, label: "Officers & Teams" },
        { icon: <UserCheck size={18} />, label: "Customers" },
        { icon: <Truck size={18} />, label: "Suppliers" },
      ]
    },
    {
      title: "TOOLS",
      items: [
        { icon: <Bell size={18} />, label: "Notifications", badge: 3 },
        { icon: <FileText size={18} />, label: "Reports" },
        { icon: <Blocks size={18} />, label: "Integrations" },
      ]
    },
    {
      title: "SETTINGS",
      items: [
        { icon: <Settings size={18} />, label: "Settings" },
        { icon: <User size={18} />, label: "Profile" },
      ]
    }
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logoContainer}>
        <div className={styles.logoMark}>RC</div>
        <div className={styles.logoText}>
          <span className={styles.brand}>RetailConnect</span>
          <span className={styles.subtitle}>Distributor Portal</span>
        </div>
      </div>
      
      <nav className={styles.nav}>
        {menuSections.map((section, idx) => (
          <div key={idx} className={styles.navSection}>
            {section.title && <h4 className={styles.sectionTitle}>{section.title}</h4>}
            <ul>
              {section.items.map((item, index) => (
                <li 
                  key={index} 
                  className={activeTab === item.label ? styles.active : ""}
                  onClick={() => setActiveTab(item.label)}
                >
                  <div className={styles.itemLeft}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={styles.badge}>{item.badge}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className={styles.bottomSection}>
        <div className={styles.premiumCard}>
          <div className={styles.premiumHeader}>
            <Crown size={20} className={styles.premiumIcon} />
            <span>Upgrade to Premium</span>
          </div>
          <p>Unlock advanced analytics, custom reports & more.</p>
          <button className={styles.upgradeBtn}>Upgrade Now</button>
        </div>
      </div>
    </aside>
  );
}
