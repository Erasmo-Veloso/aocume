# database.md

# Database

## Overview

The database is designed around a simple content management model.

Only administrators can create and manage content.

The system does not require customer accounts in Version 1.

---

# Entity Relationship

```text
Category
    │
    └────── Product

Product
    │
    └────── ProductImage

BusinessPackage
    │
    └────── PackageItem

Administrator

Testimonial

ContactMessage

SiteSettings
```

---

# Administrator

```text
id

name

email

password

createdAt

updatedAt
```

Purpose

Authenticate administrators.

---

# Category

```text
id

name

slug

description

createdAt

updatedAt
```

Relationship

One category has many products.

---

# Product

```text
id

categoryId

title

slug

shortDescription

description

price

productType

paymentType

minimumQuantity

deliveryTime

availableQuantity

featured

active

createdAt

updatedAt
```

---

# Product Type

Enum

```text
ORDER

READY_STOCK
```

ORDER

Imported from China.

READY_STOCK

Available in Angola.

---

# Payment Type

Enum

```text
PARTIAL

FULL
```

---

# ProductImage

```text
id

productId

url

alt

position

createdAt
```

One product

↓

Many images

---

# Business Package

```text
id

name

slug

tagline

image

investment

currency

profitMargin

estimatedReturn

profitBasis

ctaLabel

featured

active

position

createdAt

updatedAt
```

Purpose

Represent a structured investment opportunity (business model).

`investment` is stored as an integer (minor unit or whole AOA).

`profitBasis` indicates whether the estimate is gross or net.

Enum

```text
GROSS

NET
```

`ctaLabel` is the action button text (e.g. "Solicitar Cotação",
"Receber Detalhes", "Iniciar Projeto").

Relationship

One package has many items.

---

# Package Item

```text
id

packageId

label

quantity

position
```

One business package

↓

Many items

The full list is shown on the package details page; a short summary is shown on
the card.

---

# Testimonial

```text
id

clientName

position

photo

content

featured

createdAt

updatedAt
```

---

# Contact Message

```text
id

name

email

phone

subject

message

read

createdAt
```

---

# Site Settings

```text
id

companyName

email

phone

whatsapp

address

facebook

instagram

youtube

linkedin

logo

heroTitle

heroSubtitle

updatedAt
```

Only one record should exist.

---

# Relationships

Category

1

↓

N

Products

---

Product

1

↓

N

Images

---

# Indexes

Product

- slug
- categoryId
- featured
- active

BusinessPackage

- slug
- featured
- active

Category

- slug

Administrator

- email

Contact Message

- createdAt

---

# Constraints

Category slug must be unique.

Product slug must be unique.

Business package slug must be unique.

Administrator email must be unique.

Only active products and active packages appear publicly.

---

# Soft Delete

Not required for Version 1.

Records are permanently deleted.

Future versions may introduce soft deletes.

---

# Audit

Version 1 only tracks:

createdAt

updatedAt

No audit logs are required.

---

# Naming Convention

Tables

snake_case

Columns

snake_case

Primary Keys

UUID

Foreign Keys

relation_id

---

# Data Integrity

Every foreign key must enforce referential integrity.

No orphan records should exist.

---

# Future Expansion

The schema is prepared for future entities such as:

- Orders
- Customers
- Payments
- Courses
- Lessons
- Notifications
- Shipment Tracking
- LMS
- Analytics

These tables are intentionally omitted from Version 1.