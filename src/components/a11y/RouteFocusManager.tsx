"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const ROUTE_FOCUS_DELAY_MS = 30;

export function RouteFocusManager() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!pathname) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const heading = document.querySelector<HTMLElement>("[data-page-heading]");
      const main = document.querySelector<HTMLElement>("#main-content");

      if (heading) {
        heading.focus();
      } else {
        main?.focus();
      }
    }, ROUTE_FOCUS_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
