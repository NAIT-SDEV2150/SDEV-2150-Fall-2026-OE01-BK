# Lesson 19: React Router 7 Data Mode

## Install dependencies and run the dev server

Continue working in the same React + Tailwind + DaisyUI project from Lesson 18.

1. Move into frontend directory:
```sh
cd frontend
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

Lesson 19 continues using the local backend server.

In a second terminal:

1. Move into the backend directory:
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

We will continue using:

- `GET /resources`
- `GET /resources/:id`
- `POST /resources`
- `PUT /resources/:id`

Keep this server running while you work on the frontend.

## Lesson focus

This lesson introduces **React Router 7 data mode**.

We will:

- Replace component-based route configuration with a router object
- Load route data with `loader` functions
- Read loaded data with `useLoaderData()`
- Submit mutations with route `action` functions
- Use router-aware `<Form>` components instead of manual submit handlers

This lesson is about moving data loading and mutations into the router.

## Connecting to prior lessons

So far, the app uses:

- `BrowserRouter`
- `Routes`
- `Route`
- `useEffect` for data fetching
- manual `fetch()` calls in components for create and update operations

While the current solution works, it spreads data logic across components.

React Router data mode gives us a different pattern:

- routes declare their own data requirements
- routes can handle form submissions
- components focus more on rendering

## Phase 1: What is data mode?

In component routing, routes define **which component** should render.

In [data mode](https://reactrouter.com/start/modes#data), routes define:

- which component should render
- how data is loaded
- how mutations are handled

This means the router becomes responsible for both navigation and route-driven data work.

## Phase 2: Create route loaders and actions

Create a new file:

```text
src/router.jsx
```

This file will hold:

- the router configuration
- route loaders
- route actions

We are moving toward a router object instead of JSX route declarations inside `main.jsx`.

## Phase 3: Add shared helpers for API calls

Inside `src/router.jsx`, start by adding a small API helper section.

```js
const API_BASE_URL = 'http://localhost:3000';

async function fetchResources() {
  const res = await fetch(`${API_BASE_URL}/resources`);

  if (!res.ok) {
    throw new Error(`Could not load resources: ${res.status}`);
  }

  return res.json();
}

async function fetchResourceById(resourceId) {
  const res = await fetch(`${API_BASE_URL}/resources/${resourceId}`);

  if (!res.ok) {
    throw new Error(`Could not load resource: ${res.status}`);
  }

  return res.json();
}
```

These helpers will be reused by loaders and actions.

## Phase 4: Create loaders for the directory and admin routes

Still in `src/router.jsx`, add route loader functions.

```js
export async function resourceDirectoryLoader() {
  const resources = await fetchResources();
  return { resources };
}

export async function adminLoader({ params }) {
  const resources = await fetchResources();

  if (!params.resourceId) {
    return {
      resources,
      resourceId: null,
      selectedResource: null,
    };
  }

  const selectedResource = await fetchResourceById(params.resourceId);

  return {
    resources,
    resourceId: params.resourceId,
    selectedResource,
  };
}
```

Important ideas:

- the directory route only needs the full list
- the admin route needs the list and, sometimes, one selected resource
- `params` is available inside the loader just like route parameters are available inside components

## Phase 5: Create an action for the admin form

Next, add an action that handles both create and update.

```js
import { redirect } from 'react-router';

