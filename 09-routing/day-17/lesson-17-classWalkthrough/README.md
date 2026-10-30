# Lesson 17: Static Routing with React Router 7

## Install dependencies and run the dev server

Continue working in the same React + Tailwind + DaisyUI project from Lesson 16.

1. Move into the frontend directory:
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

---

## Start the backend API

Lesson 17 continues using the local backend server.

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

We will continue using:

- `GET /resources`
- `POST /resources`
- `PUT /resources/:id`

Keep this server running while you work on the frontend.

---

## Lesson focus

This lesson introduces **static routing** using **React Router 7**.

We will:

- Add routing to the existing NAIT Student Resources example
- Turn the current resource directory page into the **index route**
- Add a second **admin route**
- Build shared navigation between pages
- Create a simple admin page for listing, creating, and updating resources

This lesson is about **structure and navigation**, not advanced route loaders or nested data APIs.

---

## Connecting to prior lessons

So far, the app behaves like a single page with one main screen.

It already includes:

- Fetching resources from the backend
- Selecting a resource
- Rendering details
- Persisting selected resource

Now we want to organize the app into two static pages:

1. A public-facing resource directory page
2. An admin page for managing resources

---

## Phase 1: Install React Router 7

Install React Router:

```sh
npm install react-router
```

We are using React Router 7 for static route configuration inside the client app.

---

## Phase 2: Create route-level page components

Create a new folder:

```text
src/pages/
```

Create these files:

```text
src/pages/ResourceDirectoryPage.jsx
src/pages/AdminPage.jsx
```

### ResourceDirectoryPage

This page should render the existing UI for:

- Filters
- Results
- Details

It will use the same hooks and props you already have in the app. For now, create a simple placeholder component:

```js
// src/pages/ResourceDirectoryPage.jsx
export default ResourceDirectoryPage = () => {
  return (
    <h1>Resource Directory Page</h1>
  );
};

```
### AdminPage

Create a basic admin page that will:

- Display all resources in a list
- Contain a form for creating a resource
- Allow editing an existing resource

For now, keep the layout simple and create a placeholder component:

```jsx
// src/pages/AdminPage.jsx
export default AdminPage = () => {
  return (
    <h1>Admin Page</h1>
  );
};
```

---

## Phase 3: Use the existing layout component

The project already includes a layout component:

```text
src/components/layout/PageLayout.jsx
```

We will continue using this component rather than creating a new layout.

In this routing setup:

- `PageLayout` controls the visual layout of the page
- `Header` will contain the navigation links
- `Outlet` renders whichever page matches the current route

Instead of introducing a new layout component, we will update **App.jsx** so it becomes the router layout wrapper.

Open **src/App.jsx** and update it so that it renders `PageLayout` and an `Outlet`:

> NOTE: you may want to copy the "guts" of the PageLayout component into an empty file to save for use later on.

```jsx
// src/App.jsx
import { Outlet } from 'react-router';

import Header from './components/Header';
import PageLayout from './components/layout/PageLayout';

export default function App() {
  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <Outlet />
    </PageLayout>
  );
}
```

Navigation will live inside **Header.jsx**, not inside **App.jsx** or **PageLayout.jsx**. In the next step after updating `App.jsx`, you will update **Header.jsx** to add the `NavLink` components for the directory and admin routes.

#### Update the Header component with navigation

Open `src/components/Header.jsx` and update it to include navigation links using `NavLink` from React Router.

`NavLink` works like a normal link, but it also knows when the current route matches its `to` path. This allows us to style the active navigation item.

Update the component as follows:

```jsx
// src/components/Header.jsx
import { NavLink } from 'react-router';

export default function Header({ tagline }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h1 className="text-xl font-semibold text-sky-600">NAIT Resource Directory</h1>
        <p className="text-sm text-gray-500">
          {tagline ? tagline : 'Find student support services, labs, and campus resources.'}
        </p>
      </div>

      <nav className="flex gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `btn btn-sm cursor-pointer btn-ghost text-xs ${isActive ? 'text-sky-700' : 'hover:text-sky-700'}`
          }
        >
          Directory
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `btn btn-sm cursor-pointer btn-ghost text-xs ${isActive ? 'text-sky-700' : 'hover:text-sky-700'}`
          }
        >
          Admin
        </NavLink>
      </nav>
    </div>
  );
}
```

