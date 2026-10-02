# Homework Exercise: Lifting State and Filtering (Users + Posts)

## Context

This homework continues the same project context you’ve been working with:

- Searching for users by name using a simple form
- Rendering a list of users
- Rendering a list of posts

Up to this point, you created a `UserSearch` component and added local state in `Users` to highlight the selected user.

In Lesson 13, we learned how to:

- Lift state to a common parent (shared state)
- Use conditional rendering
- Work with forms (submission and simple validation)

In this homework, you will apply those concepts to connect the UI together.

## Goal

Refactor your implementation so:

- The parent component becomes the **single source of truth** for shared state
- Submitting the search form filters the visible users
- Selecting a user filters the visible posts

## Task

Building on your existing implementation, complete **all** of the following:

### 1. Lift shared state to the parent component

In the parent component that renders `UserSearch`, `Users`, and `Posts` (`App.jsx`):

Create state for:

- `searchTerm` (string)
- `submittedSearchTerm` (string)
- `selectedUserId` (number or string)

Notes:

- `searchTerm` is what the user is currently typing.
- `submittedSearchTerm` is the term used to actually filter the user list.
- `selectedUserId` tracks which user is currently selected.

Requirements:

- `UserSearch` must not own the search state anymore.
- `Users` must not own selected-user state anymore.

### 2. Update `UserSearch` to use lifted state and handle submission

Refactor `UserSearch` so it receives:

- `searchTerm`
- `onSearchChange(newValue)`
- `onSubmitSearch()` (or `onSubmitSearch(term)`)

Requirements:

- The input must be controlled by `searchTerm`.
- The `<form>` must implement `onSubmit`.
- The submit handler must call `event.preventDefault()`.
- On submit, call the parent callback to set `submittedSearchTerm`.

Simple validation:

- If the search term is empty or whitespace, do not submit.
- Show a small validation message in the UI (not an alert).

### 3. Filter users based on form submission

In the parent component:

- Derive a `filteredUsers` list using `submittedSearchTerm`.
- Pass `filteredUsers` into the `Users` component.

Filtering rules:

- Case-insensitive match against the user’s name
- If `submittedSearchTerm` is empty, show all users

This must be submit-based filtering (typing alone should not filter yet).

### 4. Lift user selection and highlight the selected user

Update `Users` so it receives:

- `users` (already filtered)
- `selectedUserId`
- `onSelectUser(userId)`

Requirements:

- Clicking a user calls `onSelectUser(user.id)`.
- The selected user is visually highlighted.

### 5. Filter posts based on the selected user

Update the parent component to derive `filteredPosts`:

- If no user is selected, show no posts (or show all posts, choose one approach and state it clearly in your UI)
- If a user is selected, show only posts belonging to that user

Then pass `filteredPosts` into `Posts`.

### 6. Conditional rendering

Add at least two conditional rendering cases:

1. If there are no users after filtering, render a helpful message (example: "No users match your search.")
2. If no user is selected, render a helpful message in the posts area (example: "Select a user to view posts.")

You may use `&&` or a ternary.

## Constraints

Do **not**:

- Add global state libraries
- Use React Context
- Add fetching
- Add new features unrelated to search, selection, or filtering

Keep the solution focused on:

- shared state via lifting
- derived data via filtering
- conditional rendering

## Acceptance criteria

- `UserSearch` uses lifted state and submits via a form handler
- Validation prevents empty submissions and shows a small UI message
- Users list filters only after submit
- Clicking a user updates lifted selection state
- Selected user is visibly highlighted
- Posts list filters by selected user
- At least two conditional rendering cases are implemented
- No direct DOM manipulation is used

## Further extensions (optional)

- Add a "Clear search" button that resets `searchTerm` and `submittedSearchTerm`
- Add a "Clear selection" button that sets `selectedUserId` back to null
- Show a small summary line: "Showing X users" and "Showing Y posts"

## Submission

- Commit and push your changes to the same workbook repository.
- Update your `README.md` with:
  - What state lives in the parent and why
  - How submit-based filtering works (searchTerm vs submittedSearchTerm)
  - How selection affects posts
  - The two conditional rendering cases you implemented