export async function adminAction({ request, params }) {
  const formData = await request.formData();

  const payload = {
    title: formData.get('title'),
    category: formData.get('category'),
    summary: formData.get('summary'),
    location: formData.get('location'),
    hours: formData.get('hours'),
    contact: formData.get('contact'),
    virtual: formData.get('virtual') === 'on',
    openNow: formData.get('openNow') === 'on',
  };

  const isEditing = Boolean(params.resourceId);
  const url = isEditing
    ? `${API_BASE_URL}/resources/${params.resourceId}`
    : `${API_BASE_URL}/resources`;
  const method = isEditing ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Could not ${isEditing ? 'update' : 'create'} resource`);
  }

  const savedResource = await res.json();

  return redirect(`/admin/${savedResource.id}`);
}
```

This action does the same work your manual submit handler used to do, but now it belongs to the route.

## Phase 6: Define the router object

Now build the router object in `src/router.jsx`.

```js
import App from './App';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage';
import AdminPage from './pages/AdminPage';
import {
  createBrowserRouter,
} from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ResourceDirectoryPage />,
        loader: resourceDirectoryLoader,
      },
      {
        path: 'admin',
        element: <AdminPage />,
        loader: adminLoader,
        action: adminAction,
      },
      {
        path: 'admin/:resourceId',
        element: <AdminPage />,
        loader: adminLoader,
        action: adminAction,
      },
    ],
  },
]);
```

We now have route definitions that include:

- `element`
- `loader`
- `action`

## Phase 7: Update `main.jsx` to use `RouterProvider`

Open `main.jsx`.

Replace the current `BrowserRouter` + `Routes` setup with:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import './index.css';
import { router } from './router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

This is the key shift into data mode.

Instead of rendering route JSX directly, the app now renders a configured router object.

> NOTE: your application will effectively be 'broken' at this stage. We now must work within the pages to make use of the new loaders and action functions.

## Phase 8: Refactor `ResourceDirectoryPage` to use `useLoaderData()`

Open `src/pages/ResourceDirectoryPage.jsx`.

Remove the `useResources()` hook import and replace it with:

```jsx
import { useLoaderData } from 'react-router';
```

Then read route data from the loader:

```jsx
const { resources } = useLoaderData();
```

This means the page no longer fetches resources for itself.

The route already loaded the data before rendering the page.

You can now remove component-level loading and error handling related to `useResources()` from this page.

## Phase 9: Refactor `AdminPage` to use `useLoaderData()`

Open `src/pages/AdminPage.jsx`.

Replace `useResources()` usage with:

```jsx
import { Form, useLoaderData, useNavigation } from 'react-router';
```

Inside the component:

```jsx
const { resources, selectedResource, resourceId } = useLoaderData();
const navigation = useNavigation();
const isSubmitting = navigation.state === 'submitting';
```

Now the page reads its data from the route instead of fetching it directly.

The selected resource is already prepared by the loader.

## Phase 10: Replace the manual form with router `<Form>`

Because the route now has an `action`, the admin page can use React Router’s `<Form>` component.

Example:

```jsx
<Form method="post" className="space-y-4">
  <div className="space-y-1">
    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
      Title
    </label>
    <input
      id="title"
      name="title"
      type="text"
      defaultValue={selectedResource?.title ?? ''}
      className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
    />
  </div>

  <button
    type="submit"
    className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
    disabled={isSubmitting}
  >
    {isSubmitting
      ? 'Saving...'
      : resourceId
        ? 'Update Resource'
        : 'Add Resource'}
  </button>
</Form>
```

Important differences from the old pattern:

- no manual `onSubmit`
- no manual `fetch()` call inside the component
- the form submits to the route action automatically

## Phase 11: Make the resource list route-driven

The admin page should still allow selecting a resource for editing. Add a nav link to each rendered item in the list. Add the `NavLink` to the imports:

```jsx
import { Form, NavLink, useLoaderData, useNavigation } from 'react-router';
```

Example list item:

```jsx
<li key={resource.id}>
  <NavLink
    to={`/admin/${resource.id}`}
    className={({ isActive }) =>
      `block rounded border p-3 ${isActive ? 'border-sky-500 bg-sky-50' : 'border-gray-200'}`
    }
  >
    <p className="font-semibold">{resource.title}</p>
    <p className="text-sm text-base-content/70">{resource.category}</p>
  </NavLink>
</li>
```

Clicking a resource updates the route, the loader runs again, and the selected resource is loaded into the form.

## Phase 12: Add a create-mode navigation path

To return to create mode, update the reset button to be a link that goes to `/admin`.

Example:

```jsx
<NavLink
  to="/admin"
  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
>
  New Resource
</NavLink>
```

This switches back to create mode by changing the route.

## Phase 13: Why the admin inputs do not reset properly yet

At this point, the application may appear to work, but the admin form still has an important problem.

Because the inputs use `defaultValue`, they are **uncontrolled inputs**.

For example:

```jsx
<input
  id="title"
  name="title"
  type="text"
  defaultValue={selectedResource?.title ?? ''}
/>
```

This only applies the value when the input first mounts.

That means:

- navigating from `/admin` to `/admin/:resourceId` may not fully reset the visible form fields
- clicking a different resource may update the route, but not fully reset typed input values
- returning to `/admin` may leave previously typed values visible

The route and loader data are updating correctly, but the input elements are keeping their own internal browser-managed state.

A cleaner solution is to move the form into a separate `ResourceForm` component and let that component manage controlled input state.

When the route changes, we will render `ResourceForm` with a `key` tied to `resourceId` so React remounts the form and resets the fields correctly.

### Step 1: Create a form component

Create a new file:

```text
src/components/ResourceForm.jsx
```

Add the following:

```jsx
import { Form, navigate } from 'react-router';
import { useState } from 'react';

export default function ResourceForm({
  initialData,
  isEditing,
  isSubmitting,
}) {
  const [formData, setFormData] = useState(initialData);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleReset() {
    if (isEditing) {
      navigate('/admin');
    } else {
      setFormData(initialData);
    }
  }

  return (
    <Form method="post" className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
          Hours
        </label>
        <input
          id="hours"
          name="hours"
          type="text"
          value={formData.hours}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
          Contact
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          value={formData.contact}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          name="virtual"
          type="checkbox"
          checked={formData.virtual}
          onChange={handleChange}
        />
        Virtual
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          name="openNow"
          type="checkbox"
          checked={formData.openNow}
          onChange={handleChange}
        />
        Open now
      </label>

      <div className="flex gap-2">
        <NavLink
          to="/admin"
          className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          {isEditing ? 'Clear' : 'Reset'}
        </NavLink>

        <button
          type="submit"
          className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : isEditing
              ? 'Update Resource'
              : 'Add Resource'}
        </button>
      </div>
    </Form>
  );
}
```

> NOTE: You will also notice that the 'Reset' button has been reverted to a simple button component that now imperitively navigates to the `admin/` route only if a selected resource has been loaded. Otherwise, the button resets the *create resource* form.

### Step 2: Use `ResourceForm` inside `AdminPage`

Open `src/pages/AdminPage.jsx`.

Import the component:

```jsx
import ResourceForm from '../components/ResourceForm';
```

Derive initial form data from the loader result:

```jsx
const initialFormData = selectedResource
  ? {
      title: selectedResource.title,
      category: selectedResource.category,
      summary: selectedResource.summary,
      location: selectedResource.location,
      hours: selectedResource.hours,
      contact: selectedResource.contact,
      virtual: selectedResource.virtual,
      openNow: selectedResource.openNow,
    }
  : {
      title: '',
      category: '',
      summary: '',
      location: '',
      hours: '',
      contact: '',
      virtual: false,
      openNow: false,
    };
```

Then replace the inline `<Form>` with:

```jsx
<ResourceForm
  key={resourceId ?? 'new'}
  initialData={initialFormData}
  isEditing={Boolean(resourceId)}
  isSubmitting={isSubmitting}
/>
```

The `key` is important.

When the route changes between:

- `/admin`
- `/admin/:resourceId`

React remounts `ResourceForm`, so its local state resets using the new `initialData`.

This gives us:

- route-driven form state
- correctly resetting inputs
- no need to synchronize input values manually after render

## Phase 14: What changed architecturally?

Before data mode:

- routes selected components
- components fetched their own data
- components handled their own submit requests

After data mode:

- routes select components
- routes load data with loaders
- routes handle mutations with actions
- components mainly render data and forms

This is a major architecture shift.

## Phase 15: Validate the finished behavior

Test the following:

1. Visiting `/` loads directory data through a route loader
2. Visiting `/admin` loads the admin page through a route loader
3. Visiting `/admin/:resourceId` loads the selected resource through the loader
4. Submitting the admin form triggers the route action
5. Creating a new resource redirects to `/admin/:newId`
6. Updating a resource keeps the app on that resource route

## Key Concepts Reinforced

- Data mode uses a router object and `RouterProvider`
- `loader` functions fetch route data
- `useLoaderData()` reads the loaded route data
- `action` functions handle route-based mutations
- `<Form>` submits directly to the route action
- Route data and route state can work together cleanly
- Controlled form components may still be useful in data mode when route changes need to reset UI state cleanly

## Assessment

- The app uses `createBrowserRouter()` and `RouterProvider`
- Route data is loaded with loaders
- The admin form submits through a route action
- `useLoaderData()` replaces component-level data fetching
- The route still controls create vs edit mode
- The admin form resets correctly when switching between create mode and edit mode

## Student Exercise

1. Implement an route-level [ErrorBoundary](https://reactrouter.com/how-to/error-boundary#data-mode) to handle errors fetching data.
2. Add a pending message or disabled state for all admin form buttons while submitting.
3. Add simple field validation in the action and return an error response for invalid submissions.
4. Add a success message after saving by reading navigation or location state.

# Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 19 - React Router data mode'
```
3. Push:
```sh
git push origin main
```