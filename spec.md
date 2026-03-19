# Vichu Portfolio

## Current State
- Full portfolio app with Hero, About, Projects, Skills, Certifications, Contact sections
- AdminPanel accessible only via keyboard shortcut (press A x3) -- no mobile access
- AdminPanel has 5 tabs: Profile, Projects, Skills, Certifications, Contact
- Dark mode toggle in NavBar
- Blob storage for images
- No theme switching or font switching

## Requested Changes (Diff)

### Add
- Hidden corner Settings button (fixed position, small/subtle, bottom-right corner) that opens the admin panel on mobile and desktop
- AppearanceTab inside AdminPanel for theme and font settings:
  - 10+ theme presets (each a named color palette applied to CSS variables)
  - 10+ Google Font options with live preview
  - Selected theme/font persisted to localStorage and applied globally
- "Add New Section" capability in admin panel -- user can create a custom section with a title and body text that appears on the portfolio page
- Image upload supported in each editable section (already exists for Profile/Projects/Skills/Certs -- verify completeness)

### Modify
- AdminPanel: add an Appearance tab (theme + font picker)
- App.tsx: render custom sections from backend/localStorage between existing sections
- index.css: support dynamic font family via CSS variable; add 10+ theme CSS classes or data attributes
- Keep keyboard shortcut (A x3) AND add hidden corner button as second trigger

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/admin/AppearanceTab.tsx`
   - Grid of 12+ theme cards (each shows color swatches + name). On click, applies theme by setting data-theme attribute on `<html>` and saves to localStorage.
   - Grid of 12+ font option buttons. On click, sets CSS variable `--font-body` and saves to localStorage.
   - Themes: Default (slate blue), Midnight (deep navy), Rose (rose pink), Forest (green), Sunset (orange), Ocean (teal), Lavender (purple), Crimson (red), Amber (gold), Monochrome (gray), Coral (warm pink), Emerald (bright green)
   - Fonts: Plus Jakarta Sans, Inter, Poppins, Raleway, Nunito, Lato, Roboto, Merriweather, Playfair Display, Space Grotesk, DM Sans, Outfit
2. Add AppearanceTab to AdminPanel as a 6th tab with Palette icon
3. Create `src/frontend/src/components/admin/CustomSectionsTab.tsx`
   - Add/edit/delete custom sections (title + rich text body)
   - Stored in localStorage as JSON array
   - Add 7th tab to AdminPanel
4. Create `src/frontend/src/components/CustomSections.tsx` -- renders custom sections on main page
5. Add hidden corner Settings button to App.tsx (fixed bottom-right, small gear icon, semi-transparent, opens admin panel)
6. Update App.tsx to render `<CustomSections />` between CertificationsSection and ContactSection
7. Update index.css to add all theme data-attribute CSS variable overrides and `--font-body` support
8. Update body font-family to use `var(--font-body, 'Plus Jakarta Sans')`
9. On app load, read saved theme + font from localStorage and apply
