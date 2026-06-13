# 🤖 AI Engineer Portfolio

A fully animated, professional portfolio website for an AI Engineer. Built with pure HTML, CSS, and JavaScript — no frameworks required, just cutting-edge web animations and a dark futuristic design.

## ✅ Completed Features

### Sections
- **Hero** — Animated typing effect, particles background, neural network canvas, floating tech icons orbit, profile photo with rotating glow rings, floating stat/code cards, counter animation
- **About Me** — Profile image with decorative background, experience badge, skills tags, downloadable CV button
- **What I Do** — 6 service cards with tilt effect, icon animations, glassmorphism hover states
- **Skills** — Filterable skill cards by category (AI/ML, Languages, Cloud, Tools), animated progress bars, tech icons
- **Featured Projects** — Filterable project grid with hover effects and GitHub/demo links
- **Education & Experience** — Dual-column animated timeline for both education and work experience, certifications grid
- **Get In Touch** — Contact info cards, social links, animated contact form with success state

### Visual Effects & Animations
- 🎬 Loading screen with progress bar
- 🖱️ Custom magnetic cursor with hover morphing
- ✨ Particles.js background in hero
- 🕸️ Canvas neural network node animation
- 🔤 Typed.js role cycling text
- 📜 GSAP ScrollTrigger entrance animations
- 🌀 CSS rotating rings around profile photo
- 🃏 3D card tilt (VanillaTilt.js)
- 🔢 Animated number counters
- 📊 Animated skill progress bars
- 🧲 Magnetic button hover effect
- 💡 Scroll-triggered color shift
- 📱 Fully responsive (mobile hamburger menu)

## 🌐 Entry Points

| Path | Description |
|------|-------------|
| `index.html` | Main portfolio page |
| `#home` | Hero section |
| `#about` | About Me |
| `#what-i-do` | Services |
| `#skills` | Technical skills |
| `#projects` | Featured projects |
| `#education` | Education & experience |
| `#contact` | Contact form |

## 📦 Libraries Used (CDN)

| Library | Purpose |
|---------|---------|
| Google Fonts (Space Grotesk, Inter, Fira Code) | Typography |
| Font Awesome 6 | Icons |
| GSAP 3 + ScrollTrigger | Scroll animations |
| Typed.js | Typing effect |
| Particles.js | Hero background particles |
| Three.js | (Available for 3D) |
| Vanilla-Tilt.js | 3D card tilt effect |

## 🔧 Customization Guide

1. **Profile Photo** — Replace the image URL in `index.html` (search for `eXNTAWdV`)
2. **Name** — Change "Muhammad Zaid" across `index.html`
3. **Role titles** — Edit the `strings` array in `js/main.js` → `initTyped()`
4. **Projects** — Add/edit `<article class="project-card">` blocks in `index.html`
5. **Skills** — Add/remove `.skill-card` blocks and adjust `data-width` percentages
6. **Timeline** — Edit `.timeline-item` blocks for education and experience
7. **Colors** — Modify CSS variables in `css/style.css` → `:root`

## 🚀 Next Steps

- [ ] Add real project screenshots/images
- [ ] Connect contact form to a backend (Formspree, EmailJS)
- [ ] Add a blog/articles section
- [ ] Add dark/light theme toggle
- [ ] Add more project case study pages
- [ ] Add PDF resume download functionality
- [ ] SEO meta tags optimization

## 📁 File Structure

```
index.html          ← Main portfolio page
css/
  style.css         ← All styles + animations
js/
  main.js           ← All interactions + animations
README.md
```
