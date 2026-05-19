# 📝 Daily Notes App

A simple daily notes application built with **Next.js**, **TypeScript**, and **Prisma**. This project includes full CRUD functionality, database persistence, and a responsive interface with Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite
- **ORM:** Prisma 7 + better-sqlite3 adapter
- **State Management:** Custom Hook (`useNotes`) + Optimistic Update
- **API:** Next.js Route Handlers

## ✨ Key Features

- ✅ Add, edit, delete, and toggle task completion
- ✅ Display completed vs total count
- ✅ Bulk delete all completed tasks
- ✅ Persistent storage via SQLite database through REST API
- ✅ Dynamic routing for editing individual notes (`/notes/[id]`)
- ✅ Smooth transition animations on toggle
- ✅ Optimistic updates for instant user feedback
- ✅ Hydration-safe rendering
