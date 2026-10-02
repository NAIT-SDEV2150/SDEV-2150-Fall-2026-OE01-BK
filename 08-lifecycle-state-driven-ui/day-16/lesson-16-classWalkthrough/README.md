# Lesson 16: Component Lifecycle and `useEffect`

## Install dependencies and run the dev server

Continue working in the same React + Tailwind + DaisyUI project from Lesson 15.

1. Move into your existing project directory:
```sh
cd lesson-15
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

## Start the backend API

Lesson 16 includes fetching resources from a local backend server.

In a second terminal:

1. Move into the backend folder:
```sh
cd backend
```
2. Install dependencies (first time only):
```sh
npm install
```
3. Start the server:
```sh
npm start
```

The server listens on `http://localhost:3000`.

We will fetch the list of resources from:

- `GET /resources`

Keep this server running while you work on the frontend.

## Lesson focus

This lesson introduces:

- A practical lifecycle mental model for function components
- Side effects and why React separates them from rendering
- The `useEffect` hook
- Fetching data with `useEffect` using a custom hook
- Refactoring a custom hook to move side effects out of the setter

We will build directly on the NAIT Student Resources example and the `useSelectedResource` hook created in Lesson 15.

## Connecting to Lesson 15

In Lesson 15, our hook persisted selection like this:

- Read from `sessionStorage` during state initialization
- Write to `sessionStorage` inside the setter function

That worked, but it mixes:

- Updating React state
- Performing a side effect (writing to browser storage)

In this lesson, we will separate those concerns using `useEffect`.

# Phase 1: Lifecycle mental model for function components

React function components follow this loop:

1. Render, React calls your component function to compute UI
2. Commit, React updates the DOM
3. Effects run, React runs `useEffect` callbacks

Important idea:

- Rendering should be pure
- Side effects should run after the DOM is updated

# Phase 2: What counts as a side effect?

A side effect is any work that reaches outside React rendering, for example:

- Writing to `localStorage` or `sessionStorage`
- Fetching data
- Setting timers
- Updating document title
- Subscribing to events

Today we focus on storage and fetching.

# Phase 3: Introduce `useEffect`

At a high level:

```js
useEffect(() => {
  // run after render
}, [dependencies]);
```

- The callback runs after React renders and commits
- The dependency array controls when it re-runs

Common dependency patterns:

- `[]` runs once after the first render
- `[value]` runs when `value` changes
- no array runs after every render

# Phase 4: Fetching as a side effect

Fetching data is a classic side effect:

- It reaches outside the component
- It happens over time
- It updates React state when the result arrives

To keep components clean, we will fetch through a custom hook.

# Phase 5: Create `useResources`

Create a new file:

```
src/hooks/useResources.js
```

Add the following:

```js
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:3000';

export function useResources() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchResources(signal) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/resources`, { signal });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setResources(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchResources(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  function refetch() {
    const controller = new AbortController();
    fetchResources(controller.signal);
  }

  return { resources, isLoading, error, refetch };
}
```

Notes:

- `useEffect(..., [])` runs once after the first render
- We store the results in React state
- We use `AbortController` so the request can be cancelled if the component unmounts

# Phase 6: Use `useResources` in `App`

Open `App.jsx`.

Import and use the hook:

```js
import { useResources } from './hooks/useResources';

const { resources, isLoading, error, refetch } = useResources();
```

Pass `resources` into your `Results` component.

For example:

```jsx
<Results
  resources={resources}
  selectedResource={selectedResource}
  onSelectResource={setSelectedResource}
/>
```

If your `Results` component currently imports static data, remove that import and use the `resources` prop instead.

# Phase 7: Conditional rendering for loading and errors

Still in `App.jsx`, render UI based on request state.

Add a simple loading state:

```jsx
{isLoading && (
  <div className="text-sm text-base-content/70">Loading resources...</div>
)}
```

Add a simple error state:

```jsx
{error && (
  <div className="alert alert-error">
    <div>
      <p className="font-semibold">Could not load resources</p>
      <p className="text-sm opacity-80">{error.message}</p>
      <button className="btn btn-sm mt-2" onClick={refetch}>Try again</button>
    </div>
  </div>
)}
```

Then render your normal layout when data is available.

We are not trying to build a perfect UX here.

The goal is to reinforce:

- side effects belong in effects
- data arrives later
- UI should reflect loading and error states

# Phase 8: Refactor `useSelectedResource` to use `useEffect`

Open:

```
src/hooks/useSelectedResource.js
```

Update the import:

```js
import { useEffect, useState } from 'react';
```

Now refactor the hook so that:

- The setter only updates state
- The effect mirrors state into `sessionStorage`

Replace the file contents with the following:

```js
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (selectedResource === null) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selectedResource));
  }, [selectedResource]);

  return [selectedResource, setSelectedResource];
}
```

What changed:

- We removed the custom setter
- The effect watches `selectedResource`
- Any change to state is persisted automatically

# Phase 9: Confirm App usage stays the same

Open `App.jsx`.

It should still look like this:

```js
import { useSelectedResource } from './hooks/useSelectedResource';

const [selectedResource, setSelectedResource] = useSelectedResource();
```

No other changes should be needed.

# Phase 10: Validate behavior

1. Select a resource
2. Refresh the page
3. The selection should persist

Now test clearing selection:

- Add a temporary "Clear selection" button in the UI that calls `setSelectedResource(null)`
- Confirm that the selection clears and storage is removed

You can remove the button after testing.

# Phase 11: Why this version is better

This version has a clearer separation:

- State updates are pure and local to React
- Side effects run after rendering
- The component code stays focused on UI

This pattern scales to other side effects like fetch and subscriptions.

# Notes about dev mode

If you notice effects running more than once in development, that can be normal.

Many Vite + React projects enable React Strict Mode during development, and Strict Mode may intentionally re-run certain logic to help surface unsafe side effects.

For this lesson:

- Always validate behavior in the UI
- Do not try to "fix" Strict Mode by removing it

# Key Concepts Reinforced

- Render should be pure
- Side effects belong in `useEffect`
- Dependency arrays control when effects run
- Custom hooks can hide complexity behind a clean API

# Assessment

- Resources are fetched from the backend using the `useResources` hook
- Loading and error states are handled using conditional rendering
- The hook persists selected resource via `useEffect`
- Side effects are not performed inside the setter
- Selection persists across refresh
- Setting selection to null removes the stored value

# Student Exercise

1. Add a `useEffect` in `App.jsx` that logs to the console when selection changes.
2. Add an effect that updates `document.title` to include the selected resource title (or a default).
3. Discuss: what would happen if you removed the dependency array?

# Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 16 - useEffect, lifecycle, and fetching'
```
3. Push:
```sh
git push origin main
```