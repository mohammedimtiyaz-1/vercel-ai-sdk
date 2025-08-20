# Notes Memo Design System

This document outlines the design system for the Smart Notes application, including design tokens, color schemes, typography, spacing, and component guidelines.

## 🎨 Design Philosophy

Our design system prioritizes:

- **Accessibility**: WCAG AA compliance with proper contrast ratios
- **Modern Aesthetics**: Clean, minimalist design with subtle depth
- **Consistency**: Unified visual language across all components
- **Performance**: Efficient CSS with minimal bundle impact
- **Responsiveness**: Mobile-first design approach

## 🌈 Color System

### Color Tokens

Our color system uses CSS custom properties (CSS variables) for consistent theming:

```css
/* Light Theme */
--primary: oklch(0.55 0.15 250) /* Vibrant Blue */
  --secondary: oklch(0.96 0.002 285.823) /* Subtle Gray */
  --accent: oklch(0.94 0.005 250) /* Interactive Blue */
  --destructive: oklch(0.65 0.15 25) /* Error Red */ /* Dark Theme */
  --primary: oklch(0.65 0.15 250) /* Brighter Blue */
  --secondary: oklch(0.18 0.002 285.823) /* Dark Gray */
  --accent: oklch(0.22 0.005 250) /* Subtle Blue */
  --destructive: oklch(0.75 0.15 25) /* Softer Red */;
```

### Color Usage Guidelines

- **Primary**: Main actions, links, and brand elements
- **Secondary**: Supporting elements and backgrounds
- **Accent**: Interactive elements and highlights
- **Destructive**: Error states and dangerous actions
- **Muted**: Subtle text and borders

### Accessibility

All color combinations meet WCAG AA contrast requirements:

- Light theme: 4.5:1 minimum contrast ratio
- Dark theme: 4.5:1 minimum contrast ratio
- Interactive elements: 3:1 minimum contrast ratio

## 📝 Typography

### Font Stack

```css
--font-sans: var(--font-geist-sans) /* Primary font */
  --font-mono: var(--font-geist-mono) /* Code and monospace */;
```

### Font Sizes

```css
--font-size-xs: 0.75rem /* 12px */ --font-size-sm: 0.875rem /* 14px */
  --font-size-base: 1rem /* 16px */ --font-size-lg: 1.125rem /* 18px */
  --font-size-xl: 1.25rem /* 20px */ --font-size-2xl: 1.5rem /* 24px */
  --font-size-3xl: 1.875rem /* 30px */ --font-size-4xl: 2.25rem /* 36px */;
```

### Font Weights

```css
--font-weight-normal: 400 --font-weight-medium: 500 --font-weight-semibold: 600
  --font-weight-bold: 700;
```

### Line Heights

```css
--line-height-tight: 1.25 /* Headings */ --line-height-normal: 1.5
  /* Body text */ --line-height-relaxed: 1.75 /* Large text blocks */;
```

## 📏 Spacing System

### Spacing Scale

```css
--space-0: 0px --space-1: 0.25rem /* 4px */ --space-2: 0.5rem /* 8px */
  --space-3: 0.75rem /* 12px */ --space-4: 1rem /* 16px */ --space-6: 1.5rem
  /* 24px */ --space-8: 2rem /* 32px */ --space-12: 3rem /* 48px */
  --space-16: 4rem /* 64px */;
```

### Usage Guidelines

- Use consistent spacing multiples (4px base unit)
- Prefer semantic spacing over arbitrary values
- Maintain visual rhythm throughout the interface

## 🔲 Border Radius

### Radius Scale

```css
--radius-base: 0.75rem /* 12px - Default */ --radius-sm: 0.5rem
  /* 8px - Small elements */ --radius-md: 0.625rem /* 10px - Medium elements */
  --radius-lg: 0.875rem /* 14px - Large elements */ --radius-xl: 1rem
  /* 16px - Extra large */ --radius-2xl: 1.25rem /* 20px - Cards and dialogs */
  --radius-full: 9999px /* Pills and circles */;
```

### Usage Guidelines

- **Small radius**: Buttons, inputs, tags
- **Medium radius**: Cards, dropdowns
- **Large radius**: Modals, large containers
- **Full radius**: Pills, avatars, circular elements

## 🌟 Shadows

### Shadow Scale

