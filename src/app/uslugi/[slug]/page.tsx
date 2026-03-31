import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Sparkles, Flower2, Droplets, Gem, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./ServiceDetails.module.css";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

// ── types ─────────────────────────────────────────────────────────────────────
interface PriceItem {
  name: string;
  duration: string;
  price: string;
}

interface ServicePageData {
  title: string;
  subtitle: string;
  heroImage: any | null;
  description: string;
  benefits: string[];
  priceList: PriceItem[];
}

// ── icon map ──────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={28} strokeWidth={1.5} />,
  Flower2: <Flower2 size={28} strokeWidth={1.5} />,
  Droplets: <Droplets size={28} strokeWidth={1.5} />,
  Gem: <Gem size={28} strokeWidth={1.5} />,
};

// ── all services summary (for "Other Services" section) ───────────────────────
const allServices = [
  {
    slug: "zabiegi-na-twarz",
    title: "Zabiegi na twarz",
    shortDesc: "Profesjonalna pielęgnacja i rewitalizacja cery.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "masaze-relaksacyjne",
    title: "Masaże relaksacyjne",
    shortDesc: "Odprężające rytuały redukujące stres.",
    iconName: "Flower2",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "manicure-pedicure",
    title: "Manicure & Pedicure",
    shortDesc: "Kompleksowa pielęgnacja dłoni i stóp.",
    iconName: "Droplets",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
  },
  {
    slug: "zabiegi-premium",
    title: "Zabiegi Premium",
    shortDesc: "Ekskluzywne terapie z natychmiastowym efektem.",
    iconName: "Gem",
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2073&auto=format&fit=crop",
  },
];

// ── Sanity GROQ query ─────────────────────────────────────────────────────────
const QUERY = `*[_type == "servicePage" && slug.current == $slug][0]{
  title,
  subtitle,
  heroImage,
  description,
  benefits,
  priceList[]{
    name,
    duration,
    price
  }
}`;

// ── fallback dummy data ───────────────────────────────────────────────────────
const dummyData: Record<string, ServicePageData & { fallbackImage: string }> = {
  "zabiegi-na-twarz": {
    title: "Zabiegi na twarz",
    subtitle: "Profesjonalna pielęgnacja dopasowana do potrzeb Twojej cery.",
    heroImage: null,
    fallbackImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
    description:
      "Nasze zabiegi na twarz to nie tylko głębokie oczyszczanie i nawilżanie, to przede wszystkim innowacyjne technologie. Wykorzystujemy produkty premium bogate w naturalne składniki aktywne, kwas hialuronowy i witaminy. Zabiegi przywracają świetlistość, jędrność i spowalniają procesy starzenia skóry.",
    benefits: [
      "Wyrównanie kolorytu i struktury skóry",
      "Głębokie nawilżenie i regeneracja",
      "Redukcja drobnych zmarszczek",
      "Pobudzenie naturalnej produkcji kolagenu",
    ],
    priceList: [
      { name: "Oczyszczanie manualne + kwas", duration: "90 min", price: "250 zł" },
      { name: "Zabieg nawilżający 'Glow'", duration: "60 min", price: "180 zł" },
      { name: "Mezoterapia mikroigłowa", duration: "75 min", price: "320 zł" },
    ],
  },
  "masaze-relaksacyjne": {
    title: "Masaże relaksacyjne",
    subtitle: "Ucieknij od zgiełku i odzyskaj wewnętrzną harmonię.",
    heroImage: null,
    fallbackImage:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2000&auto=format&fit=crop",
    description:
      "Masaż to najstarsza metoda redukcji stresu. W naszym salonie wykonujemy autorskie masaże opierające się na technikach balijskich i Lomi Lomi. Używamy podgrzewanych olejów aromaterapeutycznych stworzonych ze starannie wyselekcjonowanych wyciągów roślinnych, dzięki którym Twoje ciało zapomni o napięciach.",
    benefits: [
      "Redukcja stresu i napięcia mięśniowego",
      "Poprawa krążenia krwi i limfy",
      "Lepsza jakość snu",
      "Ujędrnianie i wygładzanie skóry ciała",
    ],
    priceList: [
      { name: "Klasyczny masaż relaksacyjny", duration: "60 min", price: "190 zł" },
      { name: "Masaż gorącymi kamieniami", duration: "90 min", price: "240 zł" },
      { name: "Aromaterapeutyczny masaż pleców", duration: "45 min", price: "140 zł" },
    ],
  },
  "manicure-pedicure": {
    title: "Manicure & Pedicure",
    subtitle: "Idealne dłonie i stopy w absolutnie każdym detalu.",
    heroImage: null,
    fallbackImage:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
    description:
      "Dłonie to wizytówka każdego z nas. Stosujemy najbardziej zaawansowane frezarkowe techniki opracowania skórek. Nasze lakiery hybrydowe i żele nie tylko pięknie lśnią do 4 tygodni, ale także posiadają formuły wzmacniające kruchą płytkę paznokcia. Zapewniamy sterylność narzędzi autoklawem klasy medycznej.",
    benefits: [
      "Trwałość lakieru do 4 tygodni",
      "Bezpieczeństwo i najwyższe standardy higieny",
      "Olbrzymia paleta kolorystyczna premium",
      "Pielęgnacyjna kąpiel i peeling dłoni/stóp",
    ],
    priceList: [
      { name: "Manicure hybrydowy", duration: "60 min", price: "130 zł" },
      { name: "Przedłużanie paznokci żelem", duration: "120 min", price: "210 zł" },
      { name: "Pedicure hybrydowy + peeling", duration: "75 min", price: "170 zł" },
    ],
  },
  "zabiegi-premium": {
    title: "Zabiegi Premium",
    subtitle: "Ekskluzywne terapie łączące relaks z potężnymi efektami liftingu.",
    heroImage: null,
    fallbackImage:
      "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2073&auto=format&fit=crop",
    description:
      "Dla najbardziej wymagających Klientów stworzyliśmy pakiety premium. Łączymy nowoczesną kosmetologię (radiofrekwencja, stymulatory tkankowe) z manualnymi elementami azjatyckich masaży twarzy liftingujących Kobido. Efekty są widoczne natychmiast – Twoja twarz staje się promienna, a rysy i owal wyraźnie uniesione.",
    benefits: [
      "Bezoperacyjny lifting owału twarzy",
      "Głęboka przebudowa kolagenu",
      "Spektakularne i natychmiastowe efekty wizualne",
      "Połączenie mocnych substancji z pełnym relaksem",
    ],
    priceList: [
      { name: "Rytuał 'Royal Glow' + Kobido", duration: "120 min", price: "450 zł" },
      { name: "Stymulatory Tkankowe (twarz + szyja)", duration: "60 min", price: "600 zł" },
      { name: "Lifting radiofrekwencyjny (RF)", duration: "75 min", price: "380 zł" },
    ],
  },
};

