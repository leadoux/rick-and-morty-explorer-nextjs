"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UseUrlSyncedFiltersParams = {
  debounceKeys?: string[];
};

export function useUrlSyncedFilters({ debounceKeys = [] }: UseUrlSyncedFiltersParams = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    if (name !== "page") {
      params.delete("page");
    }

    const query = params.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    const method = debounceKeys.includes(name) ? router.replace : router.push;
    method(href, { scroll: false });
  };

  return {
    updateFilter,
  };
}
