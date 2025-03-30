// Tag colors mapping for consistent styling across components
export const tagColors: Record<string, string> = {
  javascript: "text-yellow-400",
  typescript: "text-blue-400",
  react: "text-cyan-400",
  node: "text-green-400",
  css: "text-purple-400",
  html: "text-orange-400",
  astro: "text-red-400",
  software: "text-pink-400",
  default: "text-sky-400"
};

// Get the appropriate color class for a tag
export function getTagColor(tagVal: string): string {
  const normalizedTag = tagVal.toLowerCase();
  for (const [key, value] of Object.entries(tagColors)) {
    if (normalizedTag.includes(key)) return value;
  }
  return tagColors.default;
} 