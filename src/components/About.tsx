"use client";
import { useEffect, useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK = {
  title: "O naszym salonie",
  description1: "Glow & Serenity to przemyślana przestrzeń stworzona z myślą o Twoim pięknie i relaksie. Od ponad dziesięciu lat oferujemy najwyższej jakości zabiegi kosmetyczne, wykorzystując innowacyjne technologie i ekskluzywne, naturalne kosmetyki.",
  description2: "Naszą misją jest holistyczne podejście do pielęgnacji – dbamy nie tylko o wygląd zewnętrzny, ale i o wewnętrzne ukojenie. Tutaj czas płynie wolniej.",
  values: [
    "Luksusowe, naturalne produkty",
    "Wyspecjalizowani kosmetolodzy",
    "Gwarancja pełnego odprężenia"
  ],
  yearsOfExperience: "10+",
  yearsLabel: "Lat doświadczenia",
  buttonText: "Poznaj nasze usługi",
  fallbackImage: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop"
};

function getImageUrl(data: any): string {
  if (data?.image?.asset) {
    return urlForImage(data.image)?.url() ?? FALLBACK.fallbackImage;
  }
  return FALLBACK.fallbackImage;
}

export default function About({ serverData }: { serverData?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const initial = serverData || FALLBACK;
  const [data, setData] = useState({
    title: initial.title || FALLBACK.title,
    description1: initial.description1 || FALLBACK.description1,
    description2: initial.description2 || FALLBACK.description2,
    values: initial.values?.length ? initial.values : FALLBACK.values,
    yearsOfExperience: initial.yearsOfExperience || FALLBACK.yearsOfExperience,
    yearsLabel: initial.yearsLabel || FALLBACK.yearsLabel,
    buttonText: initial.buttonText || FALLBACK.buttonText,
  });
  const [imgSrc, setImgSrc] = useState(getImageUrl(initial));

  const prevRef = useRef(serverData);
  useEffect(() => {
    if (serverData && serverData !== prevRef.current) {
      prevRef.current = serverData;
      setData({
        title: serverData.title || FALLBACK.title,
        description1: serverData.description1 || FALLBACK.description1,
        description2: serverData.description2 || FALLBACK.description2,
        values: serverData.values?.length ? serverData.values : FALLBACK.values,
        yearsOfExperience: serverData.yearsOfExperience || FALLBACK.yearsOfExperience,
        yearsLabel: serverData.yearsLabel || FALLBACK.yearsLabel,
        buttonText: serverData.buttonText || FALLBACK.buttonText,
      });
      setImgSrc(getImageUrl(serverData));
    }
  }, [serverData]);

  useEffect(() => {
    const el = sectionRef.current;
    
    if (window.self !== window.top) {
      gsap.set([textRef.current, imageRef.current], { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true } }
      );
      gsap.fromTo(imageRef.current, 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []); // Run once on mount only

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.textContent} ref={textRef}>
          <h2 className="section-title" style={{ textAlign: "left" }}>{data.title}</h2>
          <p className={styles.description}>{data.description1}</p>
          <p className={styles.description}>{data.description2}</p>
          
          <ul className={styles.values}>
            {data.values.map((v: string, i: number) => (
              <li key={i}>{v}</li>
            ))}
          </ul>

          <Link href="/#services" className={styles.link}>
            {data.buttonText} <MoveRight size={20} />
          </Link>
        </div>
        
        <div className={styles.imageWrapper} ref={imageRef}>
          <img 
            src={imgSrc} 
            alt="Wnętrze salonu kosmetycznego" 
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.badge}>
            <span>{data.yearsOfExperience}</span>
            <small>{data.yearsLabel}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
