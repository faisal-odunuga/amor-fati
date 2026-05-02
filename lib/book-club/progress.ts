export function calculateWeightedProgressFromCompletedWeight(
  totalWeightCompleted: number,
  totalWeight: number
) {
  return totalWeight === 0 ? 0 : Math.min(100, (totalWeightCompleted / totalWeight) * 100);
}
