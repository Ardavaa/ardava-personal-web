# Personal Website MVP

A modern, responsive personal portfolio website featuring a clean design with light/dark theme toggle.

## Features

- **Profile Section**: Professional introduction with circular profile photo
- **Downloadable Resume**: One-click PDF download
- **Theme Toggle**: Switch between light and dark modes
- **Project Showcase**: Grid layout with project cards displaying images, descriptions, and links
- **Contact Section**: Professional contact information and social links
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimalist design with smooth animations

## Setup Instructions

1. **Add Your Content**:
   - Replace placeholder text in `index.html` with your information
   - Add your profile photo as `assets/profile-photo.jpg`
   - Add project images as `assets/project1.jpg`, `assets/project2.jpg`, etc.
   - Add your resume as `assets/resume.pdf`

2. **Customize**:
   - Update the page title and meta description
   - Modify project information and links
   - Update contact information and social media links
   - Adjust colors in the CSS custom properties if desired

3. **Deploy**:
   - Upload all files to your web hosting service
   - Ensure the `assets` folder contains all your images and resume

## File Structure

```
personal-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with theme support
├── script.js           # JavaScript functionality
├── assets/            # Assets folder
│   ├── profile-photo.jpg
│   ├── resume.pdf
│   ├── project1.jpg
│   ├── project2.jpg
│   └── project3.jpg
└── README.md          # This file
```

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- Progressive enhancement for older browsers

## Customization

### Theme Colors
Edit the CSS custom properties in `styles.css` to change the color scheme:

```css
:root {
  --accent-primary: #3b82f6;  /* Primary accent color */
  --accent-hover: #2563eb;    /* Hover state color */
  /* ... other colors */
}
```

### Adding Projects
To add more projects, duplicate a project card in the HTML and update the content.

### Contact Form
The JavaScript includes a basic contact form handler. You can integrate it with services like Formspree, Netlify Forms, or your own backend.

## Performance Features

- Optimized images and assets
- Smooth scrolling and transitions
- Lazy loading animations
- Minimal external dependencies
- Clean, semantic HTML

## Accessibility

- Semantic HTML structure
- Proper alt text for images
- Keyboard navigation support
- Screen reader friendly
- High contrast theme options
