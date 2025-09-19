# Images Directory

This directory contains all static images used in the Threddle Dashboard application.

## Required Images

### Logos
- **threddle-logo.png** - Main Threddle logo (used in 9 components)
  - Original Figma asset: `ea7dfec287d9dd01758e214fc2a9f9df4443dd6a.png`
  - Recommended size: 200x50px (or appropriate aspect ratio)
  - Used in: login, onboarding flow, and various dashboard components

- **shopify-logo.png** - Shopify integration logo
  - Original Figma asset: `1842e175aa0375f3eb45e14f4fd68edc4671006c.png`
  - Recommended size: 100x100px
  - Used in: onboarding welcome screen

### Backgrounds
- **login-background.png** - Login page background image
  - Original Figma asset: `19a8ee6cdf7b23a7d11a537d2df25e3677248527.png`
  - Recommended size: 1920x1080px (or larger for HD displays)
  - Used in: login/registration page

### Maps
- **world-map.png** - Interactive world map visualization
  - Original Figma asset: `f7ecef0642349a38a71e545f0d4359b0f6e5ccce.png`
  - Recommended size: 800x400px
  - Used in: interactive world map component

### Examples
- **dashboard-example.png** - Example dashboard visualization
  - Original Figma asset: `4203aa80fbad88d5db074457f0596c24e5fca337.png`
  - Recommended size: 600x400px
  - Used in: dashboard overview component

## Directory Structure
```
public/images/
├── logos/
│   ├── threddle-logo.png
│   └── shopify-logo.png
├── backgrounds/
│   └── login-background.png
├── maps/
│   └── world-map.png
└── examples/
    └── dashboard-example.png
```

## Usage in Components
After adding the actual images, update the import statements in components from:
```javascript
const logoImage = "figma:asset/ea7dfec287d9dd01758e214fc2a9f9df4443dd6a.png";
```

To:
```javascript
const logoImage = "/images/logos/threddle-logo.png";
```

## Image Optimization
- Use PNG format for logos (supports transparency)
- Use JPG format for photographs/backgrounds (smaller file size)
- Consider WebP format for better compression (with PNG/JPG fallbacks)
- Optimize images before adding to reduce bundle size