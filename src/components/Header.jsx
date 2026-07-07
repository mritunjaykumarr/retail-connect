import { Bell, Search, Grid, ChevronDown } from "lucide-react";
import styles from "./Header.module.scss";

export default function Header({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button className={styles.menuGridBtn} onClick={toggleSidebar}>
          <Grid size={20} color="#a0a0a0" />
        </button>
      </div>
      
      <div className={styles.centerSection}>
        <div className={styles.searchContainer}>
          <Search size={16} className={styles.searchIcon} color="#a0a0a0" />
          <input type="text" placeholder="Search orders, items, officers, invoices..." />
          <div className={styles.shortcutKey}>⌘K</div>
        </div>
      </div>
        
      <div className={styles.rightSection}>
        <button className={styles.notificationBtn}>
          <Bell size={20} color="#1e1e1e" />
          <span className={styles.badge}>3</span>
        </button>
        
        <div className={styles.profile}>
          <img src="https://i.pravatar.cc/150?u=aman" alt="Aman Verma" className={styles.avatar} />
          <div className={styles.userInfo}>
            <span className={styles.name}>Aman Verma</span>
            <span className={styles.role}>Distributor</span>
          </div>
          <ChevronDown size={16} color="#757575" className={styles.chevron} />
        </div>
      </div>
    </header>
  );
}
