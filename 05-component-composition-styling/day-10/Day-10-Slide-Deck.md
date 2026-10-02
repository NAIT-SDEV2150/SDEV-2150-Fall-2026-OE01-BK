# Homework Exercise: Responsive Layout with Tailwind CSS

## Context

This homework is a **direct continuation of the previous homework exercise**. You will build on the same React + Tailwind project and extend it by refining the **responsive layout and styling behaviour**.

You should **not** start a new project unless you are missing or significantly behind on the previous homework. The focus of this exercise is layout refinement, not project setup.

## Goal

Apply Tailwind CSS utilities to build a **responsive, readable layout** that adapts across screen sizes.

You will work with an existing static React UI and focus on **layout behaviour, spacing, and breakpoint-driven design decisions** using Tailwind utility classes only.

## Why this matters

Responsive layout decisions are a core part of front-end development.

This exercise focuses on:

- reasoning about layout requirements at different screen sizes
- using Tailwind breakpoints intentionally
- adjusting grid and spacing rules without custom CSS
- keeping styling changes isolated and maintainable

These skills are essential when working with design systems and component libraries.

## Task

Building on your existing implementation, complete **all** of teh following:

All component markup and data rendering should already exist from the previous homework.

1. Update the existing layout so it behaves differently across **three screen sizes**:
   - Mobile (stacked)
   - Medium screens (filters or primary section full-width above secondary content)
   - Large screens (horizontal layout)
2. Use Tailwind grid or flex utilities to control layout changes.
3. Adjust spacing (`gap`, padding, margins) at one breakpoint to improve readability.
4. Keep all layout-related styling changes confined to layout-related components.

The goal is to demonstrate **intentional responsive design**, not visual decoration.

## Setup requirements

You should continue working in the **same project** used for the previous homework.

Before starting:

- Ensure the project runs locally using `npm run dev`
- Confirm Tailwind is installed and working
- Verify that Users and Posts components render correctly with hard-coded data

> This homework assumes the previous assignment is complete. If it is not, finish that work before proceeding.

## UI requirements

You should continue using the **existing presentation components** created in the previous homework.

No new components or data files should be created for this exercise.

Your focus is strictly on **layout behaviour and responsive styling**.

## Acceptance criteria

- Layout adapts correctly at mobile, medium, and large screen sizes
- Tailwind responsive utilities are used intentionally
- Layout and spacing rules are readable and well-organized
- No custom CSS files or inline styles are used

## Further extensions (optional)

- Introduce a second layout variant using only Tailwind utility classes
- Adjust layout behaviour at an additional breakpoint (e.g., `xl`)
- Experiment with a `layout` or `variant` prop that switches Tailwind class rule sets
- Add notes describing why certain breakpoints or spans were chosen

## Submission

- Commit your updated files to the **same workbook repository** used for the previous homework and push to GitHub.
- Include a short update in your `README.md` describing:
  - what responsive layout changes you implemented
  - which breakpoints were most important in your design
  - any optional challenges completed