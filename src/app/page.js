"use client";
import DashboardLayout from "../components/DashboardLayout";
import KPICards from "../components/KPICards";
import QuickActions from "../components/QuickActions";
import OrderInbox from "../components/OrderInbox";
import StockForecastChart from "../components/StockForecastChart";
import InventoryOverview from "../components/InventoryOverview";
import BottomMetricsBar from "../components/BottomMetricsBar";
import { motion } from "framer-motion";
import { Plus, Calendar, ChevronDown } from "lucide-react";
import styles from "./page.module.scss";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
  };

  return (
    <DashboardLayout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.dashboardContainer}
      >
        <motion.div variants={item} className={styles.pageHeader}>
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
        </motion.div>

        <motion.div variants={item}>
          <KPICards />
        </motion.div>
        
        <motion.div variants={item}>
          <QuickActions />
        </motion.div>
        
        <div className={styles.mainGrid}>
          <motion.div variants={item} className={styles.leftCol}>
            <OrderInbox />
          </motion.div>
          
          <motion.div variants={item} className={styles.rightCol}>
            <StockForecastChart />
            <InventoryOverview />
          </motion.div>
        </div>
        
        <motion.div variants={item}>
          <BottomMetricsBar />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
