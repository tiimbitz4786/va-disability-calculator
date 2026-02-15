import { COMPENSATION_RATES, CONDITIONS } from '../constants/conditions';

export function combinedRating(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  const sorted = [...ratings].sort((a, b) => b - a);
  let combined = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    combined = combined + ((100 - combined) * sorted[i]) / 100;
  }
  return Math.min(Math.round(combined / 10) * 10, 100);
}

export function getMonthlyRate(rating, hasSpouse, hasChildren) {
  if (rating === 0) return 0;
  if (rating < 30) return COMPENSATION_RATES[rating] || 0;
  const rates = COMPENSATION_RATES[rating];
  if (!rates) return 0;
  if (hasChildren && hasSpouse) return rates.childSpouse;
  if (hasChildren) return rates.child;
  if (hasSpouse) return rates.spouse;
  return rates.alone;
}

/**
 * Calculate results for all flows:
 * - 0% vets: combine all new claim ratings
 * - 10-90% vets: combine unchanged existing + increased + new claim ratings
 */
export function calculateResults({
  currentRating,
  hasSpouse,
  hasChildren,
  selectedConditions,
  answers,
  currentRatedConditions,
  increasedRatingConditions,
  increasedRatingAnswers,
}) {
  // Gather individual ratings from existing conditions NOT being increased
  const unchangedRatings = (currentRatedConditions || [])
    .filter(c => !(increasedRatingConditions || []).find(ic => ic.key === c.key))
    .map(c => c.currentRating)
    .filter(r => r > 0);

  // Gather increased ratings (new severity answers replacing old ratings)
  const increasedRatings = (increasedRatingConditions || [])
    .map(c => {
      const answer = (increasedRatingAnswers || {})[c.key];
      return answer || c.currentRating; // fallback to current if no answer
    })
    .filter(r => r > 0);

  // Gather new claim ratings
  const newRatings = (selectedConditions || []).map(cond => {
    const answer = answers[cond.id];
    if (!answer) return 0;
    if (cond.bilateral && cond.side === 'Both') {
      return [answer, answer];
    }
    return answer;
  }).flat();

  // Combine all individual ratings using VA math
  const allIndividualRatings = [...unchangedRatings, ...increasedRatings, ...newRatings];
  const projectedRating = combinedRating(allIndividualRatings);

  const currentMonthly = getMonthlyRate(currentRating, hasSpouse, hasChildren);
  const projectedMonthly = getMonthlyRate(projectedRating, hasSpouse, hasChildren);
  const monthlyIncrease = projectedMonthly - currentMonthly;
  const annualIncrease = monthlyIncrease * 12;
  const fiveYearValue = annualIncrease * 5;

  return {
    currentRating,
    projectedRating,
    currentMonthly,
    projectedMonthly,
    monthlyIncrease,
    annualIncrease,
    fiveYearValue,
    newRatings,
    allIndividualRatings,
    qualifiesForIncrease: projectedRating > currentRating,
  };
}
