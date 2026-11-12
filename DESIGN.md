---
name: Artisanal Thai Roast
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f1eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#4f453f'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0e9'
  outline: '#81746e'
  outline-variant: '#d3c3bc'
  surface-tint: '#74584a'
  primary: '#3a2519'
  on-primary: '#ffffff'
  primary-container: '#523a2d'
  on-primary-container: '#c6a493'
  inverse-primary: '#e3bfad'
  secondary: '#885122'
  on-secondary: '#ffffff'
  secondary-container: '#ffb77f'
  on-secondary-container: '#7a4617'
  tertiary: '#1f2e1b'
  on-tertiary: '#ffffff'
  tertiary-container: '#344430'
  on-tertiary-container: '#9fb197'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#e3bfad'
  on-primary-fixed: '#2a170c'
  on-primary-fixed-variant: '#5a4134'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#ffb77f'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6b3a0c'
  tertiary-fixed: '#d5e8cc'
  tertiary-fixed-dim: '#b9ccb1'
  on-tertiary-fixed: '#111f0e'
  on-tertiary-fixed-variant: '#3b4b36'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
  ink: '#302820'
  muted: '#82786c'
  coffee-dark: '#38271f'
  paper: '#fffefa'
  line: '#e9e3d9'
  sage-light: '#edf1e9'
  danger: '#a84c3d'
  danger-surface: '#fbefeb'
  toasted-gold: '#d9a76f'
typography:
  display-hero:
    fontFamily: IBM Plex Sans
    fontSize: 44px
    fontWeight: '700'
    lineHeight: '1.16'
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.025em
  headline-sm:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1.35'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.7'
    letterSpacing: '0'
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.55'
    letterSpacing: '0'
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-lg:
    fontFamily: IBM Plex Sans
    fontSize: 13px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: '0'
  label-md:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.04em
  label-micro:
    fontFamily: IBM Plex Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.375rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.375rem
  space-xl: 1.75rem
  space-2xl: 2.5rem
---

## Brand & Style

This design system embodies an artisanal, sensory-driven Thai specialty coffee house experience. Blending the tactile warmth of handcrafted espresso culture with the operational clarity of a modern ordering application, the aesthetic sits comfortably at the intersection of organic warmth and utilitarian minimalism.

The visual tone is inviting, aromatic, and reassuring. It avoids clinical corporate neutrals and cold stark whites, leaning instead into steaming crema, raw textured paper, and deep roasted beans. Typography balances international geometric sans-serif clarity with native Thai typographic nuance, tuned specifically for quick comprehension during morning cafe rushes and afternoon coffee runs.

Interfaces feel physical yet frictionless: interactive surfaces mimic dense cardstock, buttons suggest smooth tactile pressure, and navigation pill chips evoke traditional wooden cafe badges.

## Colors

The palette is rooted entirely in chromatic coffee, steamed milk, and botanical accents. Neutral backgrounds do not use standard monochrome grays; canvas surfaces lean into warm steamed-cream (`--cream`: `#f6f3ec`), while cards and inputs use dense milk-foam paper (`--paper`: `#fffefa`).

### Palette Architecture
- **Primary (`#523a2d`)**: Deep roasted espresso bean. Deployed across high-impact call-to-actions, brand identity markers, category highlights, and active states.
- **Secondary (`#c78652`)**: Warm caramelized milk and crema. Used for focal kickers, subtle indicator badges, active interactive borders, and warm focus rings.
- **Tertiary (`#62735c`)**: Organic dried sage. Delivers fresh herbal balance for tea menus, non-intrusive status confirmations, and environmental badges.
- **Neutral (`#f6f3ec`)**: Warm oat-cream background delivering low ocular fatigue and setting an artisanal backdrop.
- **Ink (`#302820`)**: Deep espresso ground used for primary typographic hierarchy and crisp contrast against cream surfaces.

### Tinted Atmospheric Accents
Never apply pure `rgba(0,0,0,x)` for drop shadows or component borders. Shadows and divider lines must draw from the coffee base (e.g. `rgba(57, 42, 29, 0.08)` and `#e9e3d9`) to preserve visual warmth throughout all UI states.

## Typography

The design system utilizes **IBM Plex Sans** (extended to IBM Plex Sans Thai for bilingual Thai & Latin script rendering). It provides modern industrial structure with humanist touches that harmonize with artisanal culinary products.

### Editorial Hierarchies
- **Display & Headings**: Tightly tracked (`-0.04em` down to `-0.02em`) with strong visual gravity to command space on cafe hero sections and checkout totals.
- **Thai Legibility Safeguards**: When rendering Thai script characters with ascending and descending diacritics, preserve line height multiples between `1.5` and `1.7` for body copy to prevent glyph collision.
- **Labels & Micro-Kickers**: Uppercase latin tracking is reserved exclusively for category kickers, price subscripts, and status identifiers (`0.08em` to `0.14em`), contrasting against organic rounded UI cards.

