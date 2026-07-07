"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import DashboardLayout from "../components/DashboardLayout";
import KPICards from "../components/KPICards";
import QuickActions from "../components/QuickActions";
import OrderInbox from "../components/OrderInbox";
import StockForecastChart from "../components/StockForecastChart";
import InventoryOverview from "../components/InventoryOverview";
import BottomMetricsBar from "../components/BottomMetricsBar";
import { Plus, Calendar, ChevronDown } from "lucide-react";
import styles from "./page.module.scss";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".animate-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <DashboardLayout>
      <div ref={containerRef} className={styles.dashboardContainer}>
        <div className={`${styles.pageHeader} animate-item`}>
          <div className={styles.greeting}>
            <h1>Good morning, <span className={styles.highlight}>Aman!</span> 👋</h1>
            <p>Here's what's happening with your business today.</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.newOrderBtn}>
              <Plus size={16} />
              <span>New Order</span>
              <div className={styles.divider}></div>
              <ChevronDown size={16} />
            </button>
            <div className={styles.datePicker}>
              <Calendar size={14} color="#757575" />
              <span>07 July, 2026</span>
              <ChevronDown size={14} color="#757575" />
            </div>
          </div>
        </div>

        <div className="animate-item">
          <KPICards />
        </div>
        
        <div className="animate-item">
          <QuickActions />
        </div>
        
        <div className={styles.mainGrid}>
          <div className={`${styles.leftCol} animate-item`}>
            <OrderInbox />
          </div>
          
          <div className={`${styles.rightCol} animate-item`}>
            <StockForecastChart />
            <InventoryOverview />
          </div>
        </div>
        
        <div className="animate-item">
          <BottomMetricsBar />
        </div>
      </div>
    </DashboardLayout>
  );
}
