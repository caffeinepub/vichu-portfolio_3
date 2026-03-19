# Vichu Portfolio

## Current State
New project -- no existing code.

## Requested Changes (Diff)

### Add
- Full personal portfolio app with public-facing display and hidden admin/settings panel
- Hero section: name, title, profile photo (placeholder, uploadable)
- About section: bio text
- Projects section: cards with title, description, purpose, optional image, optional link
- Skills section: list/tags with optional image per skill
- Certifications section: card/grid layout with image preview, title, year
- Contact section: LinkedIn, email, Instagram, Telegram links
- Hidden admin panel: triggered by pressing "A" key 3 times consecutively
- Admin panel sections: Profile editor, Projects editor, Skills editor, Certifications editor, Contact editor
- All content persisted to backend (ICP canister)
- Image uploads via blob-storage for profile photo, project images, skill images, certificate images
- Dark mode toggle
- Smooth scroll navigation
- Mobile + desktop responsive

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- Profile data: name, title, bio, profileImageId
- Projects: CRUD with title, description, purpose, imageId, link
- Skills: CRUD with name, imageId
- Certifications: CRUD with title, year, imageId
- Contact: LinkedIn, email, Instagram, Telegram
- Blob-storage integration for all image uploads
- Authorization for admin operations

### Frontend
- Public portfolio page with sections: Hero, About, Projects, Skills, Certifications, Contact
- Hidden admin trigger: keypress "A" x3 within 1.5 seconds
- Admin panel as slide-over or separate view with tabs for each section
- Live preview: changes visible immediately in portfolio view behind panel
- Save button per section or global save
- Image upload UI for profile, projects, skills, certs
- Dark mode toggle in nav
- Pre-filled data: Vichu / Mechanical Engineering Student | Product Builder / bio / 3 projects / 4 skills / contact links
- Light theme default, slate blue accent (#4A5568 / #667EEA range)
