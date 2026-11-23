/*
 * Shared helpers for reading case studies.
 * Pages and components use these so they all agree on which case studies to show, and in what order.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type CaseStudy = CollectionEntry<'caseStudies'>;

// True while you run `npm run dev`. False when building the published site.
const isRunningLocally = import.meta.env.DEV;

function shouldShowCaseStudy(caseStudy: CaseStudy): boolean {
  if (isRunningLocally) {
    return true;
  }
  const isPublished = caseStudy.data.isDraft === false;
  return isPublished;
}

function compareBySortOrder(firstCaseStudy: CaseStudy, secondCaseStudy: CaseStudy): number {
  return firstCaseStudy.data.sortOrder - secondCaseStudy.data.sortOrder;
}

export async function getVisibleCaseStudies(): Promise<CaseStudy[]> {
  const allCaseStudies = await getCollection('caseStudies');
  const visibleCaseStudies = allCaseStudies.filter(shouldShowCaseStudy);
  const sortedCaseStudies = visibleCaseStudies.sort(compareBySortOrder);
  return sortedCaseStudies;
}

export function getCaseStudyPageAddress(caseStudy: CaseStudy): string {
  return `/work/${caseStudy.id}/`;
}
