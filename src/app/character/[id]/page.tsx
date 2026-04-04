import Link from "next/link";
import { CharacterDetail } from "@/components/characters/CharacterDetail";
import { ErrorState } from "@/components/states/ErrorState";
import { getErrorMessage } from "@/lib/errors";
import { graphqlRequest } from "@/lib/graphql/client";
import { CHARACTER_DETAIL_QUERY } from "@/lib/queries";
import type { CharacterDetailQueryResult } from "@/types/graphql";

type CharacterDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  let error = "";
  let character: CharacterDetailQueryResult["character"] = null;
  const { id } = await params;

  try {
    const data = await graphqlRequest<CharacterDetailQueryResult>(CHARACTER_DETAIL_QUERY, { id });
    character = data.character;
  } catch (unknownError) {
    error = getErrorMessage(unknownError);
  }

  return (
    <section className="section">
      <Link href="/characters" className="muted">
        Back to characters
      </Link>
      {error ? <ErrorState message={error} /> : null}
      {!error && !character ? <p className="muted">Character was not found.</p> : null}
      {!error && character ? <CharacterDetail character={character} /> : null}
    </section>
  );
}
