

# Homework Exercise: Custom Hook for Persisted Selection (Users + Posts)

## Context

Continue working in the same **Users + Posts** homework project you’ve been building over the last few lessons.

So far, your project supports:

- Searching/filtering users by name using a form
- Selecting a user from a list
- Filtering posts based on the selected user

In Lesson 15, we introduced **custom hooks** and used a custom hook to persist a selection in `sessionStorage`.

## Goal

Create and use a custom hook called `useSelectedUser` that:

- Stores the currently selected user in React state
- Persists the selection to `sessionStorage`
- Restores the selection after a page refresh

This homework is intentionally **narrow and specific** so you can focus on the custom-hook pattern.

## Task

### 1. Create a custom hook: `useSelectedUser`

Create a new hook file:

- `src/hooks/useSelectedUser.js`

Requirements:

- The hook name must start with `use`
- The hook must call `useState`
- The hook must use **lazy initialization** to read from `sessionStorage` once
- The hook must store and retrieve the selected user identifier (recommended: `selectedUserId`)
- The hook must return a tuple (array) like:

```js
[selectedUserId, setSelectedUserId]
```

Persistence requirements:

- When `setSelectedUserId` is called with a valid id, store it to `sessionStorage`
- When called with `null`, remove the stored value from `sessionStorage`

> Keep this hook focused. In the next lesson we will talk about `useEffect` and side effects.

### 2. Replace selected-user state in the parent component

Find where your app currently tracks selection (typically in the parent component that renders Users and Posts).

Replace the existing selected-user state:

```js
const [selectedUserId, setSelectedUserId] = useState(null);
```

With your custom hook:

```js
const [selectedUserId, setSelectedUserId] = useSelectedUser();
```

No other parts of the app should need to know about `sessionStorage`.

### 3. Verify existing behaviour still works

Confirm:

- Selecting a user still highlights the selected user
- Posts still filter based on the selected user
- Clearing selection (setting `selectedUserId` to `null`) still behaves correctly

### 4. Verify persistence

Test the persistence behaviour:

1. Select a user
2. Refresh the page
3. The same user should remain selected and posts should still be filtered

Optional (recommended): Add a temporary “Clear Selection” button that sets the selection to `null`, then remove it after testing.

## Constraints

Do **not**:

- Create a generic `useLocalStorage` hook yet
- Use `useEffect` yet
- Add new features unrelated to selection persistence
- Add new dependencies

This assignment is about:

- Custom hook structure
- Hook call order and rules
- Encapsulating persistence logic

## Acceptance Criteria

- A `useSelectedUser` hook exists in `src/hooks/useSelectedUser.js`
- The hook uses `useState` with lazy initialization
- The selected user id persists in `sessionStorage`
- Refreshing the page restores the selection
- App components do not directly read/write `sessionStorage`
- Existing selection + filtering behaviour still works

## Further Extensions (Optional)

- Update the hook to return a third value: `clearSelectedUser()`
- Store the full selected user object instead of only the id (then compare pros/cons in your README)
- Display a small message in the UI showing the selected user id

## Submission

- Commit and push your changes to the same workbook repository.
- Update your `README.md` with:
  - Where the selected user state lives now and why
  - How `sessionStorage` is used (and why lazy initialization matters)
  - One benefit of using a custom hook in this case