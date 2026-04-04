import type { EntityKind } from "@/types/entities";

export type FavoriteItem = {
  id: string;
  kind: EntityKind;
  name: string;
  subtitle: string;
  image?: string;
};
