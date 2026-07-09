"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import DashboardLayout from "../components/DashboardLayout";
import KPICards from "../components/KPICards";
import QuickActions from "../components/QuickActions";
import OrderInbox from "../components/OrderInbox";
import StockForecastChart from "../components/StockForecastChart";
import InventoryOverview from "../components/InventoryOverview";
import BottomMetricsBar from "../components/BottomMetricsBar";
import InventoryUpload from "../components/InventoryUpload";
import OrdersManagement from "../components/OrdersManagement";
import ReturnsManagement from "../components/ReturnsManagement";
import { Modal, Button, Input, Checkbox, useToast } from "../components/ui";
import { FiPlus, FiCalendar, FiChevronDown } from "react-icons/fi";
import styles from "./page.module.scss";

export default function Home() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [retailer, setRetailer] = useState("");
  const [orderValue, setOrderValue] = useState("");
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
  }, [activeTab]); // Rerun animations when switching tabs

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!retailer) {
      toast.danger("Validation error", {
        description: "Please enter a retailer name.",
      });
      return;
    }
    setNewOrderOpen(false);
    toast.success("Order created", {
      description: `New order for ${retailer} (value: ₹${orderValue || '0.00'}) has been submitted.`,
    });
    setRetailer("");
    setOrderValue("");
  };

  const handleQuickAction = (actionKey) => {
    if (actionKey === "addInventory") {
      setActiveTab("Inventory");
    } else if (actionKey === "createOrder") {
      setActiveTab("Orders");
    } else {
      toast.info("Feature in development", {
        description: `The "${actionKey}" action will be available in the next release.`
      });
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div ref={containerRef} className={styles.dashboardContainer}>
        {activeTab === "Dashboard" && (
          <>
            <div className={`${styles.pageHeader} animate-item`}>
              <div className={styles.greeting}>
                <h1>Good morning, <span className={styles.highlight}>Aman!</span> 👋</h1>
                <p>Here's what's happening with your business today.</p>
              </div>
              <div className={styles.headerActions}>
                <button 
                  className={styles.newOrderBtn}
                  onClick={() => setNewOrderOpen(true)}
                >
                  <FiPlus size={16} />
                  <span>New Order</span>
                  <div className={styles.divider}></div>
                  <FiChevronDown size={16} />
                </button>
                <div className={styles.datePicker}>
                  <FiCalendar size={14} />
                  <span>07 July, 2026</span>
                  <FiChevronDown size={14} />
                </div>
              </div>
            </div>

            <div className="animate-item">
              <KPICards />
            </div>
            
            <div className="animate-item">
              <QuickActions onActionClick={handleQuickAction} />
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
          </>
        )}

        {activeTab === "Inventory" && (
          <div className="animate-item">
            <InventoryUpload onBackToDashboard={() => setActiveTab("Dashboard")} />
          </div>
        )}

        {activeTab === "Orders" && (
          <div className="animate-item">
            <OrdersManagement onBackToDashboard={() => setActiveTab("Dashboard")} />
          </div>
        )}

        {activeTab === "Returns" && (
          <div className="animate-item">
            <ReturnsManagement onBackToDashboard={() => setActiveTab("Dashboard")} />
          </div>
        )}
      </div>

      <Modal
        open={newOrderOpen}
        onClose={() => setNewOrderOpen(false)}
        title="Create new order"
        description="Submit a secondary sales order for approval."
        footer={
          <>
            <Button variant="ghost" onClick={() => setNewOrderOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateOrder}>
              Submit Order
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Input 
            label="Retailer name" 
            placeholder="e.g. Sharma General Store" 
            value={retailer}
            onChange={(e) => setRetailer(e.target.value)}
            required
          />
          <Input 
            label="Estimated value" 
            placeholder="0.00" 
            leading="₹"
            value={orderValue}
            onChange={(e) => setOrderValue(e.target.value)}
          />
          <Checkbox label="Notify distributor officer by SMS" defaultChecked />
        </div>
      </Modal>
    </DashboardLayout>
  );
}
