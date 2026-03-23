# IT 112 Web Systems Portfolio

## Student Information
Name: Cedrick Rafael Odoño  
Course & Section: BSIT - 2C  
Semester: 2nd Semester, A.Y. 2025–2026  

---

## Project Description
This repository contains my laboratory activities from Week 1 to Week 7 for IT 112 - Web Systems and Technologies.

The project demonstrates my understanding of:
- HTML5 structure and semantics
- CSS styling and layout
- JavaScript fundamentals
- DOM manipulation and events
- Bootstrap responsive design
- API integration
- Client-side storage

---

## Personalization Theme
Project Brand Name: Zeddrafael  
Color Scheme Used: Deep black backgrounds (`#0a0a0a`) with crimson red accents (`#cf2222`) and off-white text (`#f0ede6`). Supports a light mode toggle (warm beige palette).  
Typography Used:
- Bebas Neue — display headings and large titles
- Syne — body text and UI elements
- DM Mono — monospace labels, tags, and code blocks

Design Goal: A dark, editorial-style portfolio inspired by automotive and JDM culture. Focused on bold typography, smooth scroll animations, and a clean, professional aesthetic that feels personal rather than generic.

---

## Weekly Summary

### Week 1 — HTML Fundamentals
Installed and configured Visual Studio Code and Sublime Text as development environments. Created a test `index.html` file in each editor to verify both setups were working correctly. This was the starting point of the entire web development journey.

### Week 2 — Semantic & Multimedia
Built a personal profile page using semantic HTML elements (`<article>`, `<section>`, `<figure>`, `<nav>`). Embedded a Nissan GT-R image and a farewell video for the R35, making the page both meaningful and media-rich for the first time.

### Week 3 — CSS Basics
Transformed plain HTML into a styled, visually appealing page. Learned the box model, Flexbox layout, and focus/hover state styling. The main deliverable was a fully CSS-styled contact form built from scratch without any libraries.

### Week 4 — JavaScript Basics and DOM Manipulation
Made the page interactive using JavaScript and the DOM API. Built a Task Manager (add, complete, delete tasks) and a validated Contact Form that triggers an animated modal dialog on successful submission. No libraries — pure vanilla JS throughout.

### Week 5 — JavaScript & Bootstrap
Built a personal profile page featuring a fully custom JavaScript image carousel (auto-advance, dot navigation, touch swipe, pause on hover) — no Bootstrap carousel used, just vanilla JS. The page showcases JDM car cards, a multimedia section with image and video, and a personal about section. Theme toggle and scroll reveal animations are also implemented with pure JavaScript and `localStorage` for preference persistence.

### Week 6 — API & Client Storage
Built six standalone lab activities, each exploring a different aspect of browser APIs and client-side storage:
- Local Storage — Save, retrieve, and clear a user's name using `localStorage`; data persists across page refreshes with a live status indicator showing whether data is currently saved
- User Preferences — A settings panel where users select their preferred theme (dark/light) and language (English/Spanish); selections are saved to `localStorage`, applied immediately to the page, and restored automatically on every return visit
- Maps — Google Maps JavaScript API integration rendering an interactive dark-styled map centered on Manila, Philippines (14.5995° N, 120.9842° E) with a custom marker
- Search Location — Location search UI using the Google Maps Geocoding API; the API key is currently non-active so the search correctly handles and displays the error response
- Weather Checker — Live weather data fetched from the OpenWeatherMap REST API; displays city name, temperature (°C), feels-like, humidity, wind speed, weather icon, and conditions description
- GitHub API — Fetches and displays any public GitHub user's profile data — avatar, bio, location, repo count, followers, following, and top 5 most recently updated repositories — using `fetch()` and `Promise.all()` against the GitHub REST API

### Week 7 — Mini Full Stack Starter
Built a User Manager application connecting a front-end form UI to a back-end server. Users enter a name, email, and optional age; the form submits via `fetch()` POST to a Node.js/Express API endpoint, the data is stored and returned, then the user list updates dynamically. The JS includes graceful fallback to local array storage if the backend server is not running. The project is structured for deployment via GitHub and Render.  
Live Render Link: (https://week7-nodejs-labc.onrender.com)

---

## Tools Used
- HTML5
- CSS3 (custom properties, Flexbox, Grid, animations, transitions)
- JavaScript (ES6+, DOM API, Fetch API, Promise.all)
- Google Fonts (Bebas Neue, Syne, DM Mono)
- VS Code + Live Server extension
- Sublime Text
- Git & GitHub
- Google Maps JavaScript API
- GitHub REST API
- OpenWeatherMap API
- localStorage / sessionStorage
- Node.js + Express (Week 7)
- Render (deployment)

---

## Notes
This project was developed as part of the Midterm Laboratory Requirement for IT 112 Web Systems and Technologies at Bicol University Polangui.  
All weekly pages share a unified design system (tokens, nav, footer, scroll reveal) so the portfolio feels cohesive across every activity.
