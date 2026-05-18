# StudyNest — Presentation Guide

## Overview
**Time:** ~10–15 minutes  
**Format:** Live demo + slides  
**Submit:** GitHub repo link + live website link

---

## Slide Structure

### Slide 1 — Introduction
- Project name: **StudyNest**
- One-liner: *"A dynamic study platform that helps university students manage courses, notes, and quizzes in one place."*
- Show the live site briefly

---

### Slide 2 — Problem Statement
> Students struggle to manage study materials across multiple subjects — notes are scattered, there is no easy way to test their own knowledge, and progress is hard to track.

**StudyNest solves this by providing:**
- A centralised place for courses, notes, and quizzes
- Progress tracking per course
- Instant quiz feedback with scores saved to a database
- A personal dashboard showing study activity

---

### Slide 3 — Target Users
- University / college students
- Students studying Computer Science, IT, Cybersecurity, Data Science, or similar fields
- Students who want to self-study and track their own progress

---

### Slide 4 — Framework & Technologies Used

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MySQL (hosted on Railway) |
| Authentication | JWT (JSON Web Tokens), bcryptjs |
| Social Login | Google OAuth 2.0, GitHub OAuth |
| Hosting | Railway (backend + database) |
| Version Control | GitHub |

---

### Slide 5 — Database Explanation

We use **MySQL** with 7 tables:

| Table | What it stores |
|---|---|
| `users` | Account info, avatar, university, OAuth provider |
| `courses` | Course catalogue — title, subject, level, modules |
| `enrollments` | Which user enrolled in which course + progress % |
| `notes` | User notes — title, content, subject, tags |
| `quizzes` | Quiz definitions — title, difficulty, duration |
| `quiz_questions` | Questions with 4 options, correct answer, explanation |
| `quiz_attempts` | User quiz results — score, time taken, date |

**Key relationships:**
- A user can enrol in many courses (enrollments table links them)
- A user can have many notes (notes belong to one user)
- A user can attempt the same quiz multiple times (quiz_attempts tracks all)

---

### Slide 6 — Architecture Diagram

```
 Browser (HTML / CSS / JS)
          │
          │  REST API calls  (/api/*)
          ▼
 Express.js Server  (Node.js on Railway)
          │
          ├── /api/auth        Register, Login, Google OAuth, GitHub OAuth
          ├── /api/users       View & edit profile
          ├── /api/courses     Browse, enrol, track progress
          ├── /api/notes       Create, read, update, delete notes
          ├── /api/quizzes     Take quizzes, submit answers, save scores
          └── /api/dashboard   Live stats & activity feed
          │
          ▼
 MySQL Database  (Railway managed)
```

---

### Slide 7 — Features Checklist ✅

Show this to demonstrate all rubric requirements are met:

| Requirement | Implementation |
|---|---|
| ✅ Login / Registration | Email + password, Google OAuth, GitHub OAuth |
| ✅ Database integration | MySQL — 7 tables, real data, no hardcoding |
| ✅ CRUD operations | Notes — full create, read, update, delete |
| ✅ Search functionality | Course search by name, subject, level |
| ✅ Dashboard | Live stats pulled from database |
| ✅ Dynamic content | All pages fetch real data from the API |
| ✅ Backend functionality | Node.js + Express REST API |
| ✅ Hosting & deployment | Live on Railway with public URL |
| ✅ GitHub | Full source code + README |

---

### Slide 8 — Live Demo (most important!)

Walk through in this order:

1. **Open the live site** — `https://web-production-1b3cf.up.railway.app`
2. **Register a new account** — show the 3-step form
3. **Dashboard** — point out the live stats (they start at 0 for a new user)
4. **Courses page** — search for a course, enrol in it, show progress bar updating
5. **Notes page** — create a new note, type some content, show auto-save
6. **Quiz page** — start a quiz, answer questions, show the timer, submit and show results
7. **Profile page** — show stats updated, quiz history, achievements unlocked
8. **Back to dashboard** — show stats have now changed (course enrolled, note created, quiz done)

> 💡 Tip: Do the demo on a fresh account so all stats go from 0 to real numbers live — it's more impressive.

---

## Who Presents What (suggested split)

| Section | Suggested person |
|---|---|
| Intro + Problem Statement | Person 1 |
| Tech stack + Database explanation | Person 2 |
| Architecture diagram | Person 3 |
| Live demo | Person 1 (or whoever knows the site best) |
| Q&A | Everyone |

---

## Things the Marker Will Check

- [ ] Is the site actually live and accessible?
- [ ] Does registration and login work?
- [ ] Is real data being stored in a database (not hardcoded)?
- [ ] Does CRUD work? (create a note, delete it)
- [ ] Does search work?
- [ ] Is the GitHub repo complete with README?

---

## GitHub Submission Checklist

- [ ] Code is pushed to GitHub: `https://github.com/retesbiz/studyplatform`
- [ ] README.md includes live URL, tech stack, setup instructions
- [ ] Live site is working: `https://web-production-1b3cf.up.railway.app`
- [ ] No `.env` file committed (secrets are safe ✅)
