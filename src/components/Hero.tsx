"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {data.subtitle}
        </motion.p>
        
        <motion.div 
          className={styles.buttons}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Link href="/#contact" className="btn btn-primary">
            {data.primaryButtonText}
          </Link>
          <Link href="/#services" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
            {data.secondaryButtonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
