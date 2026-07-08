import { FiBell, FiSearch, FiGrid, FiChevronDown } from "react-icons/fi";
import styles from "./Header.module.scss";

export default function Header({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button className={styles.menuGridBtn} onClick={toggleSidebar}>
          <FiGrid size={20} />
        </button>
      </div>
      
      <div className={styles.centerSection}>
        <div className={styles.searchContainer}>
          <FiSearch size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Search orders, items, officers, invoices..." />
          <div className={styles.shortcutKey}>⌘K</div>
        </div>
      </div>
        
      <div className={styles.rightSection}>
        <button className={styles.notificationBtn}>
          <FiBell size={20} />
          <span className={styles.badge}>3</span>
        </button>
        
        <div className={styles.profile}>
          <img src="https://i.pravatar.cc/150?u=aman" alt="Aman Verma" className={styles.avatar} />
          <div className={styles.userInfo}>
            <span className={styles.name}>Aman Verma</span>
            <span className={styles.role}>Distributor</span>
          </div>
          <FiChevronDown size={16} className={styles.chevron} />
        </div>
      </div>
    </header>
  );
}
