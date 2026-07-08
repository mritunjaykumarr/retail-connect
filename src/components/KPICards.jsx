"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiShoppingBag, FiBox, FiDollarSign, FiXCircle, FiArrowRight } from "react-icons/fi";
import { Sparkline } from "./ui";
import styles from "./KPICards.module.scss";

export default function KPICards() {
  useEffect(() => {
    // Number counter animation
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-val'));
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const isFloat = target % 1 !== 0;
      
      let obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          counter.innerHTML = prefix + (isFloat ? obj.val.toFixed(2) : Math.floor(obj.val)) + suffix;
        }
      });
    });
  }, []);

  const heroCard = {
    key: "pendingOrders", 
    label: "Pending Orders", 
    icon: <FiShoppingBag size={24} />, 
    rawVal: 18,
    prefix: "",
    suffix: "",
    valueStr: "18",
    trend: "+4 from yesterday",
    trendUp: true,
    linkText: "View Orders",
    color: "var(--primary)",
    data: [12, 14, 13, 16, 15, 18, 17, 19, 18]
  };

  const subCards = [
    { 
      key: "totalValue", 
      label: "Total Value (Orders)", 
      icon: <FiDollarSign size={20} />, 
      rawVal: 4.82,
      prefix: "₹ ",
      suffix: " L",
      valueStr: "₹ 4.82 L",
      trend: "+12.5%",
      trendUp: true,
      linkText: "View Analytics",
      color: "var(--success)",
      data: [4.1, 4.2, 4.15, 4.4, 4.3, 4.6, 4.5, 4.7, 4.82]
    },
    { 
      key: "lowStock", 
      label: "Low Stock Items", 
      icon: <FiBox size={20} />, 
      rawVal: 12,
      prefix: "",
      suffix: "",
      valueStr: "12",
      trend: "-2",
      trendUp: false,
      linkText: "View Inventory",
      color: "var(--warning)",
      data: [20, 18, 19, 15, 14, 16, 13, 11, 12]
    },
    { 
      key: "outOfStock", 
      label: "Out of Stock", 
      icon: <FiXCircle size={20} />, 
      rawVal: 4,
      prefix: "",
      suffix: "",
      valueStr: "4",
      trend: "+1",
      trendUp: false,
      linkText: "View Items",
      color: "var(--danger)",
      data: [2, 3, 2, 4, 3, 5, 4, 3, 4]
    },
  ];

  const renderCard = (card, idx, isHero) => {
    return (
      <div 
        key={idx} 
        className={`${styles.card} ${isHero ? styles.heroCard : ''}`}
      >
        <div className={styles.topRow}>
          <div className={styles.iconWrapper}>
            {card.icon}
          </div>
          <div className={styles.labels}>
            <p className={styles.label}>{card.label}</p>
            <p 
              className={`${styles.value} counter-val`} 
              data-val={card.rawVal}
              data-prefix={card.prefix}
              data-suffix={card.suffix}
            >
              {card.valueStr}
            </p>
            <p className={`${styles.trend} ${card.trendUp ? styles.up : styles.down}`}>
              {card.trend}
            </p>
          </div>
        </div>
        
        <div className={styles.sparkline}>
          <Sparkline
            data={card.data}
            color={card.color}
            height={48}
          />
        </div>

        <div className={styles.cardFooter}>
          <button className={styles.linkBtn}>
            {card.linkText} <FiArrowRight size={14} className={styles.arrow} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroRow}>
        {renderCard(heroCard, 0, true)}
      </div>
      <div className={styles.subGrid}>
        {subCards.map((card, i) => renderCard(card, i + 1, false))}
      </div>
    </div>
  );
}
