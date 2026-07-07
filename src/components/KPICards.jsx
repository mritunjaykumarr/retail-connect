"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ShoppingBag, Box, IndianRupee, PackageX, ArrowRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import styles from "./KPICards.module.scss";

export default function KPICards() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Number counter animation (simplified for demonstration)
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

  const handleMouseEnter = (idx) => {
    gsap.to(cardsRef.current[idx], {
      y: -5,
      scale: 1.02,
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.05), 0 5px 15px rgba(0, 0, 0, 0.03)", // floating shadow
      duration: 0.4,
      ease: "back.out(1.5)"
    });
  };

  const handleMouseLeave = (idx) => {
    gsap.to(cardsRef.current[idx], {
      y: 0,
      scale: 1,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.01)", // sm shadow
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const heroCard = {
    key: "pendingOrders", 
    label: "Pending Orders", 
    icon: <ShoppingBag size={24} strokeWidth={1.5} />, 
    rawVal: 18,
    prefix: "",
    suffix: "",
    valueStr: "18",
    trend: "+4 from yesterday",
    trendUp: true,
    linkText: "View Orders",
    data: [12, 14, 13, 16, 15, 18, 17, 19, 18]
  };

  const subCards = [
    { 
      key: "totalValue", 
      label: "Total Value (Orders)", 
      icon: <IndianRupee size={20} strokeWidth={1.5} />, 
      rawVal: 4.82,
      prefix: "₹ ",
      suffix: " L",
      valueStr: "₹ 4.82 L",
      trend: "+12.5%",
      trendUp: true,
      linkText: "View Analytics",
      data: [4.1, 4.2, 4.15, 4.4, 4.3, 4.6, 4.5, 4.7, 4.82]
    },
    { 
      key: "lowStock", 
      label: "Low Stock Items", 
      icon: <Box size={20} strokeWidth={1.5} />, 
      rawVal: 12,
      prefix: "",
      suffix: "",
      valueStr: "12",
      trend: "-2",
      trendUp: false,
      linkText: "View Inventory",
      data: [20, 18, 19, 15, 14, 16, 13, 11, 12]
    },
    { 
      key: "outOfStock", 
      label: "Out of Stock", 
      icon: <PackageX size={20} strokeWidth={1.5} />, 
      rawVal: 4,
      prefix: "",
      suffix: "",
      valueStr: "4",
      trend: "+1",
      trendUp: false,
      linkText: "View Items",
      data: [2, 3, 2, 4, 3, 5, 4, 3, 4]
    },
  ];

  const getColorHex = () => '#6366f1'; // Unified indigo accent

  const renderCard = (card, idx, isHero) => {
    const sparklineData = card.data.map((val, i) => ({ index: i, value: val }));
    
    return (
      <div 
        key={idx} 
        ref={el => cardsRef.current[idx] = el}
        className={`${styles.card} ${isHero ? styles.heroCard : ''}`}
        onMouseEnter={() => handleMouseEnter(idx)}
        onMouseLeave={() => handleMouseLeave(idx)}
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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={getColorHex()} 
                strokeWidth={isHero ? 3 : 2} 
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.cardFooter}>
          <button className={styles.linkBtn}>
            {card.linkText} <ArrowRight size={14} className={styles.arrow} />
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
