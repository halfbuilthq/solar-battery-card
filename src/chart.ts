export function nearestChartPointIndex(
  clientX: number,
  left: number,
  width: number,
  pointCount: number
): number {
  if (pointCount <= 1 || width <= 0) return 0;
  const progress = Math.min(1, Math.max(0, (clientX - left) / width));
  return Math.round(progress * (pointCount - 1));
}

export function chartPositionPercent(index: number, pointCount: number): number {
  if (pointCount <= 1) return 0;
  return (Math.min(pointCount - 1, Math.max(0, index)) / (pointCount - 1)) * 100;
}
