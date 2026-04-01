"use client";

import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { useEffect, useState } from "react";

export default function SanityVisualEditing() {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  if (!isIframe) return null;

  return (
    <>
      <VisualEditing />
      <SanityLive 
        refreshOnMount={false}
        refreshOnFocus={false}
        refreshOnReconnect={false}
      />
    </>
  );
}
