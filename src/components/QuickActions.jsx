"use client";
import { FiClipboard, FiPlusSquare, FiRepeat, FiFileText, FiBarChart2 } from "react-icons/fi";
import { Button } from "./ui";
import styles from "./QuickActions.module.scss";

export default function QuickActions({ onActionClick }) {
  const actions = [
    { label: "Create Order", icon: <FiClipboard size={18} />, actionKey: "createOrder" },
    { label: "Add Inventory", icon: <FiPlusSquare size={18} />, actionKey: "addInventory" },
    { label: "Stock Transfer", icon: <FiRepeat size={18} />, actionKey: "stockTransfer" },
    { label: "Create Invoice", icon: <FiFileText size={18} />, actionKey: "createInvoice" },
    { label: "View Reports", icon: <FiBarChart2 size={18} />, actionKey: "viewReports" },
  ];

  return (
    <div className={styles.quickActionsRow}>
      {actions.map((action, idx) => (
        <Button
          key={idx}
          variant="subtle"
          leadingIcon={action.icon}
          className={styles.actionBtn}
          onClick={() => onActionClick?.(action.actionKey)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
