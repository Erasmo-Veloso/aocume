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
- Featured Business Packages
- Featured Products
- Benefits
- Testimonials
- Gallery
- Final CTA
- Footer

---

## Pacotes de Negócio

Purpose

Present structured investment opportunities (business models the client can follow).

Features

- Package cards
- Package details
- Investment value, included items and profit estimate
- Configurable action button
- WhatsApp lead flow with package payload

---

## Package Details

Displays

- Illustrative image
- Investment value
- Included items (full list)
- Profit estimate (gross or net)
- "What you get" vs "consult for how" framing
- Action button → WhatsApp (carries package name, value and ID)

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

## Testimonials

Parede de testemunhos em três formatos: vídeo (lightbox), imagem e texto,
com avaliação por estrelas. Alimentada pela base de dados.

---

## Blog

Purpose

Melhorar o SEO e educar os clientes.

Pages

- Lista de artigos (destaque + grelha + categorias)
- Artigo (Markdown, meta, capa, artigos relacionados, JSON-LD, CTA)

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

## Business Packages

CRUD interface.

Fields

- Name
- Image
- Investment value
- Included items
- Profit margin / estimated return
- Action button label
- Featured
- Active
- Order

---

## Testimonials

CRUD interface (formato texto/imagem/vídeo, foto/poster, vídeo, avaliação).

---

## Blog

CRUD interface. Conteúdo em Markdown; capa e imagens via Supabase Storage.

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
- PackageCard
- MediaTestimonials
- VideoTestimonial
- PostCard
- ArticleBody
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