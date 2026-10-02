# Homework Exercise: Event Handling and Local State in React

## Context

This homework is a **direct continuation of the previous project** (Lesson 11).

You will continue working in the **same React + Tailwind + DaisyUI project**. All layout, components, and styling work should already be complete.

This assignment introduces **local component state and event handling**.

You should not start a new project.

## Goal

Add interactivity to your existing application using:

- `useState`
- Component-level click handlers
- Basic form submission handling

## Task

Building on your existing implementation, complete **all** of the following:

### 1. Create a `UserSearch` component (controlled input + submit handler)

Create a new `UserSearch` component.

Requirements:

- The component must render a `<form>` with a single text input for searching users by name
- The text input must be a **controlled input** using `useState`
- The form must implement `onSubmit` and call `event.preventDefault()`
- For now, the submit handler should only log a simple message to the console

Example behaviour:

- Typing updates state
- Submitting the form does **not** reload the page

> Important: This homework does not require connecting the search term to the users list yet.

### 2. Add selected-user state to the `Users` component

Update the existing `Users` component so it tracks and highlights the **currently selected user**.

Requirements:

- Add state (for example, `selectedUserId`)
- When a user is clicked, update the selected state
- Apply a visible highlight style to the selected user (for example: border, background, badge, or `active` state)

> Important: This homework does not require filtering posts by selected user yet.

### Constraints

Do **not**:

- Implement actual searching or filtering of users yet
- Filter posts based on the selected user yet
- Lift state to parent components yet
- Introduce new features or external data

This assignment focuses only on **local state and event handling**.

## Setup Requirements

Continue working in the same repository.

Before starting:

- Ensure the app runs with `npm run dev`
- Confirm DaisyUI integration from Lesson 11 is still working
- Confirm responsive layout from Lesson 10 remains intact

## Acceptance Criteria

- `UserSearch` exists and uses a controlled input (`useState`)
- Submitting the `UserSearch` form prevents default page reload and logs a message
- Clicking a user updates selected state in `Users`
- The selected user is visually highlighted
- No direct DOM manipulation is used
- No state is lifted to parent components

## Further Extensions (Optional)

- Add a "Clear" button to `UserSearch` that resets the input state
- Display the current search term below the input as a live preview
- Add a small label showing the selected user’s name

## Submission

- Commit and push your changes to the **same workbook repository**.
- Update your `README.md` with:
  - A short explanation of how `useState` is used in `UserSearch` and `Users`
  - One example of an event handler you implemented (click or submit)
  - A brief note describing what will be connected in a future homework (searching users, filtering posts)