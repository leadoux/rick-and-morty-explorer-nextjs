"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ANNOUNCE_DELAY_MS = 50;
const RESET_DELAY_MS = 20;

function getRouteAnnouncement() {
  const heading = document.querySelector<HTMLElement>("[data-page-heading]") ?? document.querySelector<HTMLElement>("h1");
  const headingText = heading?.textContent?.trim();

  if (headingText) {
    return `Navigated to ${headingText}`;
  }

  const title = document.title?.trim();
  return title ? `Navigated to ${title}` : "Page updated";
}

export function RouteLiveAnnouncer() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!pathname) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let announceTimeoutId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      const nextAnnouncement = getRouteAnnouncement();

      // Reset first, then announce in a separate task so assistive tech consistently detects changes.
      setAnnouncement("");
      announceTimeoutId = window.setTimeout(() => {
        setAnnouncement(nextAnnouncement);
      }, RESET_DELAY_MS);
    }, ANNOUNCE_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
      if (announceTimeoutId !== undefined) {
        window.clearTimeout(announceTimeoutId);
      }
    };
  }, [pathname]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {announcement}
    </div>
  );
}
