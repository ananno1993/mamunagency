# Assets Folder Structure

This folder contains all images used in the MatchVibe dating app website.

## Directory Structure

```
assets/
└── images/
    ├── slides/          # Hero section slider images
    ├── features/        # Feature section images
    ├── testimonials/    # Testimonial avatars
    ├── logo/            # Logo files
    └── README.md        # This file
```

## Image Specifications

### Slider Images (slides/)
- **Recommended Size:** 1920x1080 pixels (16:9 aspect ratio)
- **Format:** JPG or PNG
- **Files needed:**
  - `slide1.jpg` - Video call connection scene
  - `slide2.jpg` - Coffee date/real-life meeting
  - `slide3.jpg` - Technology/AI/Safety themed

### Feature Images (features/)
- **Recommended Size:** 800x600 pixels
- **Format:** JPG or PNG
- **Files needed:**
  - `live-meet.jpg` - First date planning image

### Logo (logo/)
- **Format:** PNG (transparent background) or SVG
- **Files needed:**
  - `logo.png` or `logo.svg`

### Testimonial Avatars (testimonials/)
- **Recommended Size:** 200x200 pixels (square)
- **Format:** JPG or PNG
- **Files needed:**
  - `avatar1.jpg` - Aisha K.
  - `avatar2.jpg` - Omar B.
  - `avatar3.jpg` - Sarah L.

## Usage

Replace the placeholder Unsplash URLs in `index.html` with your local image paths:
- From: `https://images.unsplash.com/...`
- To: `assets/images/slides/slide1.jpg`

## Notes

- Optimize all images before uploading to reduce page load time
- Recommended tools: TinyPNG, ImageOptim, or Squoosh
- Keep image file sizes under 500KB for optimal performance
