const DEFAULT_GRAPHQL_URL = "https://rickandmortyapi.com/graphql";

type GraphqlResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function graphqlRequest<TData, TVariables = Record<string, unknown>>(
  query: string,
  variables?: TVariables,
): Promise<TData> {
  const endpoint = process.env.RICK_AND_MORTY_GRAPHQL_URL ?? DEFAULT_GRAPHQL_URL;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with HTTP ${response.status}`);
  }

  const payload = (await response.json()) as GraphqlResponse<TData>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("GraphQL response did not include data.");
  }

  return payload.data;
}
