# ClassMind AI

An academic readiness and guidance platform designed for first-year engineering students to help them transition into college life smoothly.

## Problem
First-year engineering students enter a completely new academic environment. Colleges often lack a simple, early way to identify where students need support (e.g., time management, academic foundation, learning habits) before they fall behind.

## Solution
ClassMind AI provides an intuitive assessment platform that evaluates a student's readiness across multiple dimensions. It uses AI to automatically generate personalized assessments for teachers and, upon completion, provides actionable, customized guidance to students.

## Features
* **Student Readiness Assessment**: Evaluate students across multiple categories (Academic Foundation, Time Management, etc.).
* **AI Assessment Generation**: Teachers can generate complete assessments with a single click using Gemini AI.
* **Teacher Dashboard**: View class-wide analytics and identify common areas requiring academic support.
* **Student Dashboard**: Students can track their engineering readiness and view upcoming assignments.
* **Personalized Guidance**: AI-powered recommendations with actionable steps for students to improve their focus areas.
* **Progress Tracking**: Track readiness scores over time across multiple assessments.
* **Facial Analysis Prototype**: A demonstration of a future interaction-analysis module (camera experience only).

## Tech Stack
* **Frontend**: React, Vite, JavaScript, Tailwind CSS, React Router
* **Backend**: Node.js, Express.js, JavaScript
* **Database & Auth**: Firebase Firestore, Firebase Authentication
* **AI**: Google Gemini API

## Architecture
- **Frontend**: A React SPA that communicates with the backend via REST API. Uses Tailwind for a modern, responsive UI.
- **Backend**: An Express API that handles business logic, communicates with Firebase for data storage and auth verification, and interfaces with the Gemini API for content generation.

## Setup

### Prerequisites
- Node.js (v16+)
- Firebase Project
- Google Gemini API Key

### Installation

1. Clone the repository.
2. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Setup environment variables:
   - In `client/`, copy `.env.example` to `.env` and fill in your Firebase config.
   - In `server/`, copy `.env.example` to `.env` and fill in your Firebase Admin credentials and Gemini API Key.

### Running Locally

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
2. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

## Environment Variables

### Client (`client/.env`)
- `VITE_FIREBASE_API_KEY`: Firebase API Key
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase Auth Domain
- `VITE_FIREBASE_PROJECT_ID`: Firebase Project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase Storage Bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase Messaging Sender ID
- `VITE_FIREBASE_APP_ID`: Firebase App ID
- `VITE_API_URL`: Backend API URL (default: `http://localhost:5000/api`)

### Server (`server/.env`)
- `PORT`: Server port (default: `5000`)
- `GEMINI_API_KEY`: Google Gemini API Key
- `FIREBASE_PROJECT_ID`: Firebase Admin Project ID
- `FIREBASE_CLIENT_EMAIL`: Firebase Admin Client Email
- `FIREBASE_PRIVATE_KEY`: Firebase Admin Private Key

## Deployment
- **Frontend**: Can be deployed to Vercel or Netlify.
- **Backend**: Can be deployed to Render, Heroku, or any Node.js hosting provider.

Ensure environment variables are configured correctly in the deployment environments.

---

*Note: ClassMind AI is a tool for academic guidance. It is not a psychological diagnostic tool and does not attempt to diagnose mental health conditions or determine inherent intelligence.*
