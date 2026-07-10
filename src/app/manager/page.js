"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import DashboardLayout from "../../components/DashboardLayout";
import ManagerKPIs from "../../components/ManagerKPIs";
import LiveFieldFeed from "../../components/LiveFieldFeed";
import BeatDesigner from "../../components/BeatDesigner";
import FieldMonitoring from "../../components/FieldMonitoring";
import SchemeBuilder from "../../components/SchemeBuilder";
import IncentivePlanner from "../../components/IncentivePlanner";
import { Modal, Button, Input, Checkbox, Select, useToast } from "../../components/ui";
import { FiPlus, FiCalendar, FiChevronDown } from "react-icons/fi";
import styles from "./page.module.scss";

export default function Home() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [assignSOOpen, setAssignSOOpen] = useState(false);
  const [selectedSO, setSelectedSO] = useState("");
  const [selectedBeat, setSelectedBeat] = useState("");
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

  const handleAssignSO = (e) => {
    e.preventDefault();
    if (!selectedSO || !selectedBeat) {
      toast.danger("Validation error", {
        description: "Please specify both the Officer and the Target Beat."
      });
      return;
    }
    setAssignSOOpen(false);
    toast.success("Assignment active", {
      description: `Successfully assigned Sales Officer ${selectedSO} to ${selectedBeat}.`
    });
    setSelectedSO("");
    setSelectedBeat("");
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div ref={containerRef} className={styles.dashboardContainer}>
        {activeTab === "Dashboard" && (
          <>
            <div className={`${styles.pageHeader} animate-item`}>
              <div className={styles.greeting}>
                <h1>Welcome back, <span className={styles.highlight}>Arkalal!</span> 🚀</h1>
                <p>Monitor your sales team, active routes, and target schemes today.</p>
              </div>
              <div className={styles.headerActions}>
                <button 
                  className={styles.newOrderBtn}
                  onClick={() => setAssignSOOpen(true)}
                >
                  <FiPlus size={16} />
                  <span>Assign Route</span>
                  <div className={styles.divider}></div>
                  <FiChevronDown size={16} />
                </button>
                <div className={styles.datePicker}>
                  <FiCalendar size={14} />
                  <span>09 July, 2026</span>
                  <FiChevronDown size={14} />
                </div>
              </div>
            </div>

            <div className="animate-item">
              <ManagerKPIs />
            </div>
            
            <div className="animate-item" style={{ gridColumn: "span 12", marginTop: "var(--space-2)" }}>
              <LiveFieldFeed />
            </div>
          </>
        )}

        {activeTab === "Beat Designer" && (
          <div className="animate-item">
            <BeatDesigner />
          </div>
        )}

        {activeTab === "Field Monitoring" && (
          <div className="animate-item">
            <FieldMonitoring />
          </div>
        )}

        {activeTab === "Scheme Builder" && (
          <div className="animate-item">
            <SchemeBuilder />
          </div>
        )}

        {activeTab === "Incentive Planner" && (
          <div className="animate-item">
            <IncentivePlanner />
          </div>
        )}
      </div>

      <Modal
        open={assignSOOpen}
        onClose={() => setAssignSOOpen(false)}
        title="Assign Sales Officer Route"
        description="Select a Sales Officer and map them to an active beat route."
        footer={
          <>
            <Button variant="ghost" onClick={() => setAssignSOOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignSO}>
              Confirm Assignment
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Select
            label="Select Sales Officer"
            placeholder="-- Choose Officer --"
            options={[
              { value: "Rohit Sharma", label: "Rohit Sharma" },
              { value: "Neha Patel", label: "Neha Patel" },
              { value: "Arjun Mehta", label: "Arjun Mehta" },
              { value: "Priya Singh", label: "Priya Singh" },
            ]}
            value={selectedSO}
            onChange={(e) => setSelectedSO(e.target.value)}
          />
          <Select
            label="Select Target Beat"
            placeholder="-- Choose Beat --"
            options={[
              { value: "North Main Route", label: "North Main Route (BEAT-001)" },
              { value: "West Coast Markets", label: "West Coast Markets (BEAT-002)" },
              { value: "South Core Loop", label: "South Core Loop (BEAT-003)" },
              { value: "East Retail Plaza", label: "East Retail Plaza (BEAT-004)" },
            ]}
            value={selectedBeat}
            onChange={(e) => setSelectedBeat(e.target.value)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
}
