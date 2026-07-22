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

# Uploads

## Upload Image

POST

```http
/api/uploads
```

Uploads image to Cloudinary.

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