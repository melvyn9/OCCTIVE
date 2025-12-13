// src/utils/topicColors.ts
// Centralized topic → color mapping to keep HomeCard and DependencyGraph colors consistent.

/* Base palette used first for visual quality and accessibility */
/* Only 17 possible colors, after this, generates more via golden-ratio spacing */
const palette = [
  '#3E92B4', // softened pink (was FF69B4)
  '#8a6fb9ff', // muted yellow (was F5FF66)
  '#E18461', // softer cyan (was 00AEEF)
  '#D9B337', // muted orange-red (was FF8866)
  '#5d8952ff', // less saturated gold (was FFD966)
  '#d86faeff', // gentler sky blue (was 7FDBFF)
  '#3AA6A6', // softer lime green (was 32CD32)
  '#9D7AD9', // less neon violet (was 8A2BE2)
  '#3AA6A6', // muted teal (was 20B2AA)
  '#F2874E', // warm coral (was FF7034)
  '#5F3BAE', // subdued indigo (was 4B0082)
  '#A870C6', // calmer lavender (was BA55D3)
  '#7A6CD6', // softened slate purple (was 6A5ACD)
  '#C9A542', // desaturated goldenrod (was DAA520)
  '#51BFC0', // softer turquoise (was 48D1CC)
  '#E3624D', // muted tomato red (was FF6347)
  '#5C83B9', // gentler steel blue (was 4682B4)
];

/* Single shared registry: same topic key always maps to the same color */
const colourOf = new Map<string, string>();

/* Uses palette first, then generates distinct colors via golden-ratio hue spacing */
function generateColor(index: number): string {
  if (index < palette.length) return palette[index];

  const hue = ((index - palette.length) * 137.508) % 360;
  return `hsl(${hue}, 65%, 55%)`;
}

/* Returns a stable color for a topic key, assigning one if it doesn't exist */
export function getColorForTopic(topicKey: string): string {
  if (!colourOf.has(topicKey)) {
    colourOf.set(topicKey, generateColor(colourOf.size));
  }
  return colourOf.get(topicKey)!;
}

/* Exposes the full topic → color map (read-only usage expected) */
export function getAllTopicColors(): Map<string, string> {
  return colourOf;
}
