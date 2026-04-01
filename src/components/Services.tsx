"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Flower2, Droplets, Gem } from "lucide-react";
import Link from "next/link";
import styles from "./Services.module.css";
import { urlForImage } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={32} strokeWidth={1.5} />,
  Flower2:  <Flower2  size={32} strokeWidth={1.5} />,
  Droplets: <Droplets size={32} strokeWidth={1.5} />,
  Gem:      <Gem      size={32} strokeWidth={1.5} />,
};

const FALLBACK = {
  title: "Nasze Usługi",
  subtitle: "Oferujemy szeroki wachlarz profesjonalnych zabiegów, zaprojektowanych by wydobyć Twoje naturalne piękno i zapewnić pełne odprężenie.",
  serviceList: [
    { title: "Zabiegi na twarz", slug: "zabiegi-na-twarz", description: "Zabiegi głęboko nawilżające i rewitalizujące, dostosowane do indywidualnych potrzeb Twojej cery.", iconName: "Sparkles", image: null, fallbackImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop" },
    { title: "Masaże relaksacyjne", slug: "masaze-relaksacyjne", description: "Odprężające rytuały na całe ciało, redukujące stres i napięcie mięśniowe.", iconName: "Flower2", image: null, fallbackImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2000&auto=format&fit=crop" },
    { title: "Manicure & Pedicure", slug: "manicure-pedicure", description: "Kompleksowa pielęgnacja dłoni i stóp przy użyciu trwałych i bezpiecznych produktów.", iconName: "Droplets", image: null, fallbackImage: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop" },
    { title: "Zabiegi Premium", slug: "zabiegi-premium", description: "Autorskie rytuały SPA, łączące nowoczesną technologię z siłą natury.", iconName: "Gem", image: null, fallbackImage: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2073&auto=format&fit=crop" },
  ],
};

function getImageUrl(item: any): string {
  if (item.image?.asset) {
    return urlForImage(item.image)?.width(800).url() ?? item.fallbackImage ?? "";
  }
  return item.fallbackImage ?? "";
}

export default function Services({ serverData }: { serverData?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef  = useRef<(HTMLElement | null)[]>([]);

  const initial = serverData?.serviceList?.length ? serverData : FALLBACK;
  const [data, setData] = useState(initial);

  const prevRef = useRef(serverData);
  useEffect(() => {
    if (serverData && serverData !== prevRef.current && serverData?.serviceList?.length) {
      prevRef.current = serverData;
      setData(serverData);
    }
  }, [serverData]);

  useEffect(() => {
    const el = sectionRef.current;
    if (window.self !== window.top) {
      gsap.set(cardsRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // Run once on mount only

  return (
    <section id="services" className={styles.services} ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">{data.title}</h2>
        <p className="section-subtitle">{data.subtitle}</p>

        <div className={styles.grid}>
          {data.serviceList.map((service: any, index: number) => (
            <article key={service.slug ?? index} className={styles.card} ref={(el) => { cardsRef.current[index] = el; }}>
              <div className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                  <div className={styles.overlay} aria-hidden="true"></div>
                  <img 
                    src={getImageUrl(service)} 
                    alt={`${service.title} - profesjonalne zabiegi w salonie Glow & Serenity`} 
                    className={styles.image} 
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                </div>
                <div className={styles.iconWrapper} aria-hidden="true">
                  {iconMap[service.iconName] ?? <Sparkles size={32} strokeWidth={1.5} />}
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
                <Link href={`/uslugi/${service.slug}`} className={styles.btn} aria-label={`Dowiedz się więcej o usłudze: ${service.title}`}>
                  Czytaj więcej
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
