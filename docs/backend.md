# backend.md

# Backend Specification

## Overview

The backend is responsible for business logic, authentication, validation, and database communication.

Business rules should never be implemented inside React components.

---

# Responsibilities

The backend manages

- Authentication
- Validation
- CRUD operations
- File uploads
- Database persistence
- Security
- Business rules

---

# Layers

Request

↓

Validation

↓

Service

↓

Repository

↓

Database

---

# Authentication

Administrator-only access.

Flow

Login

↓

Validate credentials

↓

Generate JWT

↓

Store HTTP-only cookie

↓

Access protected routes

---

# Validation

Every request is validated using Zod.

Invalid data returns HTTP 400.

---

# Product Service

Responsibilities

- Create products
- Update products
- Delete products
- Retrieve products
- Filter products

Rules

Slug must be unique.

Category must exist.

Image upload required.

---

# Category Service

Responsibilities

- CRUD categories

Rules

Category name must be unique.

Slug generated automatically.

---

# Business Package Service

Responsibilities

- Create packages
- Update packages
- Delete packages
- Retrieve packages
- Manage included items, investment value, profit estimate and action label
- Activate / deactivate and order packages

Rules

Slug must be unique.

Only active packages are returned to the public API.

Investment and profit values are validated as non-negative numbers.

---

# Package Lead Service (n8n)

Responsibilities

- Build the package payload (name, value, ID and, when available, client name and phone)
- Forward it to the n8n webhook that drives the WhatsApp conversation

Rules

No checkout is performed.

The n8n workflow identifies the package, starts a personalized WhatsApp
conversation, presents the investment details, answers questions, collects
extra information and hands over to a human consultant when needed.

In Version 1 the public frontend opens WhatsApp directly with a pre-filled
message; the server-side forwarding to n8n is wired on the integration
milestone.

---

# Testimonial Service

Responsibilities

- CRUD de testemunhos

Rules

Suporta três formatos: TEXT, IMAGE e VIDEO.

IMAGE usa `photo`; VIDEO usa `photo` (poster) + `videoUrl`.

Só os testemunhos em destaque aparecem na página inicial.

---

# Blog Service

Responsibilities

- CRUD de artigos do blogue

Rules

Slug gerado automaticamente a partir do título (único).

`readingMinutes` calculado a partir do conteúdo (Markdown).

Só artigos publicados são devolvidos à API pública.

---

# Upload Service

Responsibilities

- Upload de imagens e vídeos para o Supabase Storage
- Validar tipo e tamanho

Formatos

Imagens: JPG, PNG, WEBP (máx. 5MB). Vídeos: MP4, WEBM, MOV (máx. 50MB).

Devolve o URL público do ficheiro no bucket.

---

# Contact Service

Responsibilities

- Validate form
- Store message

No email sending in Version 1.

---

# Settings Service

Manages

- Contact information
- Hero text
- Social links
- Company information

Only administrators may update settings.

---

# Error Handling

Unexpected errors

HTTP 500

Validation errors

HTTP 400

Unauthorized

HTTP 401

Forbidden

HTTP 403

---

# Logging

Log

- Authentication failures
- Server errors
- Upload failures

Avoid logging sensitive information.

---

# Security

Passwords hashed using bcrypt.

JWT signed with environment secret.

Protected routes require authentication.

Environment variables are never exposed to the client.

Uploads are validated before processing.

---

# Database Access

Only repositories communicate with Prisma.

Services never execute raw SQL.

---

# Transactions

Use Prisma transactions when multiple database operations must succeed together.

---

# Performance

Use pagination for listings.

Avoid unnecessary queries.

Select only required fields.

Optimize image delivery.

---

# Environment Variables

Examples

```text
DATABASE_URL

DIRECT_URL

JWT_SECRET

NEXT_PUBLIC_SUPABASE_URL

SUPABASE_SERVICE_ROLE_KEY

SUPABASE_STORAGE_BUCKET

NEXT_PUBLIC_SITE_URL

NEXT_PUBLIC_WHATSAPP_NUMBER

N8N_WEBHOOK_URL
```

---

# Code Standards

- TypeScript strict mode.
- Small functions.
- Single Responsibility Principle.
- Dependency inversion where appropriate.
- Reusable services.
- No duplicated logic.

---

# Backend Philosophy

The backend should remain predictable, secure, and independent of the frontend, allowing future integrations such as a mobile application or external APIs without requiring changes to the core business logic.