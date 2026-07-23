# deployment.md

# Deployment

## Overview

The AOCUME platform is deployed as a Full Stack Next.js application running on a Linux VPS using Docker containers.

The production environment should prioritize:

- Reliability
- Performance
- Security
- Maintainability

---

# Infrastructure

Production

- Ubuntu Server
- Nginx or Traefik
- Supabase (PostgreSQL managed)
- Supabase Storage
- SSL (Let's Encrypt)

---

# Deployment Flow

Developer

↓

GitHub

↓

Production Server

↓

Docker Build

↓

Docker Compose

↓

Application Online

---

# Environment Variables

Required

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

Never commit environment files.

---

# Database

Production

Supabase (PostgreSQL)

Access

Prisma ORM (via connection pooler at runtime; direct connection for migrations)

Seed

Optional

---

# Media Storage

Product images are stored in Supabase Storage.

Only URLs are stored in the database.

---

# Domain

Production example

```text
https://aocume.co.ao
```

HTTPS is mandatory.

---

# SSL

Use Let's Encrypt certificates.

Enable automatic renewal.

---

# Docker

Recommended containers

- Web
- PostgreSQL
- Reverse Proxy

Future additions

- Redis
- Monitoring
- Analytics

---

# Reverse Proxy

Responsibilities

- HTTPS
- Routing
- Compression
- Caching
- Security headers

---

# Build Process

1. Install dependencies
2. Build Next.js
3. Run database migrations
4. Start containers

---

# Monitoring

Monitor

- Server status
- CPU
- Memory
- Disk usage
- Application logs

---

# Logging

Store:

- Application logs
- Server logs
- Reverse proxy logs

Keep logs outside the application container.

---

# Backups

Database

Daily (Supabase automated backups)

Supabase Storage

Managed by Supabase

Environment variables

Encrypted backup

---

# Rollback Strategy

Every deployment should allow rollback to the previous version.

---

# Performance

Enable:

- Gzip/Brotli compression
- Image optimization
- HTTP caching
- Static asset caching

---

# Deployment Checklist

Before deployment:

- Tests passing
- Build successful
- Environment variables configured
- Database migrated
- SSL configured
- Backup completed

After deployment:

- Homepage accessible
- Dashboard accessible
- Login working
- Product images loading
- Contact form functional

---

# Future Scalability

Architecture should support:

- CDN
- Redis
- Load Balancer
- Object Storage
- Multiple application instances

without requiring major code changes.

---

# Deployment Philosophy

Deployments should be repeatable, automated, and predictable, minimizing downtime and reducing the risk of human error.