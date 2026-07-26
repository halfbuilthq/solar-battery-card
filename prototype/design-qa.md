# Design QA — Solar & storage card

## Source of truth

- Approved hybrid concept:
  `/Users/kurtkonemann/.codex/generated_images/019f9b5f-f842-7810-9c58-56f719345574/exec-823406b2-5510-4049-8530-d00998bb4b1d.png`
- Implemented card capture: `design-qa-card.png`
- Same-scale side-by-side comparison: `design-qa-comparison.png`
- Preview viewport: 1280 × 720 CSS px
- Comparison width: 506 px per card

## Visual comparison

### First pass

- P1: The canvas-based graph did not render in the browser capture.
  - Fixed by moving the three series to Recharts while preserving the approved colors, line weights, dashed battery line, grid, and labels.
- P2: The implementation was roughly 10% taller than the reference.
  - Fixed by tightening header, hero, live-power strip, chart, totals, and footer spacing.
- P2: The header used a horizontal battery icon instead of the reference's vertical battery.
  - Fixed by rotating the library-provided battery icon.
- P2: The chart lacked its final “Now” data markers.
  - Fixed with Recharts endpoint dots.

### Final pass

- Battery percentage and full-time forecast remain the dominant scan target.
- Live kW values retain the four-color Home Assistant-style entity treatment.
- The 24-hour chart and daily kWh totals match the approved compact hierarchy.
- Card width, overall height, radii, borders, typography, color, and density are visually aligned with the reference.
- No horizontal overflow was detected at the desktop verification viewport.
- Semantic regions and accessible labels are present for the card, live power, chart, energy totals, and battery state.

final result: passed
