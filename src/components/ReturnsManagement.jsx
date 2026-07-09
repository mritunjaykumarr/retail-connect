"use client";

import { useState } from "react";
import { 
  FiCornerDownLeft, 
  FiSearch, 
  FiFilter, 
  FiCheck, 
  FiX, 
  FiPrinter, 
  FiEye,
  FiFileText,
  FiAlertCircle
} from "react-icons/fi";
import { 
  Table, 
  Badge, 
  Drawer, 
  Button, 
  StatCard, 
  Avatar, 
  Modal, 
  Input, 
  Checkbox,
  Breadcrumbs,
  useToast,
  Card,
  CardBody
} from "./ui";
import styles from "./ReturnsManagement.module.scss";

// Initial returns list representing retailer damage/expiry returns
const initialReturns = [
  { id: "#RET-250801", isNew: true, retailer: "Balaji Supermarket", so: "Rohit Sharma", date: "18 Jun, 2025", items: 12, value: "₹ 4,320", numericValue: 4320, status: "Pending", reason: "Expired Product", avatar: "https://i.pravatar.cc/150?u=rohit" },
  { id: "#RET-250802", isNew: true, retailer: "Krishna Groceries", so: "Neha Patel", date: "18 Jun, 2025", items: 8, value: "₹ 2,450", numericValue: 2450, status: "Approved", reason: "Damaged in Transit", avatar: "https://i.pravatar.cc/150?u=neha" },
  { id: "#RET-250803", isNew: true, retailer: "AP Traders", so: "Arjun Mehta", date: "17 Jun, 2025", items: 25, value: "₹ 8,900", numericValue: 8900, status: "Pending", reason: "Wrong SKU Delivered", avatar: "https://i.pravatar.cc/150?u=arjun" },
  { id: "#RET-250804", isNew: false, retailer: "Balaji Supermarket", so: "Priya Singh", date: "16 Jun, 2025", items: 6, value: "₹ 1,800", numericValue: 1800, status: "Approved", reason: "Near Expiry Stock", avatar: "https://i.pravatar.cc/150?u=priya" },
  { id: "#RET-250805", isNew: false, retailer: "Pooja Mart", so: "Kunal Verma", date: "15 Jun, 2025", items: 15, value: "₹ 5,100", numericValue: 5100, status: "Rejected", reason: "Unsanctioned Return", avatar: "https://i.pravatar.cc/150?u=kunal" },
  { id: "#RET-250806", isNew: false, retailer: "Verma Retail", so: "Rohit Sharma", date: "14 Jun, 2025", items: 10, value: "₹ 3,200", numericValue: 3200, status: "Approved", reason: "Expired Product", avatar: "https://i.pravatar.cc/150?u=rohit" }
];

