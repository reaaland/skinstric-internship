# Skinstric Internship

A responsive AI skincare analysis interface built as part of the Frontend Simplified internship curriculum.

This project recreates the Skinstric experience while implementing a multi-step analysis flow, image capture and upload, API integration, responsive layouts, and interactive demographic results.

## Live Demo

https://skinstric-internship-chi.vercel.app

## Features

- Multi-step user information flow
- Name and location validation
- AI analysis API integration
- Webcam access and selfie capture
- Image upload from a device
- Base64 image processing for API submission
- Interactive demographic analysis results
- User-selectable race, age, and gender predictions
- Local storage for analysis data and confirmed results
- Responsive layouts for desktop and mobile

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Skinstric API
- Browser MediaDevices API
- Canvas API
- FileReader API
- Local Storage
- Vercel

## Project Flow

1. User starts the Skinstric analysis
2. User enters their name and location
3. The information is submitted to the Skinstric API
4. User captures a selfie or uploads an image
5. The image is converted and sent for AI analysis
6. Demographic predictions are displayed with confidence scores
7. User can review, adjust, and confirm the results

## Getting Started

### Requirements

- Node.js 24
- npm

### Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Project Routes

- `/` — Landing page
- `/analysis` — Name and location input
- `/scan` — Camera or image upload flow
- `/preparing` — Processing state
- `/results/demographics` — AI demographic analysis
- `/results` — Confirmed analysis results

## Project Context

This project was completed as part of the Frontend Simplified internship curriculum.

The core Skinstric assignment structure and requirements have been preserved. This repository documents my implementation of the assigned experience, including responsive layouts, API integration, image capture and upload, client-side state handling, and interactive results.

## Author

Rebecca Aaland

Frontend Developer

Portfolio: https://rebeccaiaaland.com