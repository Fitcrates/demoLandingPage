"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking.current = false;
      });
    }
  }, []);

  useEffect(() => {
    // Check initial state
    setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          Glow &amp; Serenity
        </Link>
        <nav className={styles.nav}>
          <Link href="/#about">O nas</Link>
          <Link href="/#services">Usługi</Link>
          <Link href="/#why-us">Dlaczego my</Link>
          <Link href="/#reviews">Opinie</Link>
        </nav>
        <Link href="/#contact" className={`btn btn-primary ${styles.ctaBtn}`}>
          Umów wizytę
        </Link>
      </div>
    </header>
  );
}
