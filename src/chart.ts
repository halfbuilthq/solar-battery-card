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

export function chartTooltipPosition(
  pointerX: number,
  pointerY: number,
  chartWidth: number,
  chartHeight: number,
  tooltipWidth = 166,
  tooltipHeight = 88,
  gap = 14
): {
  x: number;
  top: number;
  placement: "place-left" | "place-right";
} {
  const x = Math.min(chartWidth, Math.max(0, pointerX));
  const top = Math.min(
    Math.max(4, chartHeight - tooltipHeight - 4),
    Math.max(4, pointerY - tooltipHeight / 2)
  );
  return {
    x,
    top,
    placement:
      x + gap + tooltipWidth > chartWidth ? "place-left" : "place-right"
  };
}
