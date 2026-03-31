"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          Glow & Serenity
        </Link>
        <nav className={styles.nav}>
          <Link href="/#about">O nas</Link>
          <Link href="/#services">Usługi</Link>
          <Link href="/#why-us">Dlaczego my</Link>
          <Link href="/#reviews">Opinie</Link>
        </nav>
        <Link href="/#contact" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
          Umów wizytę
        </Link>
      </div>
    </motion.header>
  );
}
