# StudyNest 📚

A fully functional study platform built for students — with courses, notes, quizzes, and progress tracking.

## Live Demo

> Add your Railway URL here after deployment

## Features

- **Authentication** — Register and login with email/password, Google OAuth, GitHub OAuth
- **Dashboard** — Real-time stats: enrolled courses, quizzes completed, notes created, day streak
- **Courses** — Browse 9+ courses, enrol, and track progress per course
- **Notes** — Full CRUD rich-text note editor with subjects, tags, and auto-save
- **Quizzes** — Timed quizzes with instant scoring, answer review, and history
- **Profile** — Edit avatar, bio, university, subject mastery chart, achievements

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | HTML5, CSS3, Vanilla JavaScript   |
| Backend   | Node.js, Express.js               |
| Database  | MySQL (Railway) / PlanetScale     |
| Auth      | JWT, bcryptjs, Google OAuth, GitHub OAuth |
| Hosting   | Railway (backend + DB) / Netlify  |

## Database Schema

- `users` — authentication, profile, OAuth
- `courses` — course catalog (title, subject, level, modules)
- `enrollments` — user ↔ course with progress tracking
- `notes` — rich-text notes with subjects and tags (CRUD)
- `quizzes` — quiz definitions with difficulty and duration
- `quiz_questions` — per-quiz questions with 4 options and explanation
- `quiz_attempts` — user quiz attempts with score and time taken

## Architecture

```
Browser (HTML/CSS/JS)
        │
        │ REST API calls (/api/*)
        ▼
Express.js Server (Node.js)
        │
        ├── /api/auth      → register, login, Google/GitHub OAuth
        ├── /api/users     → profile CRUD
        ├── /api/courses   → course list, enrol, progress
        ├── /api/notes     → full CRUD notes
        ├── /api/quizzes   → quiz list, questions, submit attempt
        └── /api/dashboard → stats, activity feed
        │
        ▼
MySQL Database
```

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure environment
cp .env.example .env
# Edit .env with your MySQL credentials

# 3. Create database and seed data
node db/init.js

# 4. Start the server
npm start
# → http://localhost:3000
```

## Deploy to Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add a **MySQL** plugin in Railway dashboard
4. Set environment variables:
   ```
   DATABASE_URL   = (auto-set by Railway MySQL plugin)
   JWT_SECRET     = your_long_random_secret
   SITE_URL       = https://your-app.up.railway.app
   NODE_ENV       = production
   ```
5. Railway auto-runs `npm start` — no extra config needed

## Environment Variables

| Variable             | Description                          |
|----------------------|--------------------------------------|
| `DATABASE_URL`       | MySQL connection URL (Railway)       |
| `DB_HOST`            | MySQL host (local dev)               |
| `DB_USER`            | MySQL user (local dev)               |
| `DB_PASSWORD`        | MySQL password (local dev)           |
| `DB_NAME`            | Database name (local dev)            |
| `JWT_SECRET`         | Secret key for signing JWT tokens    |
| `JWT_EXPIRES_IN`     | Token expiry e.g. `7d`              |
| `SITE_URL`           | Full URL of deployed site            |
| `GOOGLE_CLIENT_ID`   | Google OAuth app client ID           |
| `GOOGLE_CLIENT_SECRET` | Google OAuth app client secret     |
| `GITHUB_CLIENT_ID`   | GitHub OAuth app client ID           |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret     |

## API Endpoints

| Method | Endpoint                        | Description              | Auth |
|--------|---------------------------------|--------------------------|------|
| POST   | /api/auth/register              | Create account           | No   |
| POST   | /api/auth/login                 | Login                    | No   |
| GET    | /api/auth/google                | Google OAuth             | No   |
| GET    | /api/auth/github                | GitHub OAuth             | No   |
| GET    | /api/users/me                   | Get profile              | Yes  |
| PATCH  | /api/users/me                   | Update profile           | Yes  |
| GET    | /api/courses                    | List courses             | Yes  |
| POST   | /api/courses/:id/enroll         | Enrol in course          | Yes  |
| PATCH  | /api/courses/:id/progress       | Update progress          | Yes  |
| GET    | /api/notes                      | List notes               | Yes  |
| POST   | /api/notes                      | Create note              | Yes  |
| PUT    | /api/notes/:id                  | Update note              | Yes  |
| DELETE | /api/notes/:id                  | Delete note              | Yes  |
| GET    | /api/quizzes                    | List quizzes             | Yes  |
| GET    | /api/quizzes/:id                | Get quiz + questions     | Yes  |
| POST   | /api/quizzes/:id/attempt        | Submit quiz attempt      | Yes  |
| GET    | /api/dashboard/stats            | Dashboard stats          | Yes  |
| GET    | /api/dashboard/activity         | Recent activity          | Yes  |

## Team Members

- [Your Name]

## Problem Statement

Students struggle to manage study materials across multiple subjects — notes are scattered, there's no easy way to test knowledge, and progress is hard to track. StudyNest brings everything into one platform.

## Target Users

University students who want to organise their study, track progress, and test their knowledge in one place.
