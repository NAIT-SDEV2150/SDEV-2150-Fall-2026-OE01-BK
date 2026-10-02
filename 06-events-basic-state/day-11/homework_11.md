# Homework Exercise: UI Framework Integration with DaisyUI

## Context

This homework is a **direct continuation of the Lesson 10 homework**. You will continue working in the **same React + Tailwind project** and extend it by integrating a **component library (DaisyUI)**.

You should **not** start a new project. All components, layout, and data rendering should already exist from the previous homework exercises.

The focus of this assignment is evaluating and applying a UI framework on top of an existing Tailwind-based UI.

## Goal

Use DaisyUI to **refactor and standardize parts of the user interface**, reducing custom Tailwind markup while maintaining layout behaviour and responsiveness.

You will practice:

- integrating a UI component library into an existing project
- replacing custom markup with framework components
- applying and experimenting with DaisyUI themes
- reasoning about the trade-offs of using a component library

## Why this matters

In real-world projects, teams rarely build every UI element from scratch.

This exercise helps you understand:

- when a component library can speed up development
- how frameworks build on top of utility-first CSS
- what control you gain and what flexibility you give up
- how to integrate third-party UI tools without rewriting your application

## Task

Building on your existing implementation, complete **all** of the following:

1. Install and configure **DaisyUI** in your existing project.
2. Apply a DaisyUI **theme** using a `data-theme` attribute set from React (for example, in your layout component).
3. Refactor **at least one existing presentation component** to use DaisyUI component classes (for example: `card`, `btn`, `badge`, `alert`).
4. Ensure the existing responsive layout behaviour from Lesson 10 still works correctly.
5. Remove or simplify Tailwind utility classes that DaisyUI replaces.

Do **not** add new features, data sources, state, or event handling.

## Setup requirements

Continue working in the **same project** used for Lesson 10.

Before starting:

- Confirm the project runs locally using `npm run dev`
- Verify Tailwind is installed and working
- Ensure the Lesson 10 responsive layout is still intact

> This homework assumes all previous assignments are complete.

## UI requirements

- Existing layout and components must remain structurally the same
- DaisyUI components should replace repeated or verbose markup
- Tailwind utilities may still be used for layout and spacing
- No custom CSS files should be added

## Acceptance criteria

- DaisyUI is correctly installed and configured
- At least one component has been refactored using DaisyUI classes
- A DaisyUI theme is applied and visibly affects the UI
- Responsive layout behaviour from Lesson 10 is preserved
- Styling changes improve consistency or readability

## Further extensions (optional)

- Refactor an additional component using DaisyUI
- Experiment with multiple DaisyUI themes and compare results
- Combine DaisyUI components with Tailwind utilities intentionally
- Write a short reflection on where DaisyUI helped and where it felt limiting

## Submission

- Commit your changes to the **same workbook repository** used for previous homework and push to GitHub.
- Update your `README.md` with:
  - which components were refactored using DaisyUI
  - which theme you chose and why
  - one benefit and one drawback you observed when using a UI framework