This adds navigation to both routes:

- **Directory** --> `/`
- **Admin** --> `/admin`

The `isActive` value provided by `NavLink` allows the current page to be visually highlighted.

Key idea:

- `App.jsx` becomes the **router layout**
- `PageLayout` remains the **visual layout component**
- `Outlet` renders the current page
- `Header.jsx` becomes the shared navigation UI

---

## Phase 4: Configure routes in `main.jsx`

Replace the existing root render with a component-based router setup.

Example:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';

import App from './App.jsx';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage';
import AdminPage from './pages/AdminPage';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ResourceDirectoryPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
```

Important ideas:

- `/` becomes the **index route**
- `/admin` becomes the second static route
- `<Routes>` contains the route tree
- `<Route>` components define the hierarchy
- `App.jsx` acts as the router layout
- `Outlet` renders the current page inside the layout

---

## Phase 5: Move existing directory logic into the index route

> Note: you may have already moved all the required code for this file in a previous step with your instructor.

Open `ResourceDirectoryPage.jsx`.

Move the current app-level directory UI into this page.

This page should still use:

- `useResources()`
- `useSelectedResource()`
- loading and error UI
- the existing Filters / Results / Details composition

At the end of this step:

- The directory should work exactly as before
- It now renders at `/`

```jsx
// src/pages/ResourceDirectoryPage.jsx
import { useState } from 'react';
import { useResources } from '../hooks/useResources';
import { useSelectedResource } from '../hooks/useSelectedResource';

import Filters from '../components/Filters';
import Results from '../components/Results';
import Details from '../components/Details';

export default function ResourceDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [selectedResource, setSelectedResource] = useSelectedResource();
  const [virtualOnly, setVirtualOnly] = useState(false);

  const { resources, isLoading, error, refetch } = useResources();

  return (
    <>
      {/* The following is not great for UX/UI, but it gets the point across. Feel free to style
      the loading and error states in "nicer" way. */}
      {isLoading && (
        <div className="text-sm text-base-content/70">Loading resources...</div>
      )}
      {error && (
        <div className="alert alert-error">
          <div>
            <p className="font-semibold">Could not load resources</p>
            <p className="text-sm opacity-80">{error.message}</p>
            <button className="btn btn-sm mt-2" onClick={refetch}>Try again</button>
          </div>
        </div>
      )}
      <aside className="md:col-span-3 lg:col-span-1">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategories={selectedCategories}
          onCategoryToggle={setSelectedCategories}
          openNowOnly={openNowOnly}
          onOpenNowChange={setOpenNowOnly}
          virtualOnly={virtualOnly}
          onVirtualOnlyChange={setVirtualOnly}
        />
      </aside>
      <section className="md:col-span-2 lg:col-span-1">
        <Results
          resources={resources}
          selectedResource={selectedResource}
          onSelectResource={setSelectedResource}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          openNowOnly={openNowOnly}
          virtualOnly={virtualOnly}
        />
      </section>
      <aside className="md:col-span-1 lg:col-span-1">
        {selectedResource ? (
          <Details resource={selectedResource} />
        ) : (
          <div className="text-sm text-base-content/70">
            Select a resource to view details.
          </div>
        )}
      </aside>
    </>
  );
}
```

---

## Phase 6: Build the admin page shell

Open `AdminPage.jsx`.

Start with a simple page structure:

```jsx
import { useResources } from '../hooks/useResources';

