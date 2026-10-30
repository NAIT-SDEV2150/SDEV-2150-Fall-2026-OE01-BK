# Lesson 18: Dynamic Routes with React Router 7

## Install dependencies and run the dev server

Continue working in the same React + Tailwind + DaisyUI project from Lesson 17.

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

## Start the backend API

Lesson 18 continues using the local backend server.

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
- `GET /resources/:id`
- `POST /resources`
- `PUT /resources/:id`

Keep this server running while you work on the frontend.

## Lesson focus

This lesson introduces **dynamic routes** using **React Router 7**.

We will:

- Add a route parameter to the admin page
- Read route parameters with `useParams`
- Update the URL when a resource is selected for editing
- Load the selected resource into the admin form
- Navigate to the newly created resource after a successful create

This lesson is about **parameterized routes and route-driven UI state**.

## Connecting to prior lessons

In Lesson 17, the app gained:

- Static routes
- A shared router layout using `App.jsx`
- An admin page for listing and editing resources

However, the admin page still relies on internal component state to decide which resource is being edited.

Now we want the URL itself to describe that state.

Examples:

- `/admin` means create a new resource
- `/admin/abc123` means edit the resource with id `abc123`

This makes the app more predictable, bookmarkable, and shareable.

## Phase 1: What is a dynamic route?

A **dynamic route** includes a variable segment in the path.

Example:

```jsx
<Route path="admin/:resourceId" element={<AdminPage />} />
```

In this example:

- `admin` is static
- `:resourceId` is dynamic

React Router will match the URL and provide the parameter value to the component.

## Phase 2: Update the route configuration

Open `main.jsx`.

Update the admin route so that the router supports both:

- `/admin`
- `/admin/:resourceId`

Your route structure should look like this:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<ResourceDirectoryPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="admin/:resourceId" element={<AdminPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

This allows the same page component to handle:

- create mode with no route parameter
- edit mode with a `resourceId` route parameter

## Phase 3: Read the route parameter in `AdminPage`

Open `src/pages/AdminPage.jsx`.

Import the routing hooks:

```jsx
import { useNavigate, useParams } from 'react-router';
```

Inside the component, read the parameter and create a navigate function:

```jsx
const { resourceId } = useParams();
const navigate = useNavigate();
```

Now `resourceId` will contain:

- `undefined` when the URL is `/admin`
- the resource id when the URL is `/admin/:resourceId`

This becomes the source of truth for whether the page is in create mode or edit mode.

## Phase 4: Populate the form based on the route

The admin page already fetches all resources.

Use the route parameter plus the loaded resources list to determine which resource should be edited.

Add this effect:

```jsx
useEffect(() => {
  if (!resourceId) {
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
    return;
  }

  const resource = resources.find((item) => item.id === resourceId);

  if (!resource) return;

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
}, [resourceId, resources]);
```

This creates a route-driven form:

- No parameter means blank form
- A parameter means populate the form with the selected resource

### Note: avoiding the cascading render warning

You will see a warning like this:

> Calling setState synchronously within an effect can trigger cascading renders

there is a cleaner alternative to synchronizing form state inside `useEffect`.

Instead of storing the form state directly in `AdminPage` and updating it in an effect, extract the form into its own component and initialize that form state when the component mounts.

For example:

```jsx
function ResourceForm({ initialData, isEditing, onSubmit, onReset }) {
  const [formData, setFormData] = useState(initialData);

  return (
    <form onSubmit={(e) => onSubmit(e, formData)} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium">Title</label>
        <input
          className="input input-bordered w-full"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          onClick={() => {
            setFormData(initialData);
            onReset();
          }}
        >
          Reset
        </button>

        <button
          type="submit"
          className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          {isEditing ? 'Update Resource' : 'Add Resource'}
        </button>
      </div>
    </form>
  );
}
```

Then render the form from `AdminPage` using a `key` tied to the route parameter:

```jsx
<ResourceForm
  key={resourceId ?? 'new'}
  initialData={initialFormData}
  isEditing={Boolean(resourceId)}
  onSubmit={handleSubmit}
  onReset={() => navigate('/admin')}
/>
```

Because the `key` changes when the route changes, React remounts the form component and its internal state resets automatically.

This avoids the cascading render warning while preserving the same route-driven behaviour.

## Phase 5: Use route navigation instead of local edit state

In Lesson 17, edit mode may have been tracked with local state such as:

```js
const [editingId, setEditingId] = useState(null);
```

For this lesson, the route parameter replaces that state.

Instead of setting `editingId`, clicking a resource should update the URL.

Example:

```jsx
function handleEditStart(resource) {
  navigate(`/admin/${resource.id}`);
}
```

Update the resource list so each item can enter edit mode by navigating:

```jsx
<li
  key={resource.id}
  className="rounded border border-gray-200 p-3 cursor-pointer hover:border-sky-400"
  onClick={() => handleEditStart(resource)}
>
  <p className="font-semibold">{resource.title}</p>
  <p className="text-sm text-base-content/70">{resource.category}</p>
</li>
```

Now the URL updates when a resource is selected.

## Phase 6: Update the submit handler for create vs edit

We still want the same form to support both create and update behaviour.

The difference is that edit mode is now determined by `resourceId`.

Update the submit handler:

```jsx
async function handleSubmit(e) {
  e.preventDefault();

  const isEditing = Boolean(resourceId);
  const url = isEditing
    ? `http://localhost:3000/resources/${resourceId}`
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

  const savedResource = await res.json();
  await refetch();

  navigate(`/admin/${savedResource.id}`);
}
```

Important behaviour:

- Updating a resource keeps the page on that resource route
- Creating a new resource redirects to the new resource route

This means the URL always reflects the resource shown in the form.

## Phase 7: Add a route-aware cancel or reset action

Add a way to return to create mode.

For example:

```jsx
<button
  type="button"
  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
  onClick={() => navigate('/admin')}
