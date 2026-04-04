import { getErrorMessage } from "@/lib/errors";
import { graphqlRequest } from "@/lib/graphql/client";
import { CHARACTERS_QUERY } from "@/lib/queries";
import type { CharactersQueryResult } from "@/types/graphql";

async function fetchCharactersCount() {
  const data = await graphqlRequest<CharactersQueryResult>(CHARACTERS_QUERY, {
    page: 1,
  });
  return data.characters?.info.count ?? 0;
}

export default async function CharactersPage() {
  let count = 0;
  let error = "";

  try {
    count = await fetchCharactersCount();
  } catch (unknownError) {
    error = getErrorMessage(unknownError);
  }

  return (
    <section className="section">
      <h1>Characters</h1>
      {error ? (
        <p className="muted">Data source is initializing: {error}</p>
      ) : (
        <p className="muted">Loaded catalog metadata: {count} characters available.</p>
      )}
    </section>
  );
}
