"use client";
import React, { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import styles from "./Contact.module.css";

const FALLBACK = {
  title: "Zostańmy w kontakcie",
  subtitle: "Zarezerwuj wizytę telefonicznie, napisz do nas lub odwiedź nasz salon w centrum miasta.",
  phone: "+48 123 456 789",
  email: "recepcja@glowandserenity.pl",
  address: "ul. Piękna 12, 00-549 Warszawa",
  openingHours: [
    { days: "Pon - Pt", hours: "09:00 - 20:00" },
    { days: "Sob", hours: "10:00 - 16:00" },
    { days: "Ndz", hours: "Zamknięte" }
  ],
  formTitle: "Napisz do nas"
};

export default function Contact({ serverData }: { serverData?: any }) {
  const initial = serverData || FALLBACK;
  const [data, setData] = useState({
    title: initial.title || FALLBACK.title,
    subtitle: initial.subtitle || FALLBACK.subtitle,
    phone: initial.phone || FALLBACK.phone,
    email: initial.email || FALLBACK.email,
    address: initial.address || FALLBACK.address,
    openingHours: initial.openingHours?.length ? initial.openingHours : FALLBACK.openingHours,
    formTitle: initial.formTitle || FALLBACK.formTitle,
  });

  const prevRef = useRef(serverData);
  useEffect(() => {
    if (serverData && serverData !== prevRef.current) {
      prevRef.current = serverData;
      setData({
        title: serverData.title || FALLBACK.title,
        subtitle: serverData.subtitle || FALLBACK.subtitle,
        phone: serverData.phone || FALLBACK.phone,
        email: serverData.email || FALLBACK.email,
        address: serverData.address || FALLBACK.address,
        openingHours: serverData.openingHours?.length ? serverData.openingHours : FALLBACK.openingHours,
        formTitle: serverData.formTitle || FALLBACK.formTitle,
      });
    }
  }, [serverData]);

  return (
    <section id="contact" className={styles.contact}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.infoColumn}>
          <h2 className="section-title" style={{ textAlign: "left" }}>{data.title}</h2>
          <p className="section-subtitle" style={{ textAlign: "left", margin: "0 0 3rem" }}>
            {data.subtitle}
          </p>
          
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}><Phone size={24} /></div>
              <div><h4>Telefon</h4><p>{data.phone}</p></div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}><Mail size={24} /></div>
              <div><h4>Email</h4><p>{data.email}</p></div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}><MapPin size={24} /></div>
              <div><h4>Adres</h4><p>{data.address}</p></div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}><Clock size={24} /></div>
              <div>
                <h4>Godziny otwarcia</h4>
                {data.openingHours.map((h: any, i: number) => (
                  <p key={i}>{h.days}: {h.hours}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formColumn}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()} aria-label="Formularz kontaktowy">
            <h3 className={styles.formTitle}>{data.formTitle}</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="contact-name" className="sr-only">Imię i nazwisko</label>
              <input 
                type="text" 
                id="contact-name"
                name="name"
                placeholder="Imię i nazwisko" 
                className={styles.input} 
                required 
                aria-required="true"
                autoComplete="name"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="contact-email" className="sr-only">Adres email</label>
              <input 
                type="email" 
                id="contact-email"
                name="email"
                placeholder="Adres email" 
                className={styles.input} 
                required 
                aria-required="true"
                autoComplete="email"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="contact-phone" className="sr-only">Numer telefonu</label>
              <input 
                type="tel" 
                id="contact-phone"
                name="phone"
                placeholder="Numer telefonu" 
                className={styles.input} 
                required 
                aria-required="true"
                autoComplete="tel"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="contact-message" className="sr-only">Wiadomość</label>
              <textarea 
                id="contact-message"
                name="message"
                placeholder="W czym możemy pomóc?" 
                rows={5} 
                className={styles.textarea} 
                required
                aria-required="true"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }} aria-label="Wyślij formularz kontaktowy">
              Wyślij wiadomość
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
