# Lesson 12 Starter

## Install dependencies and run the dev server

In this lesson, you will continue working in the **same React + Tailwind + DaisyUI project** from Lesson 11.

1. Move into your existing project directory:
```sh
cd lesson-11
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

This lesson introduces **event handling and state management in React**.

You will:

- Handle user interactions (click, change events)
- Use the `useState` hook
- Build controlled form inputs
- Update UI reactively based on state

All work will build directly on the existing Resource Directory example.

## Connecting to prior lessons

So far, the UI:

- Has structured layout
- Uses Tailwind for styling
- Uses DaisyUI for consistent components

However, it is still mostly **static**. In this walthrough, we will make the UI **interactive**.

# Phase 1: Import and use `useState`

Open your `Filters` component.

At the top of the file, import `useState`:

```jsx
import { useState } from 'react';
```

This hook allows us to store and update component state.

## Phase 2: Controlled text input

Convert the search input into a **controlled component**.

### Step 1: Add state

```jsx
const [searchTerm, setSearchTerm] = useState('');
```

### Step 2: Bind the input

```jsx
<input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="input input-bordered w-full"
  placeholder="Search resources..."
/>
```

### Step 3: Confirm reactivity

Add a temporary preview below the input:

```jsx
<p className="text-sm text-base-content/70">
  Searching for: {searchTerm}
</p>
```

Observe how typing updates the UI immediately.

> **Note:** you may have noticed that prior to controlling the input, the value was already being "rendered" in the input text field, like you would expect. What was not happening, however, was the component rerendering the input as a result of state change. So, you may be wondering, "Why even add state if the outcome is the same?" The short answer is that the outcome *is not the same*. Prior to adding state to the input, we had not simple way of capturing the field's value. Since we're not working in the DOM, there's no way to `document.querySelector()` (or other similar approach) to access the input. Now, with state, we always have a direct reference to teh fields's value that can be used in whatever way we wish.
>
> You can read more about uncontrolled and controlled inputs here: https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form.

## Phase 3: Category button multi-selection

Allow users to select a category (or multiple categories) and reflect that selection visually.

### Step 1: Add state

```jsx
const [selectedCategories, setSelectedCategories] = useState([]);

function toggleCategory(category) {
  setSelectedCategories((prev) => {
    if (prev.includes(category)) {
      return prev.filter((c) => c !== category);
    }

    return [...prev, category];
  });
}
```

### Step 2: Update button handlers

Example button:

```jsx
<button
  ...
  className={`${selectedCategories.includes(label) && 'bg-sky-600 text-white'} ... `}
  onClick={() => toggleCategory(label)}
>
  {label}
</button>
```

What to notice:

- Clicking updates the state
- State is used to determine styling
- There is no direct DOM manipulation required
- Users can select multiple categories

React re-renders automatically when the state is changed

## Phase 4: Controlled checkbox

Track boolean state using a checkbox.

### Step 1: Add state

```jsx
const [openNowOnly, setOpenNowOnly] = useState(false);
```

### Step 2: Bind checkbox

```jsx
<input
  type="checkbox"
  className="checkbox"
  checked={openNowOnly}
  onChange={(e) => setOpenNowOnly(e.target.checked)}
/>
```

Add a small preview message if helpful:

```jsx
<p className="text-sm">
  Open now only: {openNowOnly ? 'Yes' : 'No'}
</p>
```

## Phase 5: State recap inside Filters

At this point, the `Filters` component manages:

- A string (`searchTerm`)
- An array of strings (`selectedCategories`)
- A boolean (`openNowOnly`)

All UI changes are driven by state.

> **Note:** We are not yet applying this state to filter the results. That will come in the next lesson when we discuss **lifting state and shared data flow**.

## Phase 6: Handling form submission

In previous courses, you handled form submission using JavaScript and `addEventListener`. In React, form handling follows the same idea, but we attach the handler directly in JSX.

Override the form’s default submit behavior.

### Step 1: Add a submit handler

Inside the `Filters` component, add:

```jsx
function handleSubmit(e) {
  e.preventDefault();
  console.log('Filters submitted');
}
```

### Step 2: Attach it to the form

Locate the `<form>` element inside `Filters` and update it:

```jsx
<form onSubmit={handleSubmit}>
```

Now, when the form is submitted (for example, by clicking a submit button), the page will no longer reload.

Instead, you should see the message printed in the browser console.

This reinforces:

- React uses the same event model you’ve seen before
- We prevent default browser behavior explicitly
- Event handlers in React are attached declaratively

We will connect this submit action to actual filtering logic in a future lesson.

## Key Concepts Reinforced

- React events are synthetic and cross-browser
- `useState` stores reactive values
- State updates trigger re-renders
- UI should derive from state, not manual DOM updates

## Assessment

- Inputs are fully controlled
- Buttons update state and styling correctly
- Checkbox reflects boolean state
- Selected result highlights properly
- No direct DOM manipulation is used

---

## Student Exercise: Clear Selected Filters

Add a handler for the reset button that will return the filters to their original state.

## Student Exercise: Selected Resource State

Track which resource has been selected when a user clicks it.

### Step 1: Add state

Start by defining a new piece of state inside the `Results` component. This state should track the currently selected resource. Initially, no resource should be selected.

<details>
<summary>Show solution</summary>

```jsx
const [selectedResource, setSelectedResource] = useState(null);
```

</details>

### Step 2: Add click handler to result item

Next, attach a click handler to each rendered result item. When a result is clicked, update the state to store the clicked resource.

<details>
<summary>Show solution</summary>

```jsx
onClick={() => setSelectedResource(resource)}
```

</details>

### Step 3: Highlight selected item

Use conditional class logic to visually distinguish the selected resource. Compare each resource’s id to the currently selected resource’s id.

<details>
<summary>Show solution</summary>

```jsx
className={`card cursor-pointer ${
  selectedResource?.id === resource.id ? 'border-primary border-2' : ''
}`}
```

</details>

### Step 4: Conditional preview (optional)

Optionally, render a small preview below the list to confirm which resource is currently selected. Only render this element if a resource has been selected.

<details>
<summary>Show solution</summary>

```jsx
{selectedResource && (
  <p className="text-sm mt-2">
    Selected: {selectedResource.name}
  </p>
)}
```

</details>

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 12 - event handling and state'
```
3. Push:
```sh
git push origin main
```