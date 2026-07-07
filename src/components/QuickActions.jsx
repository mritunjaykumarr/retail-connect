"use client";
import { ClipboardPlus, PlusSquare, ArrowLeftRight, FileText, FileBarChart } from "lucide-react";
import styles from "./QuickActions.module.scss";

export default function QuickActions() {
  const actions = [
    { label: "Create Order", icon: <ClipboardPlus size={18} strokeWidth={1.5} /> },
    { label: "Add Inventory", icon: <PlusSquare size={18} strokeWidth={1.5} /> },
    { label: "Stock Transfer", icon: <ArrowLeftRight size={18} strokeWidth={1.5} /> },
    { label: "Create Invoice", icon: <FileText size={18} strokeWidth={1.5} /> },
    { label: "View Reports", icon: <FileBarChart size={18} strokeWidth={1.5} /> },
  ];

  return (
    <div className={styles.quickActionsRow}>
      {actions.map((action, idx) => (
        <button key={idx} className={styles.actionBtn}>
          <div className={styles.iconWrapper}>
            {action.icon}
          </div>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
