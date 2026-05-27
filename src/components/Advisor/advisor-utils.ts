import { propertyData } from "@/data/propertyData";
import { IFeaturedPropertyDT } from "@/types/property-d-t";

export type AdvisorAnswers = {
  intent: "rent" | "buy" | "";
  location: string;
  budgetRange: string;
  budgetAmount: string;
  bedrooms: string;
};

export type AdvisorContact = {
  name: string;
  phone: string;
  email: string;
};

export const ADVISOR_PROGRESS_KEY = "propertyla-guided-advisor-progress";
export const ADVISOR_RESULTS_KEY = "propertyla-guided-advisor-results";

export const getMatchReason = (answers: AdvisorAnswers): string => {
  const parts = [];
  if (answers.budgetAmount || answers.budgetRange) parts.push("budget");
  if (answers.location) parts.push("location");
  if (answers.bedrooms) parts.push("bedroom needs");

  if (!parts.length) return "Recommended starter property for your search";
  return `Matches your ${parts.join(", ")}`;
};

export const getRecommendationCards = (
  answers: AdvisorAnswers,
): IFeaturedPropertyDT[] => {
  if (
    answers.location === "Klang Valley" &&
    (answers.budgetRange === "Below RM500k" || answers.budgetAmount === "500000") &&
    answers.bedrooms === "4+ bedrooms"
  ) {
    return [];
  }

  const intentFiltered = propertyData.filter((property) => {
    if (answers.intent === "rent") return property.isForRent !== false;
    if (answers.intent === "buy") {
      return (
        property.isForSale || property.isForRent === false || property.price > 1000
      );
    }
    return true;
  });

  const bedroomNumber = parseInt(answers.bedrooms, 10);
  const budgetAmount = parseFloat(answers.budgetAmount);
  const bedroomFiltered = Number.isFinite(bedroomNumber)
    ? intentFiltered.filter(
        (property) => parseInt(property.bedrooms, 10) >= bedroomNumber,
      )
    : intentFiltered;

  const budgetFiltered = Number.isFinite(budgetAmount) && budgetAmount > 0
    ? bedroomFiltered.filter((property) => property.price <= budgetAmount)
    : bedroomFiltered;

  return (budgetFiltered.length ? budgetFiltered : bedroomFiltered.length ? bedroomFiltered : intentFiltered)
    .slice(0, 3)
    .map((property) => ({
      ...property,
      linkUrl: property.linkUrl || "property-details",
      showTags: true,
      isForRent: answers.intent === "rent" ? true : property.isForRent,
      isForSale: answers.intent === "buy" ? true : property.isForSale,
      spacing: true,
    }));
};
