# architecture.md

# Architecture

## Overview

AOCUME is a Full Stack application built with Next.js using the App Router architecture.

The application consists of three major layers:

- Public Website
- Administrative Dashboard
- Backend API

All business logic should remain on the server whenever possible.

---

# Technology Stack

Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- Shadcn UI

Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL

Validation

- Zod

Forms

- React Hook Form

State

- React Query (Server State)
- React Context (UI State only)

Storage

- Cloudinary

Authentication

- JWT

Deployment

- Docker
- VPS

---

# High Level Architecture

```text
Browser

↓

Next.js App Router

↓

Server Components

↓

Server Actions / Route Handlers

↓

Services

↓

Repositories (Prisma)

↓

PostgreSQL
```

---

# Folder Structure

```text
src/

app/

components/

features/

lib/

services/

repositories/

validators/

hooks/

types/

constants/

utils/

prisma/

public/
```

---

# Layers

## UI Layer

Responsible for

- Pages
- Components
- Forms
- Layouts

Contains no business logic.

---

## Service Layer

Responsible for

- Business rules
- Validation
- Data transformation

---

## Repository Layer

Responsible for

- Database communication

Only Prisma interacts with the database.

---

# Components

Components should be:

Reusable

Independent

Composable

Stateless whenever possible.

---

# Server Components

Default choice.

Use Client Components only when necessary.

Examples

- Forms
- Carousels
- Modals
- Interactive filters

---

# API

REST architecture.

JSON responses.

Standard HTTP status codes.

---

# Error Handling

All errors should return

```json
{
  "success": false,
  "message": "..."
}
```

Successful responses

```json
{
  "success": true,
  "data": {}
}
```

---

# Validation

Every request must pass through Zod validation.

No raw request data reaches the database.

---

# File Upload

Images

↓

Cloudinary

↓

Store URL in database

---

# Authentication Flow

Login

↓

Validate credentials

↓

Generate JWT

↓

HTTP-only Cookie

↓

Protected routes

---

# Authorization

Roles

Admin

Only administrators access the dashboard.

---

# Performance

Use

- Server Components
- Image optimization
- Lazy loading
- Pagination
- ISR where appropriate

Avoid unnecessary client-side rendering.

---

# Security

Validate every input.

Never expose secrets.

Sanitize uploads.

Use environment variables.

---

# Naming Conventions

Components

PascalCase

Variables

camelCase

Constants

UPPER_SNAKE_CASE

Database

snake_case

Routes

kebab-case

---

# Project Principles

- Keep components small.
- Avoid duplicated logic.
- Prefer composition.
- Prefer server-side rendering.
- Business logic belongs in Services.
- Database logic belongs in Repositories.

---

# Scalability

The architecture should allow future additions such as:

- Mobile App
- LMS
- Online Payments
- Client Portal

without major refactoring.

---

# Architecture Philosophy

Simple architecture is preferred over clever architecture.

The project should be easy to understand for any developer joining the team.