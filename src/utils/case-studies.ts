/*
 * Shared helpers for case studies.
 * Pages and components use these so they all agree on which case studies to show, and in what order.
 */
import { getCollection, type CollectionEntry } from "astro:content";

export type CaseStudy = CollectionEntry<"caseStudies">;

// True while you run `npm run dev`. False when building the published site.
const isLocal = import.meta.env.DEV;

function isVisible(caseStudy: CaseStudy): boolean {
  if (isLocal) {
    return true;
  }
  return caseStudy.data.draft === false;
}

function byOrder(first: CaseStudy, second: CaseStudy): number {
  return first.data.order - second.data.order;
}

/** Every case study that should appear on the site, in grid order. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const all = await getCollection("caseStudies");
  return all.filter(isVisible).sort(byOrder);
}

/** The page address for a case study, for example /work/halo-health/ */
export function getLink(caseStudy: CaseStudy): string {
  return `/work/${caseStudy.id}/`;
}
