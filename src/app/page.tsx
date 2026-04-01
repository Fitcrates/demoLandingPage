import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/live";

// GROQ queries for each section
const NAVBAR_QUERY = `*[_type == "navbar"][0]{ logoText, navLinks[]{ label, href }, ctaText, ctaLink }`;
const HERO_QUERY = `*[_type == "hero"][0]{ title, subtitle, primaryButtonText, secondaryButtonText, backgroundImage }`;
const ABOUT_QUERY = `*[_type == "about"][0]{ title, description1, description2, values, yearsOfExperience, yearsLabel, buttonText, image }`;
const SERVICES_QUERY = `*[_type == "services"][0]{ title, subtitle, serviceList[]{ title, slug, description, iconName, image } }`;
const WHYUS_QUERY = `*[_type == "whyus"][0]{ title, subtitle, features[]{ title, description, icon } }`;
const REVIEWS_QUERY = `*[_type == "reviews"][0]{ title, subtitle, reviewList[]{ name, role, content, rating, image } }`;
const CTA_QUERY = `*[_type == "cta"][0]{ title, subtitle, buttonText }`;
const CONTACT_QUERY = `*[_type == "contact"][0]{ title, subtitle, phone, email, address, openingHours[]{ days, hours }, formTitle }`;
const FOOTER_QUERY = `*[_type == "footer"][0]{ description, copyrightText, socialLinks[]{ platform, url }, serviceLinks[]{ label, url } }`;

export default async function Home() {
  // Fetch all sections in parallel via sanityFetch (server-side, with live revalidation)
  const [navbar, hero, about, services, whyus, reviews, cta, contact, footer] = await Promise.all([
    sanityFetch({ query: NAVBAR_QUERY }),
    sanityFetch({ query: HERO_QUERY }),
    sanityFetch({ query: ABOUT_QUERY }),
    sanityFetch({ query: SERVICES_QUERY }),
    sanityFetch({ query: WHYUS_QUERY }),
    sanityFetch({ query: REVIEWS_QUERY }),
    sanityFetch({ query: CTA_QUERY }),
    sanityFetch({ query: CONTACT_QUERY }),
    sanityFetch({ query: FOOTER_QUERY }),
  ]);

  return (
    <>
      <Navbar serverData={navbar.data} />
      <main id="main-content" style={{ overflowX: 'clip' }}>
        <Hero serverData={hero.data} />
        <About serverData={about.data} />
        <Services serverData={services.data} />
        <WhyUs serverData={whyus.data} />
        <Reviews serverData={reviews.data} />
        <CTA serverData={cta.data} />
        <Contact serverData={contact.data} />
      </main>
      <Footer serverData={footer.data} />
    </>
  );
}
