import Link from "next/link";
import { LocationDetail } from "@/components/locations/LocationDetail";
import { ErrorState } from "@/components/states/ErrorState";
import { getErrorMessage } from "@/lib/errors";
import { graphqlRequest } from "@/lib/graphql/client";
import { LOCATION_DETAIL_QUERY } from "@/lib/queries";
import type { LocationDetailQueryResult } from "@/types/graphql";

type LocationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  let error = "";
  let location: LocationDetailQueryResult["location"] = null;
  const { id } = await params;

  try {
    const data = await graphqlRequest<LocationDetailQueryResult>(LOCATION_DETAIL_QUERY, { id });
    location = data.location;
  } catch (unknownError) {
    error = getErrorMessage(unknownError);
  }

  return (
    <section className="section">
      <Link href="/locations" className="muted">
        Back to locations
      </Link>
      {error ? <ErrorState message={error} /> : null}
      {!error && !location ? <p className="muted">Location was not found.</p> : null}
      {!error && location ? <LocationDetail location={location} /> : null}
    </section>
  );
}
