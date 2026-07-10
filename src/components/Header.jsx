import { usePathname } from "next/navigation";
import { FiBell, FiSearch, FiGrid, FiChevronDown } from "react-icons/fi";
import styles from "./Header.module.scss";

export default function Header({ toggleSidebar }) {
  const pathname = usePathname();
  const isManager = pathname && (pathname.startsWith("/manager") || pathname.startsWith("/retailconnect-manager"));
  const isManagement = pathname && (pathname.startsWith("/management") || pathname.startsWith("/retailconnect-management"));

  let avatarUrl = "https://i.pravatar.cc/150?u=aman";
  let profileName = "Aman Verma";
  let profileRole = "Distributor";

  if (isManager) {
    avatarUrl = "https://i.pravatar.cc/150?u=arkalal";
    profileName = "Arkalal Chakravarty";
    profileRole = "Area Sales Manager";
  } else if (isManagement) {
    avatarUrl = "https://i.pravatar.cc/150?u=siddharth";
    profileName = "Siddharth Mehta";
    profileRole = "GM & National Head";
  }

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
          <kbd className={styles.shortcutKey}>⌘K</kbd>
        </div>
      </div>
        
      <div className={styles.rightSection}>
        <button className={styles.notificationBtn}>
          <FiBell size={20} />
          <span className={styles.badge}>3</span>
        </button>
        
        <div className={styles.profile}>
          <img 
            src={avatarUrl} 
            alt={profileName} 
            className={styles.avatar} 
            loading="lazy" 
          />
          <div className={styles.userInfo}>
            <span className={styles.name}>{profileName}</span>
            <span className={styles.role}>{profileRole}</span>
          </div>
          <FiChevronDown size={16} className={styles.chevron} />
        </div>
      </div>
    </header>
  );
}
