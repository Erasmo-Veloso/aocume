# roadmap.md

# Roadmap

## Vision

The AOCUME platform will evolve incrementally, delivering value through small, stable releases rather than large, complex updates.

Each version should remain production-ready.

---

# Version 1.0

## Institutional Website

Status

✅ Planned

Features

- Home page
- About page
- Contact page
- Product catalogue
- Product details
- Business packages (investment opportunities)
- Business package details
- Testimonials
- Responsive design
- SEO
- WhatsApp integration

---

## Business Packages

Status

✅ Planned

A new section that presents structured investment opportunities instead of only
individual products. Each package shows the required investment, included items
and an estimated return — a business model the client can follow. Detailed
guidance on how to reach that return is provided through consultation.

Features

- Package catalogue and details
- Investment value, included items and profit estimate per package
- Configurable action button ("Solicitar Cotação", "Receber Detalhes", "Iniciar Projeto")
- WhatsApp lead flow carrying package name, value and ID
- n8n-ready payload for automated, personalized attendance (see Automation)

---

## Administrative Dashboard

Status

✅ Planned

Features

- Administrator login
- Dashboard
- Product management
- Category management
- Business package management (create, edit, delete, activate/deactivate, values, margins, items, images, button text)
- Testimonial management
- Website settings
- Contact messages

---

## Automation (WhatsApp + n8n)

Status

✅ Planned

Clicking a package action button does not open a checkout. It starts a WhatsApp
conversation, sending the package payload (name, value, ID and — when available —
client name and phone) to an n8n workflow. n8n identifies the package, starts a
personalized conversation, presents the investment details, answers questions,
collects extra information and hands over to a human consultant when needed.

In Version 1 the frontend opens WhatsApp with a pre-filled message carrying the
package identifiers. The full n8n automation is wired on the backend/integration
milestone.

---

## Infrastructure

Status

✅ Planned

Features

- Supabase (PostgreSQL)
- Supabase Storage
- VPS deployment
- HTTPS

---

# Version 1.1

## Improvements

- Better search
- Product pagination
- Additional SEO improvements
- Performance optimizations
- Image management improvements
- Enhanced dashboard statistics

---

# Version 1.2

## Business Features

- Featured product scheduling
- Product availability indicators
- Multiple product galleries
- Frequently Asked Questions
- Blog section
- Service pages

---

# Version 2.0

## Customer Area

Planned

Features

- Customer registration
- Customer login
- Profile management
- Saved enquiries
- Personal dashboard

---

## Orders

Planned

Features

- Order creation
- Order history
- Order status
- Shipment progress

---

# Version 2.5

## Online Payments

Possible integrations

- Stripe
- PayPal
- Local payment gateways

Features

- Checkout
- Payment confirmation
- Payment history

---

# Version 3.0

## Education Platform

Features

- Online courses
- Video lessons
- Learning modules
- Progress tracking
- Certificates
- Student dashboard

---

# Version 3.5

## Mobile Application

Features

- Android
- iOS
- Push notifications
- Offline access
- Order tracking

---

# Version 4.0

## Business Expansion

Possible features

- Multi-language support
- Multi-currency
- Multiple administrators
- Analytics dashboard
- Customer support center
- Supplier management
- CRM features

---

# Ideas Backlog

Potential future features

- Live chat
- AI assistant
- Product recommendations
- Shipment calculator
- Currency converter
- Business appointment scheduling
- Newsletter
- Customer reviews
- SMS notifications
- WhatsApp automation
- Import cost calculator

---

# Long-Term Goal

Transform AOCUME from a corporate website into a complete digital ecosystem for importation, business consulting, professional training, and customer relationship management.

---

# Roadmap Principles

- Deliver value incrementally.
- Keep each version stable.
- Avoid unnecessary complexity.
- Prioritize customer needs.
- Build only features that align with the business vision.

Every new feature should contribute directly to AOCUME's mission of simplifying international trade and supporting business growth.