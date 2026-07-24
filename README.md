# 📝 Multi-Step Form with Progress Indicator

A front-end multi-step form built with **HTML, CSS, and JavaScript**. Users move through several form steps with live validation, a dynamically updating progress bar, and a final summary before submitting — plus autosave so progress isn't lost on refresh.

## Live Demo

🔗 [multistep-form-qryk.vercel.app](https://multistep-form-qryk.vercel.app)


## Features

- 📋 Multi-step form: Personal Info → Contact Details → Account Setup → Review & Submit
- 📊 Progress bar and step indicators update dynamically as the user moves forward
- ✅ Required-field validation before advancing to the next step (including email, phone, and password rules)
- 👀 Final summary screen showing all entered data before submission
- 🔄 Smooth CSS transitions between steps
- 💾 Bonus: Autosave — form progress is saved to `localStorage` on every keystroke and restored automatically if the page is refreshed

## Concepts Practiced

- JavaScript form validation (required fields, email/phone format, password rules)
- CSS animations for step transitions
- Next/Previous button logic and step-based navigation
- Reading and writing data with `localStorage` for autosave

## Project Structure

```
multistep-form/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Setup Instructions

No API keys or dependencies required — fully static, front-end-only project.

1. Clone or download this repository
2. Open `index.html` in your browser, or use **VS Code Live Server** for the best experience
3. Fill out each step — try leaving a field empty to see validation in action, then complete all steps to view the summary

## Notes

- Refresh the page mid-form to confirm autosave restores your progress
- The final "Submit" button is a demo action only — no data is actually sent anywhere

## Tech Used

- HTML5
- CSS3 (Flexbox, transitions, keyframe animations)
- Vanilla JavaScript (ES6+, FormData API, localStorage)
