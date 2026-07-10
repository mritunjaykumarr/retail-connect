"use client";

import { useState } from "react";
import { FiPlus, FiTag, FiCalendar, FiShoppingBag, FiLayers, FiAlertCircle } from "react-icons/fi";
import { Table, Badge, Button, StatCard, Modal, Input, Checkbox, Select, useToast, Card, CardBody } from "./ui";
import styles from "./SchemeBuilder.module.scss";

const initialSchemes = [
  { id: "SCH-001", name: "Tata Salt Bulk Discount", sku: "Tata Salt (1kg)", discount: "5% Off", target: "All Retailers", status: "Active", start: "01 Jul, 2026", end: "31 Jul, 2026" },
  { id: "SCH-002", name: "Maggi Freebie Bundle", sku: "Maggi Noodles (140g)", discount: "Buy 10 Get 1 Free", target: "Selected Outlets", status: "Active", start: "05 Jul, 2026", end: "20 Jul, 2026" },
  { id: "SCH-003", name: "Parle-G Launch Promotion", sku: "Parle-G Biscuit (800g)", discount: "10% Off", target: "Supermarkets Only", status: "Active", start: "01 Jul, 2026", end: "15 Jul, 2026" },
  { id: "SCH-004", name: "Monsoon Season Clearance", sku: "All SKUs", discount: "₹ 500 cashback on ₹ 10k", target: "All Retailers", status: "Scheduled", start: "01 Aug, 2026", end: "31 Aug, 2026" },
  { id: "SCH-005", name: "Expired Product Clearance", sku: "Tata Salt (1kg)", discount: "Buy 5 Get 1 Free", status: "Expired", start: "01 Jun, 2026", end: "30 Jun, 2026" }
];

export default function SchemeBuilder() {
  const [schemes, setSchemes] = useState(initialSchemes);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newSchemeName, setNewSchemeName] = useState("");
  const [newSchemeSku, setNewSchemeSku] = useState("");
  const [newSchemeDiscount, setNewSchemeDiscount] = useState("");
  const [newSchemeTarget, setNewSchemeTarget] = useState("All Retailers");
  const toast = useToast();

  const handleCreateSchemeSubmit = (e) => {
    e.preventDefault();
    if (!newSchemeName || !newSchemeSku || !newSchemeDiscount) {
      toast.danger("Validation Error", {
        description: "Please fill in all required fields."
      });
      return;
    }

    const newScheme = {
      id: `SCH-00${schemes.length + 1}`,
      name: newSchemeName,
      sku: newSchemeSku,
      discount: newSchemeDiscount,
      target: newSchemeTarget,
      status: "Active",
      start: "09 Jul, 2026",
      end: "31 Jul, 2026"
    };

    setSchemes(prev => [newScheme, ...prev]);
    toast.success("Scheme Created", {
      description: `Promotional Scheme "${newSchemeName}" has been launched successfully.`
    });
    setCreateModalOpen(false);
    setNewSchemeName("");
    setNewSchemeSku("");
    setNewSchemeDiscount("");
  };

  const getStatusTone = (status) => {
    switch (status) {
      case "Active": return "success";
      case "Scheduled": return "info";
      case "Expired": return "neutral";
      default: return "neutral";
    }
  };

  const columns = [
    { key: "id", header: "Scheme ID", sortable: true, render: (v) => <strong>{v}</strong> },
    { key: "name", header: "Scheme Name", sortable: true, render: (v) => <strong>{v}</strong> },
    {
      key: "sku",
      header: "Target SKU / Item",
      sortable: true,
      render: (v) => (
        <span className={styles.skuLabel}>
          <FiShoppingBag size={14} />
          {v}
        </span>
      )
    },
    { key: "discount", header: "Discount Offer", mono: true },
    { key: "target", header: "Target Segment" },
    { key: "start", header: "Start Date", mono: true },
    { key: "end", header: "End Date", mono: true },
    {
      key: "status",
      header: "Status",
      render: (v) => (
        <Badge tone={getStatusTone(v)} dot>
          {v}
        </Badge>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h2>Trade Schemes &amp; Promotions</h2>
          <p>Construct promotional schemes, set discounts, and assign eligibility criteria for target stores.</p>
        </div>
        <Button leadingIcon={<FiPlus />} onClick={() => setCreateModalOpen(true)}>
          Create Scheme
        </Button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Active Schemes" value={schemes.filter(s => s.status === "Active").length} unit="promos" />
        <StatCard label="Total Redemptions" value="482" unit="times" color="var(--viz-1)" />
        <StatCard label="Average ROI" value="18.5%" unit="growth" color="var(--viz-2)" />
      </div>

      <Card elevated>
        <CardBody className={styles.bodyPaddingNone}>
          <Table
            columns={columns}
            data={schemes}
            rowKey={(row) => row.id}
            pageSize={5}
          />
        </CardBody>
      </Card>

      {/* Scheme Creator Modal */}
      <Modal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Construct Trade Promotion Scheme"
        description="Design a new sales scheme to trigger retailer purchase incentives."
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSchemeSubmit}>
              Launch Scheme
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Input 
            label="Scheme Name" 
            placeholder="e.g. Tata Salt Bulk Monsoon Offer" 
            value={newSchemeName}
            onChange={(e) => setNewSchemeName(e.target.value)}
            required
          />
          <Input 
            label="Target Product / SKU" 
            placeholder="e.g. Tata Salt (1kg) or All Products" 
            value={newSchemeSku}
            onChange={(e) => setNewSchemeSku(e.target.value)}
            required
          />
          <Input 
            label="Discount / Incentive Structure" 
            placeholder="e.g. Buy 10 Get 1 Free, or 5% Off" 
            value={newSchemeDiscount}
            onChange={(e) => setNewSchemeDiscount(e.target.value)}
            required
          />
          <Select
            label="Target Stores Segment"
            options={[
              { value: "All Retailers", label: "All Retailers" },
              { value: "Supermarkets Only", label: "Supermarkets Only" },
              { value: "Selected Outlets", label: "Selected Outlets" },
            ]}
            value={newSchemeTarget}
            onChange={(e) => setNewSchemeTarget(e.target.value)}
          />
          <Checkbox label="Auto-apply scheme inside Sales Officer mobile app" defaultChecked />
        </div>
      </Modal>
    </div>
  );
}
