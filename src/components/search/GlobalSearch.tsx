"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { GLOBAL_SEARCH_QUERY } from "@/lib/queries";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { createCachedGraphqlFetch } from "@/lib/graphqlCache";

type SearchResult = {
  id: string;
  name: string;
  episode?: string;
  type?: string;
};

type SearchPayload = {
  data?: {
    characters?: { results?: SearchResult[] };
    episodes?: { results?: SearchResult[] };
    locations?: { results?: SearchResult[] };
  };
};

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "https://rickandmortyapi.com/graphql";
const cachedFetch = createCachedGraphqlFetch();

export function GlobalSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debounced = useDebouncedValue(value, 300);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Required<SearchPayload>["data"] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let cancelled = false;
    const term = debounced.trim();

    if (term.length < 2) {
      setResults(null);
      setIsLoading(false);
      setActiveIndex(-1);
      return;
    }

    async function run() {
      setIsLoading(true);
      try {
        const response = await cachedFetch(endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            query: GLOBAL_SEARCH_QUERY,
            variables: { name: term },
          }),
        });
        const payload = (await response.json()) as SearchPayload;
        if (!cancelled) {
          setResults(payload.data ?? null);
          setIsOpen(true);
          setActiveIndex(-1);
        }
      } catch {
        if (!cancelled) {
          setResults(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [debounced]);

  const hasResults = useMemo(() => {
    if (!results) return false;
    return Boolean(
      results.characters?.results?.length ||
        results.episodes?.results?.length ||
        results.locations?.results?.length,
    );
  }, [results]);

  const options = useMemo(() => {
    if (!results) return [];

    return [
      ...(results.characters?.results ?? []).slice(0, 5).map((item) => ({
        id: `characters-${item.id}`,
        href: `/character/${item.id}`,
        label: item.name,
      })),
      ...(results.episodes?.results ?? []).slice(0, 5).map((item) => ({
        id: `episodes-${item.id}`,
        href: `/episode/${item.id}`,
        label: item.name,
      })),
      ...(results.locations?.results ?? []).slice(0, 5).map((item) => ({
        id: `locations-${item.id}`,
        href: `/location/${item.id}`,
        label: item.name,
      })),
    ];
  }, [results]);

  const listboxId = "global-search-listbox";
  const showDebounceHint = value.trim().length > 0 && value.trim().length < 2;
  const showPanel = isOpen && (isLoading || hasResults);
  const activeOption = activeIndex >= 0 ? options[activeIndex] : null;

  const closePanel = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  return (
    <div className="global-search">
      <input
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showPanel}
        aria-controls={listboxId}
        aria-activedescendant={activeOption ? `global-search-option-${activeOption.id}` : undefined}
        value={value}
        onFocus={() => {
          if (value.trim().length >= 2 && (isLoading || hasResults)) {
            setIsOpen(true);
          }
        }}
        onChange={(event) => {
          setValue(event.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            if (!showPanel) {
              setIsOpen(true);
              return;
            }
            setActiveIndex((current) => Math.min(current + 1, options.length - 1));
            return;
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            if (!showPanel) return;
            setActiveIndex((current) => Math.max(current - 1, -1));
            return;
          }

          if (event.key === "Enter" && activeOption) {
            event.preventDefault();
            router.push(activeOption.href);
            closePanel();
            return;
          }

          if (event.key === "Escape") {
            event.preventDefault();
            if (showPanel) {
              closePanel();
            } else if (value) {
              setValue("");
              setResults(null);
              setActiveIndex(-1);
            }
          }
        }}
        placeholder="Search everything..."
      />
      {showDebounceHint ? <p className="search-hint muted">Type at least 2 characters to search.</p> : null}
      {showPanel && (
        <div id={listboxId} className="search-panel" aria-label="Global search results">
          {isLoading && <p className="muted">Searching...</p>}
          {!isLoading && (
            <>
              <SearchGroup
                title="Characters"
                items={results?.characters?.results ?? []}
                hrefPrefix="/character"
                activeOptionId={activeOption?.id}
                onNavigate={closePanel}
              />
              <SearchGroup
                title="Episodes"
                items={results?.episodes?.results ?? []}
                hrefPrefix="/episode"
                activeOptionId={activeOption?.id}
                onNavigate={closePanel}
              />
              <SearchGroup
                title="Locations"
                items={results?.locations?.results ?? []}
                hrefPrefix="/location"
                activeOptionId={activeOption?.id}
                onNavigate={closePanel}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

type SearchGroupProps = {
  title: string;
  items: SearchResult[];
  hrefPrefix: string;
  activeOptionId?: string;
  onNavigate: () => void;
};

function SearchGroup({ title, items, hrefPrefix, activeOptionId, onNavigate }: SearchGroupProps) {
  if (items.length === 0) return null;

  const groupId = title.toLowerCase();

  return (
    <section>
      <h4>{title}</h4>
      <ul className="search-list">
        {items.slice(0, 5).map((item) => (
          <li
            key={item.id}
            id={`global-search-option-${groupId}-${item.id}`}
            className={activeOptionId === `${groupId}-${item.id}` ? "search-list__item--active" : undefined}
          >
            <Link href={`${hrefPrefix}/${item.id}`} onClick={onNavigate}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