>
  New Resource
</button>
```

This button clears edit mode by navigating back to `/admin`.

Because the route changes, the form reset effect will run automatically.

## Phase 8: Update headings and labels based on the route

Use the route parameter to make the UI clearer.

Examples:

```jsx
const isEditing = Boolean(resourceId);
```

Then render route-aware labels:

```jsx
<h1 className="text-2xl font-bold">
  {isEditing ? 'Edit Resource' : 'Add Resource'}
</h1>
```

```jsx
<button
  type="submit"
  className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
>
  {isEditing ? 'Update Resource' : 'Add Resource'}
</button>
```

This makes the route state visible to the user.

## Phase 9: Optional single-resource fetch discussion

Right now, we derive the selected resource from the full resources list.

That is completely valid for this lesson because:

- the list is already loaded
- it keeps the example simpler
- it reinforces route parameters without adding another fetch path

In more complex apps, a dynamic route may trigger its own fetch like:

- `GET /resources/:id`

We are not doing that yet.

## Phase 10: Validate the finished behaviour

Test the following:

1. Visiting `/admin` shows a blank create form
2. Visiting `/admin/:resourceId` loads that resource into the form
3. Clicking a resource in the list updates the route
4. Updating a resource keeps the app on that resource route
5. Creating a new resource navigates to the new resource route
6. Clicking the “New Resource” button returns to `/admin`

## Key Concepts Reinforced

- Dynamic routes use path parameters
- `useParams` reads route parameter values
- `useNavigate` changes routes programmatically
- The URL can act as application state
- Route-driven UI is often cleaner than local coordination state

## Assessment

- The app supports both `/admin` and `/admin/:resourceId`
- The admin form loads an existing resource based on the route
- Clicking a resource updates the route
- Creating a resource navigates to the new resource route
- The admin page clearly distinguishes create mode from edit mode

## Student Exercise

1. Add a small “Currently editing” message that shows the current resource title.
2. Add visual styling to the selected resource in the admin list when its id matches `resourceId`.
3. Add a validation message if a required field is empty before submit.

# Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 18 - dynamic routes for admin editing'
```
3. Push:
```sh
git push origin main
```