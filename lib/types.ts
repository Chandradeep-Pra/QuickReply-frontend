// Allowed Research Domains
export const DOMAINS = [
  "Computer Science",
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Social Sciences",
] as const;

// Allowed Reading Stages
export const STAGES = [
  "Abstract Read",
  "Introduction Done",
  "Methodology Done",
  "Results Analyzed",
  "Fully Read",
  "Notes Completed",
] as const;

// Allowed Impact Levels
export const IMPACTS = [
  "High Impact",
  "Medium Impact",
  "Low Impact",
  "Unknown",
] as const;

export type Domain = (typeof DOMAINS)[number];
export type Stage = (typeof STAGES)[number];
export type Impact = (typeof IMPACTS)[number];

// Paper Type Definition
export interface Paper {
  id: string;
  title: string;
  author: string;
  domain: Domain;
  stage: Stage;
  citations: number;
  impact: Impact;
  date: string; // ISO date string
}