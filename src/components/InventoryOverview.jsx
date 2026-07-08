"use client";
import { useState } from "react";
import { FiPackage, FiMoreHorizontal, FiAlertCircle } from "react-icons/fi";
import { Tabs, Badge } from "./ui";
import styles from "./InventoryOverview.module.scss";

const inventoryItems = [
  { id: 1, name: "Tata Salt (1kg)", sku: "TS-1KG", status: "Low Stock", units: 12, img: "https://i.pravatar.cc/150?u=tata" },
  { id: 2, name: "Maggi Noodles (140g)", sku: "MN-140G", status: "Low Stock", units: 8, img: "https://i.pravatar.cc/150?u=maggi" },
  { id: 3, name: "Parle-G Biscuit (800g)", sku: "PG-800G", status: "Low Stock", units: 15, img: "https://i.pravatar.cc/150?u=parleg" },
];

export default function InventoryOverview() {
  const [activeTab, setActiveTab] = useState("Low Stock");
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.iconWrapper}>
            <FiPackage size={18} />
          </div>
          <h3>Inventory Overview</h3>
        </div>
        <button className={styles.iconBtn}>
          <FiMoreHorizontal size={16} />
        </button>
      </div>
      
      <div className={styles.tabsWrap}>
        <Tabs
          items={[{ value: "Low Stock", label: "Low Stock" }, { value: "Expiring Soon", label: "Expiring Soon" }]}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
          size="sm"
        />
      </div>

      <div className={styles.list}>
        {inventoryItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <div className={styles.itemIconBox}>
                <FiAlertCircle size={16} />
              </div>
              <div className={styles.itemDetails}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.sku}>SKU: {item.sku}</span>
              </div>
            </div>
            
            <div className={styles.itemMeta}>
              <Badge tone="danger" variant="soft" size="sm">{item.status}</Badge>
              <span className={styles.units}>{item.units} Units</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className={styles.viewAllBtn}>View All Inventory &rarr;</button>
    </div>
  );
}