export default function ReturnsManagement({ onBackToDashboard }) {
  const [returns, setReturns] = useState(initialReturns);
  const [activeTab, setActiveTab] = useState("All Returns");
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");
  const [returnToReject, setReturnToReject] = useState(null);
  const toast = useToast();

  const tabs = ["All Returns", "Pending", "Approved", "Rejected"];

  // Filter returns
  const filteredReturns = returns.filter(r => {
    const matchesTab = activeTab === "All Returns" || r.status === activeTab;
    const matchesSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.retailer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.so.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusTone = (status) => {
    switch(status) {
      case "Pending": return "warning";
      case "Approved": return "success";
      case "Rejected": return "danger";
      default: return "neutral";
    }
  };

  // Stats calculation
  const totalCount = returns.length;
  const pendingCount = returns.filter(r => r.status === "Pending").length;
  const approvedValue = returns.filter(r => r.status === "Approved").reduce((sum, r) => sum + r.numericValue, 0);

  const handleApproveReturn = (returnId) => {
    setReturns(prev => prev.map(r => r.id === returnId ? { ...r, status: "Approved", isNew: false } : r));
    toast.success("Return Approved", {
      description: `Credit Note issued for ${returnId}. Stock level corrected automatically.`
    });
    if (selectedReturn?.id === returnId) {
      setSelectedReturn(prev => ({ ...prev, status: "Approved" }));
    }
  };

  const handleRejectReturnSubmit = (e) => {
    e.preventDefault();
    if (!returnToReject) return;
    
    setReturns(prev => prev.map(r => r.id === returnToReject.id ? { ...r, status: "Rejected", isNew: false } : r));
    toast.danger("Return Claim Rejected", {
      description: `Return ${returnToReject.id} rejected. Reason: ${rejectionNote || 'Not specified'}`
    });
    
    setRejectModalOpen(false);
    setRejectionNote("");
    setReturnToReject(null);
    if (selectedReturn?.id === returnToReject.id) {
      setSelectedReturn(null);
    }
  };

  const columns = [
    {
      key: "id",
      header: "Return ID",
      sortable: true,
      render: (v, row) => (
        <div className={styles.idStack}>
          <strong>{v}</strong>
          {row.isNew && <span className={styles.newBadge}>New</span>}
        </div>
      ),
    },
    {
      key: "retailer",
      header: "Retailer Shop",
      sortable: true,
      render: (v) => <strong>{v}</strong>,
    },
    {
      key: "so",
      header: "Sales Officer",
      sortable: true,
      render: (v, row) => (
        <div className={styles.soProfile}>
          <Avatar name={v} src={row.avatar} size="sm" shape="rounded" />
          <span className={styles.soName}>{v}</span>
        </div>
      ),
    },
    {
      key: "reason",
      header: "Reason Category",
      sortable: true,
      render: (v) => (
        <span className={styles.reasonLabel}>
          <FiFileText style={{ marginRight: 6, color: "var(--text-3)" }} />
          {v}
        </span>
      )
    },
    {
      key: "date",
      header: "Filed Date",
      sortable: true,
    },
    {
      key: "value",
      header: "Claim Value",
      align: "right",
      mono: true,
      sortable: true,
      render: (v) => <strong>{v}</strong>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (v) => (
        <Badge tone={getStatusTone(v)} dot>
          {v}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (_, row) => (
        <div className={styles.actions}>
          <button 
            className={styles.actionIconBtn}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedReturn(row);
            }}
          >
            <FiEye size={14} />
          </button>
          
          {row.status === 'Pending' && (
            <>
              <button 
                className={styles.actionIconBtn} 
                title="Approve &amp; Issue Credit Note"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApproveReturn(row.id);
                }}
              >
                <FiCheck size={14} color="var(--success)" />
              </button>
              <button 
                className={styles.actionIconBtn} 
                title="Reject Return Claim"
                onClick={(e) => {
                  e.stopPropagation();
                  setReturnToReject(row);
                  setRejectModalOpen(true);
                }}
              >
                <FiX size={14} color="var(--danger)" />
              </button>
            </>
          )}

          {row.status === 'Approved' && (
            <button className={styles.actionIconBtn} onClick={(e) => e.stopPropagation()}><FiPrinter size={14} color="var(--text-3)" /></button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbsRow}>
        <Breadcrumbs
          items={[
            { label: "Dashboard", onClick: onBackToDashboard },
            { label: "Operations" },
            { label: "Returns & Credit Notes" },
          ]}
        />
      </div>

      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h2>Returns &amp; Credit Notes</h2>
          <p>Verify retailer claims, approve damaged/expired returns, and issue reconciliation credit notes.</p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      {/* Stats summary cards */}
      <div className={styles.statsGrid}>
        <StatCard label="Total Filed" value={totalCount} unit="claims" />
        <StatCard label="Pending Review" value={pendingCount} unit="claims" color="var(--viz-1)" />
        <StatCard label="Credits Issued" value={`₹ ${(approvedValue / 1000).toFixed(1)}k`} unit="" color="var(--viz-2)" />
        <StatCard label="Avg. Return Rate" value="2.4%" unit="of sales" />
      </div>

      <Card elevated>
        <CardBody className={styles.cardBodyPaddingNone}>
          {/* Filters area */}
          <div className={styles.filtersArea}>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search by ID, retailer, SO, or reason..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterActions}>
              <Button size="sm" variant="outline" leadingIcon={<FiFilter />}>
                Filter
              </Button>
            </div>
          </div>

          {/* Tabs bar */}
          <div className={styles.tabsWrap}>
            <div className={styles.tabsList}>
              {tabs.map(tab => (
                <button 
                  key={tab} 
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {returns.filter(r => tab === "All Returns" || r.status === tab).length > 0 && (
                    <span className={styles.tabBadge}>
                      {returns.filter(r => tab === "All Returns" || r.status === tab).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <Table
            columns={columns}
            data={filteredReturns}
            rowKey={(row) => row.id}
            pageSize={5}
            onRowClick={(row) => setSelectedReturn(row)}
          />
        </CardBody>
      </Card>

      {/* Details Drawer */}
      <Drawer
        open={!!selectedReturn}
        onClose={() => setSelectedReturn(null)}
        title={selectedReturn?.id}
        description="Verify returned item lists, reasons, and claim values."
        footer={
          <div style={{ display: "flex", gap: "var(--space-3)", width: "100%", justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setSelectedReturn(null)}>
              Close
            </Button>
            {selectedReturn?.status === "Pending" && (
              <>
                <Button 
                  variant="danger" 
                  onClick={() => {
                    setReturnToReject(selectedReturn);
                    setRejectModalOpen(true);
                  }}
                >
                  Reject
                </Button>
                <Button onClick={() => handleApproveReturn(selectedReturn.id)}>
                  Approve Claim
                </Button>
              </>
            )}
          </div>
        }
      >
        {selectedReturn && (
          <div className={styles.drawerBody}>
            <div className={styles.drawerStats}>
              <StatCard 
                label="Claim Refund" 
                value={selectedReturn.value.replace(/[^\d.]/g, '')} 
                unit="INR" 
              />
              <StatCard 
                label="Units Count" 
                value={selectedReturn.items} 
                unit="pcs" 
              />
            </div>

            <h4 className={styles.drawerSubTitle}>Retailer &amp; Sales Officer</h4>
            <ul className={styles.drawerList}>
              <li>
                <div className={styles.drawerListText}>
                  <strong>{selectedReturn.retailer}</strong>
                  <span>Return Category: {selectedReturn.reason}</span>
                </div>
              </li>
              <li>
                <Avatar name={selectedReturn.so} src={selectedReturn.avatar} size="sm" shape="rounded" />
                <div className={styles.drawerListText}>
                  <span>{selectedReturn.so}</span>
                  <span>Field Sales Officer</span>
                </div>
                <Badge tone={getStatusTone(selectedReturn.status)} dot>
                  {selectedReturn.status}
                </Badge>
              </li>
            </ul>

            <h4 className={styles.drawerSubTitle}>Reconciliation Impact</h4>
            <div className={styles.impactCard}>
              <FiAlertCircle size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
              <p>
                Approving this claim issues a credit note to {selectedReturn.retailer} and marks {selectedReturn.items} items for return-to-inventory processing.
              </p>
            </div>
          </div>
        )}
      </Drawer>

      {/* Reject Return Reason Modal */}
      <Modal
        open={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false);
          setRejectionNote("");
          setReturnToReject(null);
        }}
        title="Reject Return Claim"
        description={`Reason for rejecting claim ${returnToReject?.id}`}
        footer={
          <>
            <Button 
              variant="ghost" 
              onClick={() => {
                setRejectModalOpen(false);
                setRejectionNote("");
                setReturnToReject(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleRejectReturnSubmit}>
              Confirm Rejection
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-2)", lineHeight: "1.5" }}>
            Rejecting return from <strong>{returnToReject?.retailer}</strong> filed by SO <strong>{returnToReject?.so}</strong>.
          </p>
          <Input 
            label="Rejection Explanation" 
            placeholder="e.g., Claim time window expired, verification photo missing..." 
            value={rejectionNote}
            onChange={(e) => setRejectionNote(e.target.value)}
            required
          />
          <Checkbox label="Send notification to Sales Officer for re-verification" defaultChecked />
        </div>
      </Modal>
    </div>
  );
}
