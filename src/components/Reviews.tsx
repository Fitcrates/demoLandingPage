"use client";
import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Reviews.module.css";
import { urlForImage } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK = {
  title: "Co mówią nasze klientki?",
  subtitle: "Najlepszą wizytówką Glow & Serenity są zadowolone klientki, które wracają do nas po więcej.",
  reviews: [
    { name: "Anna Kowalska", role: "Stała klientka", text: "Niesamowite doświadczenie! Zabieg bankietowy przed moim ślubem to był strzał w dziesiątkę. Skóra była rozświetlona i nawilżona. Polecam z całego serca.", fallbackImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" },
    { name: "Marta Wójcik", role: "Przedsiębiorczyni", text: "Moje ulubione miejsce na reset po ciężkim tygodniu. Masaż relaksacyjny u Pani Kasi to absolutna magia. Profesjonalizm na najwyższym poziomie.", fallbackImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop" },
    { name: "Karolina Nowak", role: "Blogerka urodowa", text: "Piękne wnętrza, intymna atmosfera i przede wszystkim skuteczność zabiegów. Używają świetnych kosmetyków, a personel wie, co robi.", fallbackImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" }
  ]
};

function getImageUrl(data: any): string {
  if (data?.image?.asset) {
    return urlForImage(data.image)?.url() ?? FALLBACK.reviews[0].fallbackImage;
  }
  return data?.fallbackImage ?? FALLBACK.reviews[0].fallbackImage;
}

export default function Reviews({ serverData }: { serverData?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [data, setData] = useState(() => {
    if (!serverData) return FALLBACK;
    let parsedReviews = FALLBACK.reviews;
    if (serverData.reviewList?.length) {
      parsedReviews = serverData.reviewList.map((r: any, idx: number) => ({
        name: r.name || "Anonim", role: r.role || "Klientka", text: r.content || "",
        image: r.image, fallbackImage: FALLBACK.reviews[Math.min(idx, FALLBACK.reviews.length - 1)].fallbackImage
      }));
    }
    return { title: serverData.title || FALLBACK.title, subtitle: serverData.subtitle || FALLBACK.subtitle, reviews: parsedReviews };
  });

  const prevRef = useRef(serverData);
  useEffect(() => {
    if (serverData && serverData !== prevRef.current) {
      prevRef.current = serverData;
      let parsedReviews = FALLBACK.reviews;
      if (serverData.reviewList?.length) {
        parsedReviews = serverData.reviewList.map((r: any, idx: number) => ({
          name: r.name || "Anonim", role: r.role || "Klientka", text: r.content || "",
          image: r.image, fallbackImage: FALLBACK.reviews[Math.min(idx, FALLBACK.reviews.length - 1)].fallbackImage
        }));
      }
      setData({ title: serverData.title || FALLBACK.title, subtitle: serverData.subtitle || FALLBACK.subtitle, reviews: parsedReviews });
    }
  }, [serverData]);

  useEffect(() => {
    if (window.self !== window.top) {
      gsap.set(cardsRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // Run once on mount only

  return (
    <section id="reviews" className={styles.reviews} ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">{data.title}</h2>
        <p className="section-subtitle">{data.subtitle}</p>
        
        <div className={styles.grid}>
          {data.reviews.map((review: any, index: number) => (
            <div key={index} className={styles.card} ref={el => { cardsRef.current[index] = el; }}>
              <Quote className={styles.quoteIcon} size={40} />
              <p className={styles.text}>"{review.text}"</p>
              <div className={styles.author}>
                <img src={getImageUrl(review)} alt={review.name} className={styles.avatar} loading="lazy" />
                <div className={styles.info}>
                  <p className={styles.name}>{review.name}</p>
                  <p className={styles.role}>{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
