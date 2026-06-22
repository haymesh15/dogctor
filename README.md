# 🐾 Dogctor

**Live app:** [dogctor-h539.vercel.app](https://dogctor-h539.vercel.app)

Smart health tracking for your dog, with an AI veterinary assistant.

---

## Overview

Dogctor is a web application that helps dog owners track their dog's daily health habits — eating, drinking, walking, bathroom, and mood — and turns that data into clear weekly insights. It also includes **Dr. Dogctor**, an AI assistant trained on veterinary health, behavior, training, and nutrition, that answers questions and can analyze photos to give a first impression and recommend when to see a vet.

## The Problem It Solves

Dog owners often notice that "something is off" with their dog, but have no structured way to track it. Changes in appetite, energy, or mood happen gradually and are easy to miss day to day. When they finally visit a vet, they struggle to describe what changed and when. Dogctor makes daily logging quick and visual, surfaces patterns over time, and gives instant AI guidance on whether something is worth worrying about — while always pointing toward a real vet for actual medical issues.

## Target Audience

The primary user is a **working dog owner in their late 20s to 40s** who cares deeply about their dog but has a busy schedule, and wants a fast, low-effort way to keep an eye on their dog's wellbeing and a trustworthy first opinion before deciding whether a vet visit is needed. A secondary user is the **busy parent** managing a family dog, who wants a simple way to know the dog was fed, walked, and is doing okay.

## Competitors & Differentiation

| Solution | What it does | How Dogctor is different |
| --- | --- | --- |
| **Whistle / Fi Collar** | Hardware GPS + activity collars | Dogctor needs no hardware — free to start, works from any phone |
| **Dogo** | Dog training app | Dogctor focuses on health tracking + AI guidance, not training |
| **PetDesk** | Vet appointment booking | Dogctor is owner-first daily tracking, not a clinic tool |
| **Notes app / WhatsApp / memory** | Tracking things manually | Dogctor structures the data, shows trends, and adds AI insight |

Dogctor's key differentiator is combining **simple daily logging**, **visual weekly insights**, and a **genuinely knowledgeable AI assistant** (including photo analysis) in one free, no-hardware web app — with responsible boundaries that always defer to a real vet for medical concerns.

## Main User Flow

1. Sign up / log in (and accept the Terms of Use)
2. Create a dog profile (name, breed, age, weight, photo)
3. Log daily habits and mood
4. View weekly insights — a daily activity chart and tappable days with AI feedback
5. Ask Dr. Dogctor questions or share a photo, anytime

## Database Model (ERD)

The backend runs on Supabase with four main tables:

- **profiles** — user profile data
- **dogs** — each dog belongs to a user (1:N)
- **daily_logs** — each daily log belongs to a dog (1:N), unique per dog per date
- **ai_summaries** — AI-generated summaries linked to a dog (1:N)

![ERD Diagram](./erd.png)

## External Services & Integrations

| Service | Type | What it's used for |
| --- | --- | --- |
| **Supabase Auth** | Authentication | Email/password user sign-up and login |
| **Supabase Database (Postgres)** | Database | Stores users, dogs, logs, and summaries, with Row-Level Security |
| **Supabase Storage** | File storage | Stores uploaded dog photos |
| **Vercel** | Hosting | Hosts the live React frontend, auto-deploys from GitHub |
| **Vercel Serverless Functions** | Server logic | Securely calls the AI API and hides the secret API key from the browser |
| **Anthropic Claude API** | AI / API | Powers Dr. Dogctor — health Q&A, photo analysis, and daily insight feedback |

## Tech Stack

- **Frontend:** Vite + React + React Router
- **Backend:** Supabase (Postgres, Auth, Storage)
- **Serverless:** Vercel Functions
- **AI:** Anthropic Claude API
- **Hosting:** Vercel

## Running Locally

```bash
npm install
npm run dev
```

Create a `.env` file with:
