import { CompareView } from "@/components/compare/CompareView";

export default function ComparePage() {
  return (
    <section className="section">
      <h1 data-page-heading tabIndex={-1}>
        Compare
      </h1>
      <CompareView />
    </section>
  );
}
