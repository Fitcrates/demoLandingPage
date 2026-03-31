"use client";
import { useEffect, useRef, useState } from "react";
import { UserCheck, Leaf, HeartHandshake, Zap, Circle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WhyUs.module.css";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  UserCheck: <UserCheck size={32} strokeWidth={1} />,
  Leaf: <Leaf size={32} strokeWidth={1} />,
  HeartHandshake: <HeartHandshake size={32} strokeWidth={1} />,
  Zap: <Zap size={32} strokeWidth={1} />,
};

const FALLBACK = {
  title: "Dlaczego warto nam zaufać?",
  subtitle: "Wybierając Glow & Serenity, stawiasz na holistyczne podejście, pasję i profesjonalizm. Zobacz co nas wyróżnia na tle innych salonów i dlaczego klientki zostają z nami na lata.",
  features: [
    { title: "Doświadczony personel", description: "Nasz zespół to wykwalifikowani eksperci kosmetologii, którzy nieustannie podnoszą swoje kwalifikacje.", icon: "UserCheck" },
    { title: "Naturalne kosmetyki", description: "W pracy wykorzystujemy certyfikowane produkty organiczne, bezpieczne dla każdego typu skóry.", icon: "Leaf" },
    { title: "Indywidualne podejście", description: "Każdy plan terapeutyczny dopasowujemy precyzyjnie do unikalnych potrzeb naszych klientów.", icon: "HeartHandshake" },
    { title: "Nowoczesny sprzęt", description: "Pracujemy na certyfikowanych urządzeniach gwarantujących skuteczność i najwyższe bezpieczeństwo.", icon: "Zap" },
  ]
};

export default function WhyUs({ serverData }: { serverData?: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const initial = serverData || FALLBACK;
  const [data, setData] = useState({
    title: initial.title || FALLBACK.title,
    subtitle: initial.subtitle || FALLBACK.subtitle,
    features: initial.features?.length ? initial.features : FALLBACK.features,
  });

  const prevRef = useRef(serverData);
  useEffect(() => {
    if (serverData && serverData !== prevRef.current) {
      prevRef.current = serverData;
      setData({
        title: serverData.title || FALLBACK.title,
        subtitle: serverData.subtitle || FALLBACK.subtitle,
        features: serverData.features?.length ? serverData.features : FALLBACK.features,
      });
    }
  }, [serverData]);

  useEffect(() => {
    if (window.self !== window.top) {
      gsap.set(itemsRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(itemsRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // Run once on mount only

  return (
    <section id="why-us" className={styles.whyUs} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title" style={{ color: "#fff" }}>{data.title}</h2>
          <p className="section-subtitle" style={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: "700px" }}>
            {data.subtitle}
          </p>
        </div>

        <div className={styles.list}>
          {data.features.map((item: any, index: number) => (
            <div key={index} className={styles.listItem} ref={el => { itemsRef.current[index] = el; }}>
              <div className={styles.number}>0{index + 1}</div>
              <div className={styles.itemContent}>
                <div className={styles.icon}>
                  {iconMap[item.icon] ?? <Circle size={32} strokeWidth={1} />}
                </div>
                <div className={styles.textWrapper}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
