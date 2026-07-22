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

# Testimonial Service

Responsibilities

- CRUD testimonials

Rules

Only featured testimonials appear on the homepage.

---

# Contact Service

Responsibilities

- Validate form
- Store message

No email sending in Version 1.

---

# Upload Service

Responsibilities

- Upload image
- Validate file type
- Return secure URL

Allowed formats

- JPG
- PNG
- WEBP

Maximum file size should be configurable.

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

JWT_SECRET

CLOUDINARY_CLOUD_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

NEXT_PUBLIC_SITE_URL
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