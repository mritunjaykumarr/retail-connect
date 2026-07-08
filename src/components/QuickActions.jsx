"use client";
import { FiClipboard, FiPlusSquare, FiRepeat, FiFileText, FiBarChart2 } from "react-icons/fi";
import { Button } from "./ui";
import styles from "./QuickActions.module.scss";

export default function QuickActions() {
  const actions = [
    { label: "Create Order", icon: <FiClipboard size={18} /> },
    { label: "Add Inventory", icon: <FiPlusSquare size={18} /> },
    { label: "Stock Transfer", icon: <FiRepeat size={18} /> },
    { label: "Create Invoice", icon: <FiFileText size={18} /> },
    { label: "View Reports", icon: <FiBarChart2 size={18} /> },
  ];

  return (
    <div className={styles.quickActionsRow}>
      {actions.map((action, idx) => (
        <Button
          key={idx}
          variant="subtle"
          leadingIcon={action.icon}
          className={styles.actionBtn}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
