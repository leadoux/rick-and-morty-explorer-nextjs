"use client";

import Link from "next/link";
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
  const [value, setValue] = useState("");
  const debounced = useDebouncedValue(value, 300);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Required<SearchPayload>["data"] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const term = debounced.trim();

    if (term.length < 2) {
      setResults(null);
      setIsLoading(false);
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

  return (
    <div className="global-search">
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search characters, episodes, locations"
      />
      {(isLoading || hasResults) && (
        <div className="search-panel">
          {isLoading && <p className="muted">Searching...</p>}
          {!isLoading && (
            <>
              <SearchGroup
                title="Characters"
                items={results?.characters?.results ?? []}
                hrefPrefix="/character"
              />
              <SearchGroup title="Episodes" items={results?.episodes?.results ?? []} hrefPrefix="/episode" />
              <SearchGroup
                title="Locations"
                items={results?.locations?.results ?? []}
                hrefPrefix="/location"
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
};

function SearchGroup({ title, items, hrefPrefix }: SearchGroupProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h4>{title}</h4>
      <ul className="search-list">
        {items.slice(0, 5).map((item) => (
          <li key={item.id}>
            <Link href={`${hrefPrefix}/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
