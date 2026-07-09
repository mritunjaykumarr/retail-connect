"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  FiHome, 
  FiShoppingBag, 
  FiBox, 
  FiCornerDownLeft, 
  FiRepeat, 
  FiBarChart2, 
  FiTrendingUp, 
  FiAward,
  FiUsers,
  FiUserCheck,
  FiTruck,
  FiBell,
  FiFileText,
  FiLayers,
  FiSettings,
  FiUser,
  FiStar
} from "react-icons/fi";
import styles from "./Sidebar.module.scss";

export default function Sidebar({ isOpen, closeSidebar, activeTab, setActiveTab }) {
  const pathname = usePathname();
  const isManager = pathname && pathname.startsWith("/manager");

  const distributorSections = [
    {
      title: null,
      items: [
        { icon: <FiHome size={18} />, label: "Dashboard" }
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { icon: <FiShoppingBag size={18} />, label: "Orders", badge: 18 },
        { icon: <FiBox size={18} />, label: "Inventory" },
        { icon: <FiCornerDownLeft size={18} />, label: "Returns" },
        { icon: <FiRepeat size={18} />, label: "Stock Transfers" },
      ]
    },
    {
      title: "ANALYTICS",
      items: [
        { icon: <FiBarChart2 size={18} />, label: "Sales Analytics" },
        { icon: <FiTrendingUp size={18} />, label: "Forecast" },
        { icon: <FiAward size={18} />, label: "Performance" },
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { icon: <FiUsers size={18} />, label: "Officers & Teams" },
        { icon: <FiUserCheck size={18} />, label: "Customers" },
        { icon: <FiTruck size={18} />, label: "Suppliers" },
      ]
    },
    {
      title: "TOOLS",
      items: [
        { icon: <FiBell size={18} />, label: "Notifications", badge: 3 },
        { icon: <FiFileText size={18} />, label: "Reports" },
        { icon: <FiLayers size={18} />, label: "Integrations" },
      ]
    },
    {
      title: "SETTINGS",
      items: [
        { icon: <FiSettings size={18} />, label: "Settings" },
        { icon: <FiUser size={18} />, label: "Profile" },
      ]
    }
  ];

  const managerSections = [
    {
      title: null,
      items: [
        { icon: <FiHome size={18} />, label: "Dashboard" }
      ]
    },
    {
      title: "FIELD SALES",
      items: [
        { icon: <FiLayers size={18} />, label: "Beat Designer" },
        { icon: <FiUserCheck size={18} />, label: "Field Monitoring", badge: "Live" },
      ]
    },
    {
      title: "TRADE PROGRAMS",
      items: [
        { icon: <FiShoppingBag size={18} />, label: "Scheme Builder", badge: 4 },
        { icon: <FiAward size={18} />, label: "Incentive Planner" },
      ]
    },
    {
      title: "ANALYTICS",
      items: [
        { icon: <FiBarChart2 size={18} />, label: "Sales Analytics" },
        { icon: <FiTrendingUp size={18} />, label: "Offer Performance" },
      ]
    },
    {
      title: "SETTINGS",
      items: [
        { icon: <FiSettings size={18} />, label: "Settings" },
        { icon: <FiUser size={18} />, label: "Profile" },
      ]
    }
  ];

  const menuSections = isManager ? managerSections : distributorSections;

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logoContainer}>
        <div className={styles.logoMark}>RC</div>
        <div className={styles.logoText}>
          <span className={styles.brand}>RetailConnect</span>
          <span className={styles.subtitle}>{isManager ? "Manager Portal" : "Distributor Portal"}</span>
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
            <FiStar size={20} className={styles.premiumIcon} />
            <span>Upgrade to Premium</span>
          </div>
          <p>Unlock advanced analytics, custom reports & more.</p>
          <button className={styles.upgradeBtn}>Upgrade Now</button>
        </div>
      </div>
    </aside>
  );
}