export default function AdminPage() {
  const { resources, isLoading, error, refetch } = useResources();

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      {isLoading && <p>Loading resources...</p>}

      {error && (
        <div className="alert alert-error">
          <span>{error.message}</span>
          <button className="btn btn-sm" onClick={refetch}>Try again</button>
        </div>
      )}

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.id} className="rounded border border-gray-200 p-3">
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
}
```

This gives us the admin route and a live list from the backend.

---

## Phase 7: Add create-resource form

In `AdminPage.jsx`, add local form state:

```js
// Set some default values for testing
const [formData, setFormData] = useState({
  title: 'Study Group',
  category: 'Wellness',
  summary: 'Some summary of the resource.',
  location: 'NAIT Campus',
  hours: 'Mon-Fri 08:00-13:00',
  contact: 'study@nait.ca',
  virtual: false,
  openNow: false,
});
```

Add a simple controlled form for creating a resource.

For example:

```jsx
// Add this section just above the existing current resources section
<section className="md:col-span-3 lg:col-span-3">
  <Card title="Resource Form">
    <div className="card-body">
      <form onSubmit={handleCreateResource} id="frm-add-resource" className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="q" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            id="q"
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Resource title"
          />
        </div>

        <hr className="border-gray-200" />

        <div className="flex gap-2">
          <button
            type="reset"
            className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            onClick={() => setFormData({
              title: '',
              category: '',
              summary: '',
              location: '',
              hours: '',
              contact: '',
              virtual: false,
              openNow: false,
            })}
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Add Resource
          </button>
        </div>
      </form>
    </div>
  </Card>
</section>
```

Add a submit handler:

```js
async function handleCreateResource(e) {
  e.preventDefault();

  const res = await fetch('http://localhost:3000/resources', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error('Could not create resource');
  }

  refetch();
}
```

For this lesson, simple inline handling is fine.

The key idea is that the admin route now performs **write operations**.

> ### Student Exercise
> Implement the remaining form fields for the resource field.

---

## Phase 8: Validate the finished routes

Test the following:

1. Visiting `/` shows the directory page
2. Visiting `/admin` shows the admin page
3. Navigation links switch between pages
4. The directory still fetches and renders resources
5. The admin page lists resources
6. You can create a new resource

---

## Key Concepts Reinforced

- React Router 7 can define static route structure using `<BrowserRouter>`, `<Routes>`, and `<Route>`
- `Outlet` allows the router layout (`App.jsx`) to render different page components
- `NavLink` helps with route-aware navigation
- Route components help separate concerns
- Static routing gives structure before deeper routing features are introduced

---

## Assessment

- The app uses React Router 7
- The existing resource directory is now the index route
- An admin route exists at `/admin`
- Shared layout and navigation are working
- The admin page lists resources and supports create/update operations

---

## Student Exercise
1. Add the functionality to the AdminPage for a user to update existing resources

    **Add update-resource behaviour**

    Keep updating simple.

    Approach:

    - Click an existing resource in the admin list
    - Populate the same form with its values
    - Track which resource is being edited
    - Submit with `PUT /resources/:id` instead of `POST /resources`

    Add editing state:

    ```js
    const [editingId, setEditingId] = useState(null);
    ```

    When a list item is clicked:

    ```js
    function handleEditStart(resource) {
      setEditingId(resource.id);
      setFormData({
        title: resource.title,
        category: resource.category,
        summary: resource.summary,
        location: resource.location,
        hours: resource.hours,
        contact: resource.contact,
        virtual: resource.virtual,
        openNow: resource.openNow,
      });
    }
    ```

    Now update the submit handler:

    ```js
    async function handleSubmit(e) {
      e.preventDefault();

      const isEditing = editingId !== null;
      const url = isEditing
        ? `http://localhost:3000/resources/${editingId}`
        : 'http://localhost:3000/resources';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Could not ${isEditing ? 'update' : 'create'} resource`);
      }

      setEditingId(null);
      setFormData({
        title: '',
        category: '',
        summary: '',
        location: '',
        hours: '',
        contact: '',
        virtual: false,
        openNow: false,
      });

      refetch();
    }
    ```

    At this point:

    - New resources can be created
    - Existing resources can be edited
    - The list refreshes after changes

2. Update the `useResources` hook to include return a `addResource` function to the returned object. 
3. Add a cancel button when editing that resets the form and clears `editingId`.
4. Add a small success message after creating or updating a resource.
5. Add a count of total resources at the top of the admin page.
6. Add admin form validation on the inputs.

---

# Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 17 - static routing with admin page'
```
3. Push:
```sh
git push origin main
```