# security.md

# Security

## Overview

Security is a fundamental requirement of the AOCUME platform. Every feature must be designed following secure-by-default principles.

The platform handles administrative access, business information, contact requests, and product management, making data protection and system integrity essential.

---

# Security Principles

The application should always:

- Validate all user input.
- Never trust client-side data.
- Protect administrator accounts.
- Minimize attack surface.
- Use secure defaults.
- Follow the Principle of Least Privilege.

---

# Authentication

Version 1 supports only administrator authentication.

Requirements:

- JWT authentication.
- HTTP-only cookies.
- Secure cookies in production.
- SameSite=Lax.
- Cookie expiration after configurable time.

Passwords must never be stored in plain text.

Use:

- bcrypt

---

# Authorization

Only authenticated administrators may access:

- Dashboard
- Product Management
- Category Management
- Testimonial Management
- Website Settings
- Contact Messages

Public users can only access public pages.

---

# Password Policy

Minimum requirements:

- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number

Passwords are hashed before storage.

---

# Input Validation

Every request must be validated using Zod.

Never rely only on frontend validation.

Reject:

- Missing fields
- Invalid data types
- Invalid URLs
- Invalid email addresses
- Oversized payloads

---

# SQL Injection

Database access is performed exclusively through Prisma ORM.

Raw SQL should be avoided unless absolutely necessary.

---

# XSS Protection

Escape dynamic content.

Never render user-generated HTML.

Avoid:

- dangerouslySetInnerHTML

User-generated content should always be treated as plain text.

---

# CSRF Protection

Since authentication uses HTTP-only cookies:

- SameSite cookies
- Origin validation
- CSRF protection if cross-site requests become necessary

---

# File Upload Security

Accepted formats:

- JPG
- JPEG
- PNG
- WEBP

Rejected:

- SVG
- EXE
- ZIP
- Scripts
- Executables

Validate:

- MIME type
- File size
- Upload success

Store only secure Supabase Storage URLs.

---

# Environment Variables

Sensitive values must never be committed.

Examples:

```text
DATABASE_URL

DIRECT_URL

JWT_SECRET

SUPABASE_SERVICE_ROLE_KEY
```

Use:

.env.local

Never expose secrets using NEXT_PUBLIC_* unless intended for public access.

---

# HTTPS

Production must always use HTTPS.

Never transmit authentication cookies over HTTP.

---

# Rate Limiting

Recommended for:

- Login
- Contact Form
- Upload endpoints

Helps prevent:

- Brute force
- Spam
- Abuse

---

# Logging

Log:

- Login attempts
- Authentication failures
- Unexpected server errors
- Upload failures

Never log:

- Passwords
- Tokens
- Secrets
- Sensitive personal data

---

# Error Messages

Never expose internal implementation details.

Bad example:

```text
PrismaClientKnownRequestError...
```

Good example:

```text
An unexpected error occurred.
```

---

# Headers

Recommended security headers:

- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

---

# Dependency Security

Regularly:

- Update dependencies
- Review security advisories
- Remove unused packages

---

# Backup Strategy

Database:

Daily automated backups.

Media:

Supabase Storage redundancy.

Environment variables:

Stored securely outside the repository.

---

# Secure Development Rules

Developers should:

- Never hardcode secrets.
- Never disable validation.
- Never trust client input.
- Keep dependencies updated.
- Review permissions before deployment.

---

# Security Philosophy

Security should be integrated into every feature from the beginning rather than added later as an afterthought.