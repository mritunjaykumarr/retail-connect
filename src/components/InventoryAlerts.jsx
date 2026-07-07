import { inventory } from "../lib/mockData";
import styles from "./InventoryAlerts.module.scss";

export default function InventoryAlerts() {
  return (
    <div className={styles.container}>
      <h3>Low Stock Alerts</h3>
      <div className={styles.list}>
        {inventory.map((item) => (
          <div key={item.id} className={`${styles.item} ${styles[item.status]}`}>
            <div className={styles.info}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.stock}>{item.stock} units left</span>
            </div>
            <div className={styles.days}>
              <strong>{item.daysOfStock}</strong> days
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
