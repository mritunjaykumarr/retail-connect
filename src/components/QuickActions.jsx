"use client";
import { ClipboardPlus, PlusSquare, ArrowLeftRight, FileText, FileBarChart } from "lucide-react";
import styles from "./QuickActions.module.scss";

export default function QuickActions() {
  const actions = [
    { label: "Create Order", icon: <ClipboardPlus size={16} />, color: "purple" },
    { label: "Add Inventory", icon: <PlusSquare size={16} />, color: "green" },
    { label: "Stock Transfer", icon: <ArrowLeftRight size={16} />, color: "blue" },
    { label: "Create Invoice", icon: <FileText size={16} />, color: "pink" },
    { label: "View Reports", icon: <FileBarChart size={16} />, color: "orange" },
  ];

  return (
    <div className={styles.quickActionsRow}>
      {actions.map((action, idx) => (
        <button key={idx} className={`${styles.actionBtn} ${styles[action.color]}`}>
          <div className={styles.iconWrapper}>
            {action.icon}
          </div>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
