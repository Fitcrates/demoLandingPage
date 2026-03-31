"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import styles from "./CTA.module.css";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK = {
  title: "Zarezerwuj swoją chwilę relaksu",
  subtitle: "Skontaktuj się z nami, aby omówić indywidualny plan pielęgnacyjny lub umów się od razu na wybraną wizytę.",
  buttonText: "Umów wizytę online"
};

export default function CTA({ serverData }: { serverData?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const initial = serverData || FALLBACK;
  const [data, setData] = useState({
    title: initial.title || FALLBACK.title,
    subtitle: initial.subtitle || FALLBACK.subtitle,
    buttonText: initial.buttonText || FALLBACK.buttonText,
  });

  const prevRef = useRef(serverData);
  useEffect(() => {
    if (serverData && serverData !== prevRef.current) {
      prevRef.current = serverData;
      setData({
        title: serverData.title || FALLBACK.title,
        subtitle: serverData.subtitle || FALLBACK.subtitle,
        buttonText: serverData.buttonText || FALLBACK.buttonText,
      });
    }
  }, [serverData]);

  useEffect(() => {
    const el = sectionRef.current;
    if (window.self !== window.top) {
      gsap.set(contentRef.current, { opacity: 1, scale: 1 });
      return;
    }
    gsap.fromTo(contentRef.current, { opacity: 0, scale: 0.95 }, {
      opacity: 1, scale: 1, duration: 1, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 80%" },
    });
  }, [data]);

  return (
    <section className={styles.ctaWrapper} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.ctaBox} ref={contentRef}>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.subtitle}>{data.subtitle}</p>
            <Link href="/#contact" className={`btn btn-primary ${styles.btnPrimary}`}>
              {data.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
