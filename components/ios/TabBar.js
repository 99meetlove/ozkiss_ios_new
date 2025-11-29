"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./tabbar.module.css";

export default function TabBar() {
  return (
    <div className={styles.tabbar}>
      <Link href="/">
        <Image src="/icons/sf/home.png" width={24} height={24} alt="home" />
      </Link>

      <Link href="/search">
        <Image src="/icons/sf/search.png" width={24} height={24} alt="search" />
      </Link>

      <Link href="/chat">
        <Image src="/icons/sf/message.png" width={24} height={24} alt="chat" />
      </Link>

      <Link href="/profile">
        <Image src="/icons/sf/profile.png" width={24} height={24} alt="profile" />
      </Link>
    </div>
  );
}

 
