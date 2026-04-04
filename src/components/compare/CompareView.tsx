"use client";

import { useCompareStore } from "@/store/compareStore";

export function CompareView() {
  const { characters, episodes } = useCompareStore();

  return (
    <div className="compare-grid">
      <section className="card">
        <div className="card__body">
          <h2>Character Comparison</h2>
          {characters.length < 2 ? (
            <p className="muted">Select 2 characters from cards or detail pages.</p>
          ) : (
            <div className="compare-columns">
              {characters.map((character) => (
                <article key={character.id}>
                  <h3>{character.name}</h3>
                  <p className="muted">{character.status}</p>
                  <p className="muted">{character.species}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="card">
        <div className="card__body">
          <h2>Episode Comparison</h2>
          {episodes.length < 2 ? (
            <p className="muted">Select 2 episodes from cards or detail pages.</p>
          ) : (
            <div className="compare-columns">
              {episodes.map((episode) => (
                <article key={episode.id}>
                  <h3>{episode.name}</h3>
                  <p className="muted">{episode.episode}</p>
                  <p className="muted">{episode.air_date}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
