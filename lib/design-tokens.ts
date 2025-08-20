/**
 * Design Token System for  Notes App
 *
 * This file contains all the design tokens used throughout the application.
 * These tokens ensure consistency in colors, typography, spacing, and other design elements.
 */

// ===== COLOR TOKENS =====

export const colors = {
  // Light Theme Colors
  light: {
    background: "oklch(0.98 0.002 285.823)",
    foreground: "oklch(0.15 0.005 285.823)",
    card: "oklch(1 0 0)",
    cardForeground: "oklch(0.15 0.005 285.823)",
    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.15 0.005 285.823)",
    primary: "oklch(0.55 0.15 250)",
    primaryForeground: "oklch(0.98 0.002 285.823)",
    secondary: "oklch(0.96 0.002 285.823)",
    secondaryForeground: "oklch(0.25 0.005 285.823)",
    muted: "oklch(0.96 0.002 285.823)",
    mutedForeground: "oklch(0.45 0.005 285.823)",
    accent: "oklch(0.94 0.005 250)",
    accentForeground: "oklch(0.25 0.005 285.823)",
    destructive: "oklch(0.65 0.15 25)",
    destructiveForeground: "oklch(0.98 0.002 285.823)",
    border: "oklch(0.9 0.002 285.823)",
    input: "oklch(0.9 0.002 285.823)",
    ring: "oklch(0.55 0.15 250)",
    sidebar: "oklch(0.97 0.002 285.823)",
    sidebarForeground: "oklch(0.15 0.005 285.823)",
    sidebarPrimary: "oklch(0.55 0.15 250)",
    sidebarPrimaryForeground: "oklch(0.98 0.002 285.823)",
    sidebarAccent: "oklch(0.94 0.005 250)",
    sidebarAccentForeground: "oklch(0.25 0.005 285.823)",
    sidebarBorder: "oklch(0.9 0.002 285.823)",
    sidebarRing: "oklch(0.55 0.15 250)",
    chart1: "oklch(0.55 0.15 250)",
    chart2: "oklch(0.65 0.15 150)",
    chart3: "oklch(0.65 0.15 50)",
    chart4: "oklch(0.65 0.15 300)",
    chart5: "oklch(0.65 0.15 200)",
  },

  // Dark Theme Colors
  dark: {
    background: "oklch(0.08 0.002 285.823)",
    foreground: "oklch(0.95 0.002 285.823)",
    card: "oklch(0.12 0.002 285.823)",
    cardForeground: "oklch(0.95 0.002 285.823)",
    popover: "oklch(0.12 0.002 285.823)",
    popoverForeground: "oklch(0.95 0.002 285.823)",
    primary: "oklch(0.65 0.15 250)",
    primaryForeground: "oklch(0.08 0.002 285.823)",
    secondary: "oklch(0.18 0.002 285.823)",
    secondaryForeground: "oklch(0.95 0.002 285.823)",
    muted: "oklch(0.18 0.002 285.823)",
    mutedForeground: "oklch(0.65 0.005 285.823)",
    accent: "oklch(0.22 0.005 250)",
    accentForeground: "oklch(0.95 0.002 285.823)",
    destructive: "oklch(0.75 0.15 25)",
    destructiveForeground: "oklch(0.08 0.002 285.823)",
    border: "oklch(0.25 0.002 285.823)",
    input: "oklch(0.25 0.002 285.823)",
    ring: "oklch(0.65 0.15 250)",
    sidebar: "oklch(0.12 0.002 285.823)",
    sidebarForeground: "oklch(0.95 0.002 285.823)",
    sidebarPrimary: "oklch(0.65 0.15 250)",
    sidebarPrimaryForeground: "oklch(0.08 0.002 285.823)",
    sidebarAccent: "oklch(0.22 0.005 250)",
    sidebarAccentForeground: "oklch(0.95 0.002 285.823)",
    sidebarBorder: "oklch(0.25 0.002 285.823)",
    sidebarRing: "oklch(0.65 0.15 250)",
    chart1: "oklch(0.65 0.15 250)",
    chart2: "oklch(0.75 0.15 150)",
    chart3: "oklch(0.75 0.15 50)",
    chart4: "oklch(0.75 0.15 300)",
    chart5: "oklch(0.75 0.15 200)",
  },
} as const;

// ===== TYPOGRAPHY TOKENS =====

export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },

  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },

  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },

  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  letterSpacing: {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
  },
} as const;

// ===== SPACING TOKENS =====

export const spacing = {
  0: "0px",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  48: "12rem",
  56: "14rem",
  64: "16rem",
} as const;

// ===== BORDER RADIUS TOKENS =====

export const borderRadius = {
  none: "0px",
  sm: "calc(var(--radius-base) - 2px)",
  md: "calc(var(--radius-base) - 1px)",
  lg: "var(--radius-base)",
  xl: "calc(var(--radius-base) + 2px)",
  "2xl": "calc(var(--radius-base) + 4px)",
  "3xl": "calc(var(--radius-base) + 8px)",
  full: "9999px",
  base: "0.75rem",
} as const;

// ===== SHADOW TOKENS =====

export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// ===== TRANSITION TOKENS =====

export const transitions = {
  fast: "150ms ease-in-out",
  normal: "250ms ease-in-out",
  slow: "350ms ease-in-out",
  smooth: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

// ===== Z-INDEX TOKENS =====

export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// ===== BREAKPOINT TOKENS =====

export const breakpoints = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ===== COMPONENT-SPECIFIC TOKENS =====

export const components = {
  button: {
    height: {
      sm: "2rem",
      md: "2.5rem",
      lg: "3rem",
    },
    padding: {
      sm: "0.5rem 1rem",
      md: "0.75rem 1.5rem",
      lg: "1rem 2rem",
    },
  },

  input: {
    height: "2.5rem",
    padding: "0.5rem 0.75rem",
  },

  card: {
    padding: "1.5rem",
    gap: "1rem",
  },

  dialog: {
    maxWidth: "32rem",
    padding: "1.5rem",
  },
} as const;

// ===== UTILITY FUNCTIONS =====

/**
 * Get a color value for a specific theme
 */
export function getColor(
  theme: "light" | "dark",
  color: keyof typeof colors.light
) {
  return colors[theme][color];
}

/**
 * Get a spacing value
 */
export function getSpacing(space: keyof typeof spacing) {
  return spacing[space];
}

/**
 * Get a typography value
 */
export function getTypography(
  category: keyof typeof typography,
  value: string
) {
  return typography[category][
    value as keyof (typeof typography)[typeof category]
  ];
}

/**
 * Create a CSS custom property reference
 */
export function cssVar(name: string) {
  return `var(--${name})`;
}

// ===== EXPORT ALL TOKENS =====

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  components,
} as const;

export default designTokens;
