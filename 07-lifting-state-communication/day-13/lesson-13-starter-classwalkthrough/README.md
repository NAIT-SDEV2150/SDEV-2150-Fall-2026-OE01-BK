# Lesson 13: Lifting State, Conditional Rendering, and Forms

## Install dependencies and run the dev server

Continue working in the same React + Tailwind + DaisyUI project from Lesson 12.

1. Move into your existing project directory:
```sh
cd lesson-12
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

This lesson connects three core ideas:

- Working with forms (submission + simple validation)
- Conditional rendering
- Lifting state to share data between components

We will extend the existing **Filters**, **Results**, and **Details** components in the NAIT Student Resources project.

## Connecting to prior lessons

In Lesson 12, we added local state:

- `searchTerm`, `selectedCategories`, and `openNowOnly` inside **Filters**
- `selectedResource` inside **Results**

Each component owns its own state.

But now we want:

- Filters to affect Results
- Selecting a result to affect Details

To do that, we need **shared state**.

# Phase 1: Identify Shared State

Ask:

- Who needs the filter values?
- Who needs the selected resource?

Currently:

- Filters owns filter state
- Results owns selected resource state

However:

- Results needs filter state
- Details needs selected resource

That means this state must move up to their **nearest common ancestor**.

# Phase 2: Lift State to the Parent (App)

Open `App.jsx` (or your top-level layout component).

Add shared state:

```jsx
// App.jsx
...
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategories, setSelectedCategories] = useState([]);
const [openNowOnly, setOpenNowOnly] = useState(false);
const [selectedResource, setSelectedResource] = useState(null);
...
```

The parent now owns all shared state.

# Phase 3: Update Filters to Use Props

Update how `Filters` is rendered:

```jsx
// App.jsx
<Filters
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  selectedCategories={selectedCategories}
  onCategoryToggle={setSelectedCategories}
  openNowOnly={openNowOnly}
  onOpenNowChange={setOpenNowOnly}
/>
```

Inside `Filters`:

- Remove local `useState`
- Use props instead (add the necessary props based on what we passed above)

Example controlled input:

```jsx
// Filters.jsx
<input
  value={searchTerm}
  onChange={(e) => onSearchChange(e.target.value)}
/>
```

For category toggling, implement toggle logic in the parent or pass a toggle handler.

The key idea:

Filters no longer owns state. It receives state and notifies the parent.

# Phase 4: Update Results to Use Lifted State

Render Results like this:

```jsx
// App.jsx
<Results
  selectedResource={selectedResource}
  onSelectResource={setSelectedResource}
  searchTerm={searchTerm}
  selectedCategories={selectedCategories}
  openNowOnly={openNowOnly}
/>
```

Inside `Results`:

- Replace local selected state
- Use props instead (add the necessary props based on what we passed above)

```jsx
// Results.jsx
...
onClick={() => onSelectResource(resource)}
...
```

Results now:

- Receives filter values
- Receives selected resource
- Notifies parent when a resource is selected

# Phase 5: Conditional Rendering in Details

Update how `Details` is rendered in the parent:

```jsx
// App.jsx
{selectedResource ? (
  <Details resource={selectedResource} />
) : (
  <div className="text-sm text-base-content/70">
    Select a resource to view details.
  </div>
)}
```

The resource is now passed as a prop. Update the `Details` component to make use of the prop for rendering.

This demonstrates:

- Conditional rendering using a ternary
- Rendering based entirely on state

No manual DOM updates.

# Phase 6: Simple Form Validation

Return to the `Filters` component.

Update the submit handler:

```jsx
function handleSubmit(e) {
  e.preventDefault();

  if (!searchTerm.trim() && selectedCategories.length === 0 && !openNowOnly) {
    alert('Please select at least one filter option.');
    return;
  }

  console.log('Filters submitted');
}
```

Attach it:

```jsx
<form onSubmit={handleSubmit}>
```

We are still not filtering the data yet.

> **Discussion:** Is there still a need for the "Fileter" submit button? All components are reactive to state changes, so filtering happens without submitting the form.

This step reinforces:

- Forms still use `preventDefault()`
- Validation logic is just JavaScript
- State is accessible through props

# Phase 7: Single Source of Truth

Now, `App` owns:

- Filter state
- Selected resource state

Child components:

- Receive data via props
- Send events upward via callbacks

Data flows down.
Events flow up.

This is lifting state.

# Key Concepts Reinforced

- Shared state lives in the nearest common ancestor
- Child components should be as stateless as possible
- Conditional rendering is just rendering based on state
- Forms behave the same in React, just declaratively

# Assessment

- Filters no longer owns shared state
- Results no longer owns selected resource state
- App coordinates state across components
- Details renders conditionally
- Form submission includes validation

## Student exercise

- Move the conditional rendering for no resource selected into `Details` (i.e. display a "No resource selected" message in the `Details` component, not in `App.jsx`).
- Implement the virtual options filter
- Implement the filtering of the results using the passed props in `Results`.

# Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 13 - lifting state and shared communication'
```
3. Push:
```sh
git push origin main
```