// ── helper ────────────────────────────────────────────────────────────────────
function resolveHeroImage(data: any, slug: string): string {
  if (data?.heroImage?.asset) {
    return urlForImage(data.heroImage)?.width(1600).url() ?? "";
  }
  return dummyData[slug]?.fallbackImage ?? "";
}

// ── generateStaticParams (SSG for known slugs) ────────────────────────────────
export async function generateStaticParams() {
  return Object.keys(dummyData).map((slug) => ({ slug }));
}

// ── page ──────────────────────────────────────────────────────────────────────
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try to load from Sanity
  let sanityData: ServicePageData | null = null;
  try {
    sanityData = await client.fetch(QUERY, { slug });
  } catch {
    // Sanity not configured yet — will use fallback
  }

  const fallback = dummyData[slug];
  if (!sanityData && !fallback) notFound();

  const data: ServicePageData = sanityData ?? fallback;
  const heroImageUrl = resolveHeroImage(sanityData, slug);

  // Other services (exclude current)
  const otherServices = allServices.filter((s) => s.slug !== slug);

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <main>
        {/* ── Hero banner ───────────────────────────────────────────── */}
        <section
          className={styles.hero}
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        >
          <div className={styles.overlay}></div>
          <div className={`container ${styles.heroContent}`}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.subtitle}>{data.subtitle}</p>
          </div>
        </section>

        {/* ── Content body ──────────────────────────────────────────── */}
        <section className={styles.contentSection}>
          <div className={`container ${styles.grid}`}>

            {/* Description + benefits */}
            <div className={styles.mainContent}>
              <p className={styles.description}>{data.description}</p>

              <h3 className={styles.benefitsTitle}>Dlaczego warto?</h3>
              <div className={styles.benefitsList}>
                {data.benefits.map((benefit, idx) => (
                  <div key={idx} className={styles.benefitItem}>
                    <Check className={styles.benefitIcon} size={24} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price sidebar */}
            <aside>
              <div className={styles.sidebar}>
                <div className={styles.priceCard}>
                  <h3 className={styles.priceTitle}>Cennik</h3>

                  <div className={styles.priceList}>
                    {data.priceList.map((item, idx) => (
                      <div key={idx} className={styles.priceItem}>
                        <div className={styles.priceItemLeft}>
                          <span className={styles.serviceName}>{item.name}</span>
                          <span className={styles.duration}>{item.duration}</span>
                        </div>
                        <span className={styles.servicePrice}>{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/#contact" className={`btn btn-primary ${styles.bookBtn}`}>
                    Umów Wizytę
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </section>

        {/* ── Other services ─────────────────────────────────────────── */}
        <section className={styles.otherServices}>
          <div className="container">
            <div className={styles.otherHeader}>
              <span className={styles.otherLabel}>Sprawdź również</span>
              <h2 className={styles.otherTitle}>Pozostałe usługi</h2>
            </div>

            <div className={styles.otherGrid}>
              {otherServices.map((s) => (
                <Link key={s.slug} href={`/uslugi/${s.slug}`} className={styles.otherCard}>
                  <div className={styles.otherImageWrap}>
                    <img src={s.image} alt={s.title} className={styles.otherImage} />
                    <div className={styles.otherImageOverlay}></div>
                  </div>
                  <div className={styles.otherBody}>
                    <div className={styles.otherIcon}>
                      {iconMap[s.iconName]}
                    </div>
                    <h3 className={styles.otherCardTitle}>{s.title}</h3>
                    <p className={styles.otherCardDesc}>{s.shortDesc}</p>
                    <span className={styles.otherLink}>
                      Szczegóły <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className={styles.backLink}>
              <Link href="/#services" className="btn btn-outline text-black">
                ← Wróć do wszystkich usług
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