## Layout & Spacing

Layout structures conform to an asymmetric fluid workspace system designed to optimize single-handed ordering workflows on mobile while presenting a dual-surface order register on desktop viewports.

### Breakpoint Matrix
- **Desktop (`> 900px`)**: Two-column layout with a 1.35fr catalog section and a sticky 0.75fr ticket panel. Margin spans up to a maximum container constraint of 1160px.
- **Tablet (`681px – 900px`)**: Balanced two-column grid (1.1fr catalog, 0.9fr order sheet) with reduced canvas gutters (`space-lg`).
- **Mobile (`<= 680px`)**: Single-column vertical stream. The order summary detaches from the desktop sticky position to form an interactive bottom-docked panel or step-based flow.

### Touch Ergonomics
Touch targets must satisfy a minimum height of 44px (47px standard on primary CTAs). Form elements, category pills, and quantity triggers scale up their padding on smaller displays to facilitate thumb-driven selection without mis-taps.

## Elevation & Depth

Visual depth is achieved through **ambient warm shadows** paired with soft, low-contrast bounding borders rather than generic harsh shadows.

### Elevation Tiers
- **Tier 0 (Canvas Base)**: Flat `--cream` (`#f6f3ec`) background with faint radial ambient glows tinted with raw umber and warm cream.
- **Tier 1 (Surface Panels & Item Cards)**: Solid `--paper` (`#fffefa`) resting with a subtle border outline (`1px solid #e9e3d9`) and ambient shadow: `0 10px 24px rgba(57, 42, 29, 0.06)`.
- **Tier 2 (Hero Highlights & Sticky Cart)**: Elevated ordering summary with deep warm suspension: `0 18px 48px rgba(57, 42, 29, 0.08)`.
- **Tier 3 (Floating Badges & Modals)**: Floating stickers, tooltips, and notification toasts: `0 12px 25px rgba(48, 35, 26, 0.14)`.

### Tactile Focus
Hovering on interactive cards triggers an elevation lift of `translateY(-2px)` paired with a soft diffuse shadow increase. Focused interactive elements gain a 3px halo tinted in warm caramel: `0 0 0 3px rgba(199, 134, 82, 0.35)`.

## Shapes

The interface balances soft modern curves with artisanal charm. Large containment cards utilize generous rounded geometry, while controls and badges taper into tactile pills.

### Application Rules
- **Pill Shape (`999px`)**: Reserved for filter buttons, counter capsules, sold-out indicators, and floating sale badges.
- **Container Geometry (`16px – 22px`)**: Main ordering surfaces, hero banners, and checkout panels use structural rounding that drops slightly on mobile devices (`16px`) for edge-to-edge neatness.
- **Interactive Units (`10px – 12px`)**: Input textfields, pickers, and checkout CTA buttons feature balanced curvature that feels sturdy and easy to tap.

## Components

### Buttons
- **Primary CTA**: Styled in solid `--coffee` (`#523a2d`) with ivory typography (`#fffaf3`), minimum 47px height, and `11px` radius. Hover state transitions to `--coffee-dark` (`#38271f`) with a slight upward translation (`translateY(-1px)`).
- **Secondary / Filter Pills**: Pill-shaped (`999px`) buttons with `1px solid #e9e3d9`, off-white surface, and `--muted` label. Active state switches background to `--coffee` with crisp white text.

### Cards & Menu Items
- **Beverage Item Card**: Composed of two sections—a warm pictorial header block (`#efe4d6` or `#e9efe3`) followed by a clean `--paper` label container (`12px` padding). Cards include a `1px` tinted perimeter line and transition smoothly on hover with a `translateY(-2px)` lift.
- **Order Ticket Card**: Compact information card framed with `1px solid #f0ece5` and rounded at `13px`. Divided with a soft dashed or low-contrast hairline separator for receipt-like tactility.

### Form Inputs & Controls
- **Text Inputs & Dropdowns**: Height of 43px, rendered with `--paper` background, `10px` radius, and `1px solid #e4ddd2`. Focused state transitions the border to warm umber (`#927257`) with a caramel halo ring.
- **Checkboxes & Radios**: Rendered with custom warm espresso checks and smooth circular/squircle tracks, replacing default platform accents.

### Chips & Badges
- **Status Badges**: Pill-shaped (`999px`) indicator chips. Sold-out indicators use soft crimson (`#fbefeb` background with `#a84c3d` text), while seasonal origin indicators use soft sage (`#edf1e9` with `#4f654a` text).
- **Count Capsule**: Compact micro-pills with oatmeal surface (`#f4eee5`) and roasted-brown count numeral (`#6b5744`).

### Order Progress & Floating Cart (Mobile)
- A persistent bottom drawer utilizing Tier 2 elevation that allows Thai customers to review iced sweetness levels, milk alternatives (oat/soy), and total Baht pricing at a glance.
