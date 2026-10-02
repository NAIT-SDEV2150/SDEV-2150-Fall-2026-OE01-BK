# Lesson 15: Custom Hooks and Session Storage

## Install dependencies and run the dev server

Continue working in the same React + Tailwind + DaisyUI project from previous lessons.

1. Move into your existing project directory:
```sh
cd lesson-13
```
2. Install dependencies (if needed):
```sh
npm install
```
3. Start the dev server:
```sh
npm run dev
```
4. Open the provided dev server URL in your browser

## Lesson focus

This lesson introduces:

- What custom hooks are
- Why custom hooks exist
- How hooks can encapsulate reusable state logic
- Persisting state using `sessionStorage`

We will extend the existing NAIT Student Resources example.

Specifically, we will persist the **selected resource** so that it remains selected after a page refresh.

## Connecting to prior lessons

Currently:

- `App` owns `selectedResource`
- `Results` notifies the parent when a resource is selected
- `Details` renders conditionally based on `selectedResource`

If you refresh the page, the selected resource is lost.

We will now persist it.

# Phase 1: What is a Custom Hook?

A custom hook is simply:

- A JavaScript function
- Whose name starts with `use`
- That calls one or more built-in hooks

Example pattern:

```js
function useSomething() {
  const [value, setValue] = useState(null);
  return [value, setValue];
}
```

Custom hooks allow us to extract and reuse logic across components.

# Phase 2: Create the Hook File

Create a new file:

```
src/hooks/useSelectedResource.js
```

Add the following:

```js
import { useState } from 'react';

const STORAGE_KEY = 'selectedResource';

export function useSelectedResource() {
  const [selectedResource, setSelectedResource] = useState(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    
    return null;
  });

  function updateSelectedResource(resource) {
    setSelectedResource(resource);

    if (resource === null) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resource));
    }
  }

  return [selectedResource, updateSelectedResource];
}
```

## Important Concepts Introduced

### Lazy Initialization

```js
useState(() => { ... })
```

The function runs only on initial render.

This allows us to:

- Read from `sessionStorage` once
- Initialize state correctly
- Avoid re-reading on every render

# Phase 3: Replace Existing State in App

Open `App.jsx`.

Replace:

```js
const [selectedResource, setSelectedResource] = useState(null);
```

With:

```js
import { useSelectedResource } from './hooks/useSelectedResource';

const [selectedResource, setSelectedResource] = useSelectedResource();
```

No other changes are required.

# Phase 4: Test the Behavior

1. Select a resource
2. Refresh the page
3. The same resource should still be selected

Close the tab entirely and reopen it.

The selection will be cleared.

That is the difference between `sessionStorage` and `localStorage`.

# How This Works

- State still lives in React
- `sessionStorage` mirrors that state
- The hook encapsulates persistence logic

The component does not need to know anything about storage.

# Why Not Use useEffect Yet?

We are writing to storage inside the setter.

This works because:

- The setter runs synchronously
- We are simply mirroring state

In the next lesson, we will discuss:

- Side effects
- Component lifecycle
- Why `useEffect` exists
- How to refactor this hook to separate state updates from persistence

# Pros of This Approach

- Low cognitive load
- Clear demonstration of custom hooks
- No lifecycle discussion required
- Immediate visible benefit (refresh persistence)
- Clean separation of concerns

# Limitations

- Side effects are inside the setter
- Does not respond to external storage changes
- Entire object is stored (not just id)
- Hardcoded storage key

These tradeoffs will help motivate the next lesson.

# Key Concepts Reinforced

- Custom hooks wrap reusable state logic
- Hooks can compose other hooks
- Lazy state initialization
- Separation of concerns

# Assessment

- `selectedResource` is persisted across refresh
- State is managed via a custom hook
- `App` remains clean and readable
- No `useEffect` is used yet

# Student Exercise

1. Refactor the hook to store only `resource.id` instead of the entire object.
2. Add a third return value that clears the stored selection.
3. Create a second hook called `useBoolean` for toggling true/false values.

# Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 15 - custom hook for session storage'
```
3. Push:
```sh
git push origin main
```