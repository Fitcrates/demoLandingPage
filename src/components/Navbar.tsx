"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

const FALLBACK = {
  logoText: "Glow & Serenity",
  navLinks: [
    { label: "O nas", href: "/#about" },
    { label: "Usługi", href: "/#services" },
    { label: "Dlaczego my", href: "/#why-us" },
    { label: "Opinie", href: "/#reviews" },
  ],
  ctaText: "Umów wizytę",
  ctaLink: "/#contact",
};

export default function Navbar({ serverData }: { serverData?: any }) {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  const initial = serverData || FALLBACK;
  const [data, setData] = useState({
    logoText: initial.logoText || FALLBACK.logoText,
    navLinks: initial.navLinks?.length ? initial.navLinks : FALLBACK.navLinks,
    ctaText: initial.ctaText || FALLBACK.ctaText,
    ctaLink: initial.ctaLink || FALLBACK.ctaLink,
  });

  const prevRef = useRef(serverData);
  useEffect(() => {
    if (serverData && serverData !== prevRef.current) {
      prevRef.current = serverData;
      setData({
        logoText: serverData.logoText || FALLBACK.logoText,
        navLinks: serverData.navLinks?.length ? serverData.navLinks : FALLBACK.navLinks,
        ctaText: serverData.ctaText || FALLBACK.ctaText,
        ctaLink: serverData.ctaLink || FALLBACK.ctaLink,
      });
    }
  }, [serverData]);

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
    setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo} aria-label="Glow & Serenity - Strona główna">
          {data.logoText}
        </Link>
        <nav className={styles.nav} role="navigation" aria-label="Nawigacja główna">
          {data.navLinks.map((link: any, i: number) => (
            <Link key={i} href={link.href}>{link.label}</Link>
          ))}
        </nav>
        <Link href={data.ctaLink} className={`btn btn-primary ${styles.ctaBtn}`} aria-label="Umów wizytę w salonie">
          {data.ctaText}
        </Link>
      </div>
    </header>
  );
}
