"use client";
import styles from "./navigation.module.css";

export default function NavigationBar({ title, small = false }) {
  return (
    <div className={`${styles.navbar} ios-navbar-blur`}>
      <div className={styles.inner}>
        <span className={small ? styles.titleSmall : styles.titleLarge}>
          {title}
        </span>
      </div>
    </div>
  );
}
 
