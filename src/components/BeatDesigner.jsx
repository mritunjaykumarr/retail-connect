"use client";

import { useState } from "react";
import { FiLayers, FiPlus, FiMap, FiList, FiEdit2, FiCheck, FiUsers } from "react-icons/fi";
import { Table, Badge, Button, Drawer, StatCard, useToast, Card, CardBody } from "./ui";
import styles from "./BeatDesigner.module.scss";

const initialBeats = [
  { id: "BEAT-001", name: "North Main Route", officer: "Rohit Sharma", outlets: 24, frequency: "Weekly", status: "Active" },
  { id: "BEAT-002", name: "West Coast Markets", officer: "Neha Patel", outlets: 18, frequency: "Bi-weekly", status: "Active" },
  { id: "BEAT-003", name: "South Core Loop", officer: "Arjun Mehta", outlets: 30, frequency: "Daily", status: "Active" },
  { id: "BEAT-004", name: "East Retail Plaza", officer: "Priya Singh", outlets: 15, frequency: "Weekly", status: "Inactive" },
  { id: "BEAT-005", name: "Central Commercial B", officer: "Kunal Verma", outlets: 22, frequency: "Daily", status: "Active" }
];

export default function BeatDesigner() {
  const [beats, setBeats] = useState(initialBeats);
  const [selectedBeat, setSelectedBeat] = useState(null);
  const [viewMode, setViewMode] = useState("map"); // map or list
  const toast = useToast();

  const handleToggleStatus = (beatId) => {
    setBeats(prev => prev.map(b => {
      if (b.id === beatId) {
        const nextStatus = b.status === "Active" ? "Inactive" : "Active";
        toast.info("Beat status changed", {
          description: `${b.name} is now ${nextStatus}.`
        });
        return { ...b, status: nextStatus };
      }
      return b;
    }));
  };

  const columns = [
    { key: "id", header: "Beat ID", sortable: true, render: (v) => <strong>{v}</strong> },
    { key: "name", header: "Route Name", sortable: true, render: (v) => <strong>{v}</strong> },
    { key: "officer", header: "Assigned SO", sortable: true },
    { key: "outlets", header: "Total Outlets", align: "right", mono: true, sortable: true },
    { key: "frequency", header: "Visit Frequency" },
    {
      key: "status",
      header: "Status",
      render: (v) => (
        <Badge tone={v === "Active" ? "success" : "neutral"} dot>
          {v}
        </Badge>
      )
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (_, row) => (
        <div style={{ display: "flex", gap: "6px" }}>
          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedBeat(row); }}>
            Configure
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={(e) => { e.stopPropagation(); handleToggleStatus(row.id); }}
          >
            {row.status === "Active" ? "Deactivate" : "Activate"}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h2>Beat Designer</h2>
          <p>Design routes, schedule SO visit frequencies, and optimize coverage maps.</p>
        </div>
        <div className={styles.actions}>
          <div className={styles.toggleGroup}>
            <button 
              className={`${styles.toggleBtn} ${viewMode === "map" ? styles.active : ""}`}
              onClick={() => setViewMode("map")}
            >
              <FiMap style={{ marginRight: 6 }} /> Map View
            </button>
            <button 
              className={`${styles.toggleBtn} ${viewMode === "list" ? styles.active : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FiList style={{ marginRight: 6 }} /> List View
            </button>
          </div>
          <Button leadingIcon={<FiPlus />}>Create Beat</Button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total Beat Routes" value={beats.length} unit="routes" />
        <StatCard label="Assigned Outlets" value={109} unit="shops" color="var(--viz-1)" />
        <StatCard label="Coverage Efficiency" value="97.4%" unit="optimized" color="var(--viz-2)" />
      </div>

      {viewMode === "map" ? (
        <div className={styles.mapWorkspace}>
          {/* Mock Interactive Beat Map */}
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapGridBackground}></div>
              <div className={styles.routeOverlay}>
                {/* Visual SVG paths representing sales routes */}
                <svg className={styles.routeSvg}>
                  <path d="M 100 250 Q 200 100 350 200 T 600 150" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="5,5" />
                  <path d="M 150 400 Q 300 300 450 450 T 700 350" fill="none" stroke="var(--success)" strokeWidth="3" />
                  <path d="M 400 100 Q 500 250 650 180" fill="none" stroke="var(--warning)" strokeWidth="3" />
                </svg>
              </div>

              {/* Pin markers */}
              <div className={`${styles.pin} ${styles.pin1}`} onClick={() => setSelectedBeat(beats[0])}>
                <span className={styles.pinDot}></span>
                <span className={styles.pinLabel}>Balaji Supermarket</span>
              </div>
              <div className={`${styles.pin} ${styles.pin2}`} onClick={() => setSelectedBeat(beats[1])}>
                <span className={styles.pinDot}></span>
                <span className={styles.pinLabel}>Krishna Groceries</span>
              </div>
              <div className={`${styles.pin} ${styles.pin3}`} onClick={() => setSelectedBeat(beats[2])}>
                <span className={styles.pinDot}></span>
                <span className={styles.pinLabel}>AP Traders</span>
              </div>
              
              <div className={styles.mapLegend}>
                <h4>Optimized Route Overlays</h4>
                <div className={styles.legendRow}>
                  <span className={styles.legendLine} style={{ background: "var(--primary)" }}></span>
                  <span>North Main Beat (Rohit)</span>
                </div>
                <div className={styles.legendRow}>
                  <span className={styles.legendLine} style={{ background: "var(--success)" }}></span>
                  <span>West Coast Markets (Neha)</span>
                </div>
              </div>
            </div>
          </div>
          
          <Card elevated className={styles.sidePanel}>
            <CardBody>
              <h3>Active Beats</h3>
              <ul className={styles.beatList}>
                {beats.map(b => (
                  <li 
                    key={b.id} 
                    className={selectedBeat?.id === b.id ? styles.selected : ""}
                    onClick={() => setSelectedBeat(b)}
                  >
                    <div className={styles.beatInfo}>
                      <strong>{b.name}</strong>
                      <span>{b.officer} · {b.outlets} stores</span>
                    </div>
                    <Badge tone={b.status === "Active" ? "success" : "neutral"} dot>
                      {b.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      ) : (
        <Card elevated>
          <CardBody className={styles.bodyPaddingNone}>
            <Table
              columns={columns}
              data={beats}
              rowKey={(row) => row.id}
              pageSize={5}
              onRowClick={(row) => setSelectedBeat(row)}
            />
          </CardBody>
        </Card>
      )}

      {/* Configuration Drawer */}
      <Drawer
        open={!!selectedBeat}
        onClose={() => setSelectedBeat(null)}
        title={selectedBeat?.name}
        description="Verify and update route details."
        footer={
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", width: "100%" }}>
            <Button variant="ghost" onClick={() => setSelectedBeat(null)}>Close</Button>
            <Button onClick={() => setSelectedBeat(null)}>Save Assignment</Button>
          </div>
        }
      >
        {selectedBeat && (
          <div className={styles.drawerContent}>
            <div className={styles.drawerGrid}>
              <StatCard label="Outlets Listed" value={selectedBeat.outlets} unit="retailers" />
              <StatCard label="Frequency" value={selectedBeat.frequency} unit="" />
            </div>

            <h4 className={styles.drawerTitle}>Assigned Sales Officer</h4>
            <div className={styles.soSelectionCard}>
              <FiUsers size={20} color="var(--primary)" />
              <div className={styles.soDetails}>
                <strong>{selectedBeat.officer}</strong>
                <span>Assigned Beat Owner</span>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
