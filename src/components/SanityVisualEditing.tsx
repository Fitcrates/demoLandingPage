"use client";

import { VisualEditing } from "next-sanity/visual-editing";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SanityVisualEditing() {
  const [isIframe, setIsIframe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  if (!isIframe) return null;

  return (
    <VisualEditing
      refresh={async (payload) => {
        // When Studio signals content changed, tell Next.js to refetch server data.
        // SanityLive handles cache tag revalidation automatically,
        // but router.refresh() ensures the page re-renders with fresh props.
        router.refresh();
      }}
    />
  );
}
