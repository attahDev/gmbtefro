// Matches the `school` slugs used on Course.school / Mentor.schools /
// Opportunity.requiredSchool — keep in sync with the Academy content
// team's slugs if new Schools are added.
export const ACADEMY_SCHOOLS = [
  { value: "microsoft", label: "Microsoft" },
  { value: "aws", label: "AWS" },
  { value: "gcp", label: "Google Cloud" },
  { value: "nvidia", label: "NVIDIA AI" },
  { value: "salesforce", label: "Salesforce" },
  { value: "data-science", label: "Data Science" },
  { value: "research", label: "Research" },
  { value: "startup", label: "Startup School" },
  { value: "investor", label: "Investor School" },
  { value: "business", label: "Business School" },
] as const;

export function schoolLabel(value: string | null | undefined): string {
  return ACADEMY_SCHOOLS.find((s) => s.value === value)?.label ?? value ?? "";
}
