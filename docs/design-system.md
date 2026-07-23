# design-system.md

# Design System

## Overview

The AOCUME Design System defines the visual language, reusable components, spacing, typography, and interaction patterns used throughout the platform.

The primary goals are:

- Consistency
- Simplicity
- Maintainability
- Accessibility
- Professional appearance

Every interface element should be built from this design system.

---

# Design Principles

The interface should always feel:

- Modern
- Professional
- Clean
- Spacious
- Trustworthy
- Business-oriented

Avoid visual clutter.

Whitespace is part of the design.

---

# Colors

## Primary

Black

```css
#0B0B0B
```

Usage:

- Navbar
- Headings
- Primary buttons
- Icons
- Footer

---

## Secondary

Golden Yellow

```css
#F4B731
```

Usage:

- CTAs
- Hover states
- Highlights
- Links
- Active indicators

---

## Background

```css
#FFFFFF
```

---

## Surface

```css
#FAFAFA
```

---

## Border

```css
#E5E5E5
```

---

## Text Primary

```css
#111827
```

---

## Text Secondary

```css
#6B7280
```

---

## Success

```css
#16A34A
```

---

## Warning

```css
#F59E0B
```

---

## Error

```css
#DC2626
```

---

# Typography

Primary Font

Poppins

Fallback

sans-serif

---

## Heading Sizes

H1

48px

Bold

---

H2

36px

Bold

---

H3

30px

SemiBold

---

H4

24px

SemiBold

---

Body

16px

Regular

---

Small

14px

Regular

---

Caption

12px

Regular

---

# Border Radius

Small

8px

Medium

12px

Large

16px

Extra Large

24px

---

# Shadows

Cards

```css
0 4px 12px rgba(0,0,0,.08)
```

---

Dropdown

```css
0 8px 24px rgba(0,0,0,.12)
```

---

Modal

```css
0 16px 48px rgba(0,0,0,.15)
```

---

# Spacing

Base unit

8px

Scale

```text
4
8
12
16
24
32
48
64
80
96
```

---

# Grid

Desktop

12 columns

---

Tablet

8 columns

---

Mobile

4 columns

---

Container

Max Width

1280px

Padding

24px

---

# Buttons

## Primary

Background

Black

Text

White

Hover

Golden

Radius

12px

Height

48px

---

## Secondary

Background

White

Border

Black

Text

Black

Hover

Light Gray

---

## Ghost

Transparent

Black Text

No Border

---

## Danger

Red

White Text

---

# Inputs

Height

48px

Border

1px Gray

Radius

12px

Padding

16px

Focus

Golden outline

---

# Cards

Cards should contain

- Image
- Title
- Description
- CTA

Radius

16px

Shadow

Default Card Shadow

Padding

24px

---

# Navbar

Height

80px

Contains

- Logo
- Navigation
- CTA

Sticky

Yes

Background

White

---

# Footer

Background

Black

White typography

Golden links on hover

---

# Icons

Library

Lucide React

Style

Outline

Stroke Width

2

---

# Images

Use

object-cover

Rounded corners

Lazy loading

Responsive sizes

---

# Animations

Duration

200ms

Timing

ease-in-out

Avoid excessive animations.

---

# Forms

Validation

Zod

Error messages below inputs.

Required fields indicated.

---

# Tables

Used only in Admin.

Hover state.

Pagination.

Search.

Sorting.

---

# Loading States

Skeleton components

Spinner only when necessary.

---

# Empty States

Every empty page should contain:

- Illustration
- Short message
- CTA

---

# Responsive Breakpoints

```text
sm 640px

md 768px

lg 1024px

xl 1280px

2xl 1536px
```

---

# Component Naming

Examples

Button

ProductCard

PackageCard

ServiceCard

HeroSection

SectionTitle

Container

Navbar

Footer

GalleryGrid

Never use generic names like:

Component1

Box

Item

---

# Accessibility

Minimum contrast AA.

Keyboard navigation.

Visible focus.

ARIA labels when needed.

Semantic HTML.

---

# UI Philosophy

The interface should feel premium through simplicity, not through excessive visual effects.