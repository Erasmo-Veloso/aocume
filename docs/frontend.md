# frontend.md

# Frontend Specification

## Overview

The frontend is built with Next.js App Router and follows a component-based architecture.

Pages should be lightweight and composed of reusable sections.

---

# Public Pages

## Home

Purpose

Present AOCUME and convert visitors into leads.

Sections

- Navbar
- Hero
- Services
- How It Works
- Featured Products
- Benefits
- Testimonials
- Gallery
- Final CTA
- Footer

---

## Encomendas

Purpose

Display products available for import.

Features

- Search
- Category filter
- Product cards
- Product details

---

## Product Details

Displays

- Images
- Description
- Price
- Delivery time
- Minimum quantity
- Payment method
- WhatsApp CTA

---

## Sobre

Sections

- Company Story
- Mission
- Vision
- Values
- Santiago Mulonga
- Why Choose AOCUME

---

## Contact

Contains

- Contact form
- WhatsApp
- Email
- Social media
- Company information

---

# Administrative Pages

## Login

Administrator authentication.

---

## Dashboard

Overview

Displays quick statistics.

Examples

- Total Products
- Categories
- Testimonials
- Messages

---

## Products

Functions

- List
- Search
- Filter
- Create
- Edit
- Delete

---

## Product Form

Fields

- Title
- Category
- Description
- Price
- Images
- Product Type
- Payment Type
- Delivery Time
- Quantity
- Featured
- Active

---

## Categories

CRUD interface.

---

## Testimonials

CRUD interface.

---

## Messages

Read-only inbox.

---

## Settings

Editable website information.

---

# Components

## Layout

- Container
- Section
- Page Header
- Navbar
- Footer

---

## UI

- Button
- Input
- Textarea
- Select
- Badge
- Modal
- Dialog
- Card
- Skeleton
- Pagination

---

## Feature Components

- HeroSection
- ServiceCard
- ProductCard
- TestimonialCard
- ContactForm
- ProductGallery
- CategoryFilter

---

# Forms

Managed with

- React Hook Form
- Zod

---

# State Management

Server Data

React Query

UI State

React Context

Local State

React hooks

---

# Images

Optimized using Next.js Image.

Lazy loading enabled.

---

# SEO

Every public page includes

- Title
- Description
- Open Graph
- Twitter Card
- Structured metadata

---

# Responsive Design

Desktop

Tablet

Mobile

Mobile-first development is mandatory.

---

# Accessibility

Semantic HTML.

Keyboard navigation.

ARIA labels.

Alt text.

Visible focus states.

---

# Frontend Philosophy

Every page should guide users toward contacting AOCUME or requesting a product.