"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import DashboardLayout from "../../components/DashboardLayout";
import NationalOverview from "../../components/NationalOverview";
import SalesGaps from "../../components/SalesGaps";
import ManagementLeaderboards from "../../components/ManagementLeaderboards";
import RoiTracker from "../../components/RoiTracker";
import PayoutSummaries from "../../components/PayoutSummaries";
import { Modal, Button, useToast, Breadcrumbs } from "../../components/ui";
import { FiPlus, FiCalendar, FiChevronDown } from "react-icons/fi";
import styles from "./page.module.scss";

export default function ManagementHome() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [allocatedAmount, setAllocatedAmount] = useState("");
  const toast = useToast();

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
  }, [activeTab]);

  const handleBudgetReallocation = (e) => {
    e.preventDefault();
    if (!selectedRegion || !allocatedAmount) {
      toast.danger("Validation error", {
        description: "Please specify both the Target Region and the Budget Amount."
      });
      return;
    }
    setBudgetModalOpen(false);
    toast.success("Budget Reallocated", {
      description: `Successfully allocated ₹${Number(allocatedAmount).toLocaleString()} extra marketing budget to the ${selectedRegion} Region.`
    });
    setSelectedRegion("");
    setAllocatedAmount("");
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div ref={containerRef} className={styles.dashboardContainer}>
        {activeTab !== "Dashboard" && (
          <div className="animate-item" style={{ marginBottom: "calc(-1 * var(--space-2))" }}>
            <Breadcrumbs
              items={[
                { label: "Dashboard", onClick: () => setActiveTab("Dashboard") },
                { label: activeTab === "Sales Gaps" || activeTab === "Leaderboards" ? "Performance" : "Finance & ROI" },
                { label: activeTab }
              ]}
            />
          </div>
        )}

        <div className={`${styles.pageHeader} animate-item`}>
          <div className={styles.greeting}>
            <h1>Welcome back, <span className={styles.highlight}>Siddharth!</span> 🚀</h1>
            <p>Monitor national sales targets, P&L maps, ROI performance, and payouts.</p>
          </div>
          <div className={styles.headerActions}>
            <button 
              className={styles.newOrderBtn}
              onClick={() => setBudgetModalOpen(true)}
            >
              <FiPlus size={16} />
              <span>Reallocate Budget</span>
              <div className={styles.divider}></div>
              <FiChevronDown size={16} />
            </button>
            <div className={styles.datePicker}>
              <FiCalendar size={14} />
              <span>10 July, 2026</span>
              <FiChevronDown size={14} />
            </div>
          </div>
        </div>

        {activeTab === "Dashboard" && (
          <div className="animate-item">
            <NationalOverview />
          </div>
        )}

        {activeTab === "Sales Gaps" && (
          <div className="animate-item">
            <SalesGaps />
          </div>
        )}

        {activeTab === "Leaderboards" && (
          <div className="animate-item">
            <ManagementLeaderboards />
          </div>
        )}

        {activeTab === "ROI Tracker" && (
          <div className="animate-item">
            <RoiTracker />
          </div>
        )}

        {activeTab === "Payout Summaries" && (
          <div className="animate-item">
            <PayoutSummaries />
          </div>
        )}
      </div>

      <Modal
        open={budgetModalOpen}
        onClose={() => setBudgetModalOpen(false)}
        title="Reallocate Marketing Budget"
        description="Shift extra advertising and promo budget to a specific underperforming region."
        footer={
          <>
            <Button variant="ghost" onClick={() => setBudgetModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBudgetReallocation}>
              Allocate Budget
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <label style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--text-2)" }}>Select Target Region</label>
            <select 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={styles.dropdown}
            >
              <option value="">-- Choose Region --</option>
              <option value="North">North Territory</option>
              <option value="South">South Territory</option>
              <option value="East">East Territory</option>
              <option value="West">West Territory</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <label style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--text-2)" }}>Enter Amount (₹)</label>
            <input 
              type="number"
              placeholder="e.g. 50000"
              value={allocatedAmount} 
              onChange={(e) => setAllocatedAmount(e.target.value)}
              className={styles.modalInput}
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
