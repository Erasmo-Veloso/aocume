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
- Docker
- Docker Compose
- Nginx or Traefik
- PostgreSQL
- Cloudinary
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

JWT_SECRET

CLOUDINARY_CLOUD_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

NEXT_PUBLIC_SITE_URL
```

Never commit environment files.

---

# Database

Production

PostgreSQL

Migration

Prisma Migrate

Seed

Optional

---

# Media Storage

Product images are stored in Cloudinary.

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

Daily

Cloudinary

Managed externally

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