# api.md

# API Specification

## Overview

The API follows REST principles and is implemented using Next.js Route Handlers.

All endpoints return JSON.

Every response follows the same structure.

Success

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "..."
}
```

---

# Authentication

## Login

POST

```http
/api/auth/login
```

Body

```json
{
  "email": "admin@aocume.com",
  "password": "********"
}
```

Response

```json
{
  "success": true,
  "data": {
    "user": {},
    "token": "jwt"
  }
}
```

---

## Logout

POST

```http
/api/auth/logout
```

Clears the authentication cookie.

---

# Categories

## List Categories

GET

```http
/api/categories
```

Public.

---

## Get Category

GET

```http
/api/categories/:id
```

---

## Create Category

POST

```http
/api/categories
```

Admin only.

---

## Update Category

PUT

```http
/api/categories/:id
```

Admin only.

---

## Delete Category

DELETE

```http
/api/categories/:id
```

Admin only.

---

# Products

## List Products

GET

```http
/api/products
```

Supports query parameters

```text
category

featured

type

search

page

limit
```

---

## Get Product

GET

```http
/api/products/:slug
```

Public.

---

## Create Product

POST

```http
/api/products
```

Admin only.

---

## Update Product

PUT

```http
/api/products/:id
```

Admin only.

---

## Delete Product

DELETE

```http
/api/products/:id
```

Admin only.

---

# Business Packages

## List Packages

GET

```http
/api/packages
```

Public. Supports query parameters

```text
featured

active

page

limit
```

---

## Get Package

GET

```http
/api/packages/:slug
```

Public.

---

## Create Package

POST

```http
/api/packages
```

Admin only.

---

## Update Package

PUT

```http
/api/packages/:id
```

Admin only.

---

## Delete Package

DELETE

```http
/api/packages/:id
```

Admin only.

---

## Package Lead (WhatsApp / n8n)

POST

```http
/api/packages/:id/lead
```

Starts the attendance flow for a package. Forwards the payload to the n8n
webhook, which drives the WhatsApp conversation.

Payload

```json
{
  "packageId": "",
  "packageName": "",
  "investment": 0,
  "clientName": "",
  "phone": ""
}
```

Notes

In Version 1 the public frontend opens WhatsApp directly with a pre-filled
message carrying the package name, value and ID. This endpoint (and the n8n
webhook) is wired on the backend/integration milestone; `clientName` and
`phone` are included when the client is authenticated or has provided them.

---

# Uploads

## Upload Image

POST

```http
/api/uploads
```

Uploads image to Supabase Storage.

Returns

```json
{
  "url": ""
}
```

---

# Testimonials

## List Testimonials

GET

```http
/api/testimonials
```

---

## Create Testimonial

POST

```http
/api/testimonials
```

Admin only.

---

## Update Testimonial

PUT

```http
/api/testimonials/:id
```

---

## Delete Testimonial

DELETE

```http
/api/testimonials/:id
```

---

# Contact

## Send Message

POST

```http
/api/contact
```

Body

```json
{
  "name": "",
  "email": "",
  "phone": "",
  "subject": "",
  "message": ""
}
```

Stores the message in the database.

---

## List Messages

GET

```http
/api/contact
```

Admin only.

---

# Settings

## Get Website Settings

GET

```http
/api/settings
```

Public.

---

## Update Website Settings

PUT

```http
/api/settings
```

Admin only.

---

# Status Codes

200

Success

201

Created

400

Validation Error

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

500

Internal Server Error

---

# Validation

Every endpoint validates incoming data using Zod.

Invalid requests never reach the database.

---

# Security

Protected routes require authentication.

Uploads accept only image formats.

Input is sanitized before persistence.

---

# API Philosophy

The API should remain small, predictable, and easy to extend.