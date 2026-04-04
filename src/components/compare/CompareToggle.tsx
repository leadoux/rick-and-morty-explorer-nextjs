"use client";

import { useCompareStore } from "@/store/compareStore";

type CompareToggleProps =
  | {
      type: "character";
      value: {
        id: string;
        name: string;
        image: string;
        status: string;
        species: string;
      };
    }
  | {
      type: "episode";
      value: {
        id: string;
        name: string;
        episode: string;
        air_date: string;
      };
    };

export function CompareToggle(props: CompareToggleProps) {
  const compareStore = useCompareStore();
  const active =
    props.type === "character"
      ? compareStore.hasCharacter(props.value.id)
      : compareStore.hasEpisode(props.value.id);

  const onClick = () => {
    if (props.type === "character") {
      compareStore.toggleCharacter(props.value);
    } else {
      compareStore.toggleEpisode(props.value);
    }
  };

  return (
    <button type="button" className={`button ${active ? "button--accent" : ""}`} onClick={onClick}>
      {active ? "Selected for compare" : "Compare"}
    </button>
  );
}
