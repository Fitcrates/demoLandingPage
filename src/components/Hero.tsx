"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";

const FALLBACK = {
  title: "Odzyskaj blask <br /> swojej skóry",
  subtitle: "Profesjonalne zabiegi kosmetyczne w sercu miasta. Pozwól sobie na chwilę luksusu i relaksu, na którą zasługujesz.",
  primaryButtonText: "Umów wizytę",
  secondaryButtonText: "Zobacz ofertę",
  fallbackImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
};

function getImageUrl(data: any): string {
  if (data?.backgroundImage?.asset) {
    return urlForImage(data.backgroundImage)?.url() ?? FALLBACK.fallbackImage;
  }
  return FALLBACK.fallbackImage;
}

export default function Hero({ serverData }: { serverData?: any }) {
  const initial = serverData || FALLBACK;
  const [data, setData] = useState({
    title: initial.title || FALLBACK.title,
    subtitle: initial.subtitle || FALLBACK.subtitle,
    primaryButtonText: initial.primaryButtonText || FALLBACK.primaryButtonText,
    secondaryButtonText: initial.secondaryButtonText || FALLBACK.secondaryButtonText,
  });
  const [bgImage, setBgImage] = useState(getImageUrl(initial));
  const [visible, setVisible] = useState(false);

  // Update when serverData changes (live revalidation from SanityLive)
  const prevRef = useRef(serverData);
  useEffect(() => {
    if (serverData && serverData !== prevRef.current) {
      prevRef.current = serverData;
      setData({
        title: serverData.title || FALLBACK.title,
        subtitle: serverData.subtitle || FALLBACK.subtitle,
        primaryButtonText: serverData.primaryButtonText || FALLBACK.primaryButtonText,
        secondaryButtonText: serverData.secondaryButtonText || FALLBACK.secondaryButtonText,
      });
      setBgImage(getImageUrl(serverData));
    }
  }, [serverData]);

  // Trigger entrance animation on mount
  useEffect(() => {
    // Small delay so the browser paints the initial frame first
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <h1 
          className={`${styles.title} ${visible ? styles.fadeIn : styles.fadeOut}`}
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
        
        <p className={`${styles.subtitle} ${visible ? styles.fadeIn : styles.fadeOut}`}
           style={{ transitionDelay: '0.15s' }}
        >
          {data.subtitle}
        </p>
        
        <div className={`${styles.buttons} ${visible ? styles.fadeIn : styles.fadeOut}`}
             style={{ transitionDelay: '0.3s' }}
        >
          <Link href="/#contact" className="btn btn-primary">
            {data.primaryButtonText}
          </Link>
          <Link href="/#services" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
            {data.secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