```css
--shadow-sm:
  0 1px 2px 0 rgb(0 0 0 / 0.05) --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
  0 2px 4px -2px rgb(0 0 0 / 0.1) --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
  0 4px 6px -4px rgb(0 0 0 / 0.1) --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
  0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### Usage Guidelines

- **Small**: Subtle elevation (buttons, inputs)
- **Medium**: Cards and panels
- **Large**: Modals and overlays
- **Extra Large**: Hero sections and major elements

## 🎭 Transitions

### Transition Timing

```css
--transition-fast: 150ms ease-in-out --transition-normal: 250ms ease-in-out
  --transition-slow: 350ms ease-in-out --transition-smooth: all 0.3s
  cubic-bezier(0.4, 0, 0.2, 1);
```

### Usage Guidelines

- **Fast**: Hover states, focus changes
- **Normal**: Color changes, opacity
- **Slow**: Layout changes, transforms
- **Smooth**: Complex animations

## 🎨 Component Styling

### Button Variants

```tsx
// Primary Button
<Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 transform">

// Secondary Button
<Button variant="outline" className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:border-border">

// Destructive Button
<Button variant="destructive" className="bg-destructive hover:bg-destructive/90 shadow-md hover:shadow-lg">
```

### Card Styling

```tsx
<Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-border shadow-sm hover:shadow-md transition-all duration-200">
```

### Input Styling

```tsx
<Input className="border-border/50 focus:border-primary bg-background/50 focus:bg-background transition-colors duration-200" />
```

## 🌓 Theme Switching

### Theme Toggle Component

```tsx
import { ModeToggle } from "@/components/mode-toggle";

// Use in navbar or settings
<ModeToggle />;
```

### Theme-Aware Styling

```tsx
// Use CSS variables for theme-aware colors
className = "bg-background text-foreground border-border";

// Use utility classes for theme switching
className = "dark:bg-background dark:text-foreground";
```

## 🚀 Utility Classes

### Glass Effect

```css
.glass {
  background: hsl(var(--background) / 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border) / 0.2);
}
```

### Text Gradients

```css
.text-gradient {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--chart-2)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Hover Effects

```css
.hover-lift {
  transition: transform 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

## 📱 Responsive Design

### Breakpoints

```css
--breakpoint-xs: 475px --breakpoint-sm: 640px --breakpoint-md: 768px
  --breakpoint-lg: 1024px --breakpoint-xl: 1280px --breakpoint-2xl: 1536px;
```

### Mobile-First Approach

```tsx
// Start with mobile styles, then enhance for larger screens
className = "text-lg sm:text-xl md:text-2xl lg:text-3xl";

// Responsive spacing
className = "p-4 sm:p-6 md:p-8 lg:p-12";

// Responsive grid
className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
```

## 🎯 Best Practices

### 1. Use Design Tokens

✅ **Good**

```tsx
className = "bg-primary text-primary-foreground";
```

❌ **Avoid**

```tsx
className = "bg-blue-500 text-white";
```

### 2. Consistent Spacing

✅ **Good**

```tsx
className = "space-y-4 p-6";
```

❌ **Avoid**

```tsx
className = "space-y-3 p-5";
```

### 3. Semantic Colors

✅ **Good**

```tsx
className = "text-destructive bg-destructive/10";
```

❌ **Avoid**

```tsx
className = "text-red-500 bg-red-100";
```

### 4. Smooth Transitions

✅ **Good**

```tsx
className = "transition-all duration-200 hover:scale-105";
```

❌ **Avoid**

```tsx
className = "hover:scale-105";
```

## 🔧 Development Workflow

### 1. Import Design Tokens

```tsx
import { colors, spacing, typography } from "@/lib/design-tokens";
```

### 2. Use Utility Functions

```tsx
import { getColor, getSpacing } from "@/lib/design-tokens";

const primaryColor = getColor("light", "primary");
const cardPadding = getSpacing(6);
```

### 3. CSS Custom Properties

```css
.my-component {
  background-color: var(--primary);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
}
```

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OKLCH Color Space](https://oklab.oklch.com/)

## 🤝 Contributing

When adding new components or styles:

1. Use existing design tokens when possible
2. Follow the established patterns
3. Ensure accessibility compliance
4. Test across light and dark themes
5. Update this documentation

---

_This design system is living documentation. Please keep it updated as the system evolves._
