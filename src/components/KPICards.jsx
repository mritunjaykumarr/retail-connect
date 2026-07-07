"use client";
import { ShoppingBag, Box, IndianRupee, PackageX, ArrowRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import styles from "./KPICards.module.scss";

export default function KPICards() {
  const cards = [
    { 
      key: "pendingOrders", 
      label: "Pending Orders", 
      icon: <ShoppingBag size={20} />, 
      colorClass: "purple",
      value: "18",
      trend: "+4 from yesterday",
      trendUp: true,
      linkText: "View Orders",
      data: [12, 14, 13, 16, 15, 18, 17, 19, 18]
    },
    { 
      key: "lowStock", 
      label: "Low Stock Items", 
      icon: <Box size={20} />, 
      colorClass: "orange",
      value: "12",
      trend: "-2 from yesterday",
      trendUp: false,
      linkText: "View Inventory",
      data: [20, 18, 19, 15, 14, 16, 13, 11, 12]
    },
    { 
      key: "totalValue", 
      label: "Total Value (Orders)", 
      icon: <IndianRupee size={20} />, 
      colorClass: "green",
      value: "₹ 4.82 L",
      trend: "+12.5% from yesterday",
      trendUp: true,
      linkText: "View Analytics",
      data: [4.1, 4.2, 4.15, 4.4, 4.3, 4.6, 4.5, 4.7, 4.82]
    },
    { 
      key: "outOfStock", 
      label: "Out of Stock Items", 
      icon: <PackageX size={20} />, 
      colorClass: "blue",
      value: "4",
      trend: "+1 from yesterday",
      trendUp: true, // Though out of stock increasing is bad, we color it green in the screenshot? No wait, screenshot shows +1 from yesterday in green.
      linkText: "View Items",
      data: [2, 3, 2, 4, 3, 5, 4, 3, 4]
    },
  ];

  const getColorHex = (colorClass) => {
    switch(colorClass) {
      case 'purple': return '#6a35ff';
      case 'orange': return '#fd7e14';
      case 'green': return '#10b981';
      case 'blue': return '#3b82f6';
      default: return '#6a35ff';
    }
  };

  return (
    <div className={styles.grid}>
      {cards.map((card, idx) => {
        const sparklineData = card.data.map((val, i) => ({ index: i, value: val }));
        
        return (
          <div key={idx} className={styles.card}>
            <div className={styles.topRow}>
              <div className={`${styles.iconWrapper} ${styles[card.colorClass]}`}>
                {card.icon}
              </div>
              <div className={styles.labels}>
                <p className={styles.label}>{card.label}</p>
                <p className={styles.value}>{card.value}</p>
                <p className={`${styles.trend} ${card.trendUp ? styles.up : styles.down}`}>
                  {card.trend}
                </p>
              </div>
            </div>
            
            <div className={styles.sparkline}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={getColorHex(card.colorClass)} 
                    strokeWidth={2.5} 
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.cardFooter}>
              <button className={`${styles.linkBtn} ${styles[card.colorClass + 'Text']}`}>
                {card.linkText} <ArrowRight size={14} className={styles.arrow} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
