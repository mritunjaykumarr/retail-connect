import { usePathname } from "next/navigation";
import { FiBell, FiSearch, FiGrid, FiChevronDown } from "react-icons/fi";
import styles from "./Header.module.scss";

export default function Header({ toggleSidebar }) {
  const pathname = usePathname();
  const isManager = pathname && pathname.startsWith("/manager");

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
          <img 
            src={isManager ? "https://i.pravatar.cc/150?u=arkalal" : "https://i.pravatar.cc/150?u=aman"} 
            alt={isManager ? "Arkalal Chakravarty" : "Aman Verma"} 
            className={styles.avatar} 
            loading="lazy" 
          />
          <div className={styles.userInfo}>
            <span className={styles.name}>{isManager ? "Arkalal Chakravarty" : "Aman Verma"}</span>
            <span className={styles.role}>{isManager ? "Area Sales Manager" : "Distributor"}</span>
          </div>
          <FiChevronDown size={16} className={styles.chevron} />
        </div>
      </div>
    </header>
  );
}
