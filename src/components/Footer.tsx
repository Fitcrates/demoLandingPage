"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

const FacebookIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const InstagramIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const TwitterIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const FALLBACK = {
  description: "Twoje miejsce relaksu i odnowy. Profesjonalne SPA i salon kosmetyczny stworzone z myślą o najwyższych standardach obsługi klienta.",
  copyrightText: "Glow & Serenity. Wszelkie prawa zastrzeżone.",
  socialLinks: [
    { platform: "Facebook", url: "#" },
    { platform: "Instagram", url: "#" },
    { platform: "Twitter", url: "#" }
  ],
  serviceLinks: [
    { label: "Zabiegi na twarz", url: "/uslugi/zabiegi-na-twarz" },
    { label: "Masaże relaksacyjne", url: "/uslugi/masaze-relaksacyjne" },
    { label: "Manicure i pedicure", url: "/uslugi/manicure-pedicure" },
    { label: "Zabiegi premium", url: "/uslugi/zabiegi-premium" }
  ]
};

export default function Footer({ serverData }: { serverData?: any }) {
  const initial = serverData || FALLBACK;
  const [data, setData] = useState({
    description: initial.description || FALLBACK.description,
    copyrightText: initial.copyrightText || FALLBACK.copyrightText,
    socialLinks: initial.socialLinks?.length ? initial.socialLinks : FALLBACK.socialLinks,
    serviceLinks: initial.serviceLinks?.length ? initial.serviceLinks : FALLBACK.serviceLinks,
  });

  const prevRef = useRef(serverData);
  useEffect(() => {
    if (serverData && serverData !== prevRef.current) {
      prevRef.current = serverData;
      setData({
        description: serverData.description || FALLBACK.description,
        copyrightText: serverData.copyrightText || FALLBACK.copyrightText,
        socialLinks: serverData.socialLinks?.length ? serverData.socialLinks : FALLBACK.socialLinks,
        serviceLinks: serverData.serviceLinks?.length ? serverData.serviceLinks : FALLBACK.serviceLinks,
      });
    }
  }, [serverData]);

  const getPlatformIcon = (platform: string, size: number) => {
    const p = platform.toLowerCase();
    if (p.includes("facebook") || p.includes("fb")) return <FacebookIcon size={size} />;
    if (p.includes("instagram") || p.includes("ig")) return <InstagramIcon size={size} />;
    if (p.includes("twitter") || p.includes("x")) return <TwitterIcon size={size} />;
    return null;
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <h3 className={styles.logo}>Glow & Serenity</h3>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.socials}>
            {data.socialLinks.map((social: any, idx: number) => {
              const Icon = getPlatformIcon(social.platform, 20);
              return Icon ? (
                <a key={idx} href={social.url} className={styles.socialLink} target="_blank" rel="noopener noreferrer">{Icon}</a>
              ) : null;
            })}
          </div>
        </div>

        <div className={styles.linksColumn}>
          <h4 className={styles.title}>Na skróty</h4>
          <ul className={styles.links}>
            <li><Link href="/#about">O nas</Link></li>
            <li><Link href="/#services">Usługi</Link></li>
            <li><Link href="/#why-us">Nasze atuty</Link></li>
            <li><Link href="/#reviews">Opinie</Link></li>
            <li><Link href="/#contact">Kontakt</Link></li>
          </ul>
        </div>

        <div className={styles.linksColumn}>
          <h4 className={styles.title}>Usługi</h4>
          <ul className={styles.links}>
            {data.serviceLinks.map((link: any, idx: number) => (
              <li key={idx}><Link href={link.url}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.mapColumn}>
          <h4 className={styles.title}>Jak dojechać?</h4>
          <div className={styles.mapContainer}>
            <iframe 
              src="https://maps.google.com/maps?q=Warszawa,%20Pi%C4%99kna%2012&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {data.copyrightText}</p>
          <p>Realizacja appcrates.pl</p>
        </div>
      </div>
    </footer>
  );
}
