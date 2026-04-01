"use client";

import { useEffect, useState } from "react";

export default function DisableDraftMode() {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  // Don't show the button inside the Presentation Tool iframe
  if (isInIframe) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 9999,
    }}>
      <a
        href="/api/disable-draft"
        style={{
          background: "#f03e2f",
          color: "white",
          padding: "12px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        Exit Draft Mode
      </a>
    </div>
  );
}
