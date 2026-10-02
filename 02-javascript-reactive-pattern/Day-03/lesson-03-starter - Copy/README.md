# Lesson 03 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-03`
1. Move into the lesson-03/ directory:
```sh
cd lesson-03
```
2. Install the necessary dependencies:
```sh
npm install
```
or
```sh
npm i
```
3. Run the dev server with the `dev` script:
```sh
npm run dev
```
4. Open the provided development server URL in your browser
5. You should see the **Campus Resource Directory** composed from Web Components.

## Lesson focus

Lesson 02 focused on **composition** (assembling the UI from components).

Lesson 03 introduces the next problem:

- Components need to react to user actions
- Components need a way to communicate
- The UI should update when data changes

In this example, we'll use a simple **reactive pattern** built on events.

### The reactive idea (simple version)

1. Something happens (a user clicks)
2. A component emits an event describing what happened
3. Another component reacts by updating its own view

We are not using frameworks yet. *We're building the mental model that frameworks later formalize.*

## Instructor demo

Add the ability to display a resource's details in the details component when a result item is clicked.

This is intentionally a small, clear example of event-driven UI.

### Target behaviour

- The results list shows multiple resources
- Clicking a result selects that resource
- The details panel updates to show the clicked resource

### What we will build

- `<resource-results>` will dispatch a custom event when a resource is selected
- `<resource-details>` will listen for that event and render the selected resource

## Concepts explored

- Event-driven programming (user action triggers code)
- Custom events (`CustomEvent`)
- Event bubbling and where to listen
- One-way data flow between components
- "Reactive" UI updates (re-render when data changes)

## Event Contract

In this example, we will be explicit about the **event contract** between components.

An event contract defines:

- Who emits the event
- What the event is called
- What data it carries
- Who is allowed to listen and react

Making this explicit helps avoid hidden coupling and confusion as the UI grows.

### Event: `resource-selected`

**Emitted by:**
- `<resource-results>`

**When it fires:**
- A user clicks (or activates) a resource item in the results list

**Purpose:**
- Notify the rest of the application that a specific resource has been selected

**Event configuration:**

- `bubbles: true`
- `composed: true` (recommended since Shadow DOM because implemented)

**Event detail payload:**

```js
{
  resource: {
    id: string,
    title: string,
    category: string,
    summary: string,
    location: string,
    hours: string,
    contact: string,
    virtual: boolean,
    openNow: boolean,
  }
}
```

**Who listens:**

- `main.js` will be used to compose the *connection* between components.

**What the listener does:**

- Extracts `resource` from `event.detail`
- Passes it to `<resource-details>` via a setter such as `details.resource = resource`

### Why this is a good contract

- The results component does not know who is listening
- The details component does not know who emitted the event
- Communication flows in one direction
- Components remain reusable and testable

This same idea scales to filters, pagination, and other interactions that will be explored later in the course.

## Walkthrough

### Step 1: Agree on the data shape

We'll use the same data shape across components.

Example:

```js
{
  id: 'tutoring',
  title: 'Peer Tutoring Centre',
  category: 'Academic',
  summary: 'Drop-in tutoring and study support.',
  location: 'Building W, Room W101',
  hours: 'Mon–Thu 10:00–16:00',
  contact: 'tutoring@nait.ca',
  virtual: false,
  openNow: true,
}
```

### Step 2: Render results from an array

In `<resource-results>`:

- Store an array of resources (hard-coded for this lesson)
- Render the list from that array
- Each list item must identify which resource it represents
   - Put the resource id in a `data-id` attribute on each list item
   - Use event delegation on the list container to capture clicks

### Step 3: Dispatch a custom event when a result is clicked

When a list item is clicked, dispatch a custom event from `<resource-results>`.

Suggested event name:

- `resource-selected`

Suggested detail payload:

- `{ resource }` (include the full object so the receiver can render without having to look up)

Example:

```js
this.dispatchEvent(
  new CustomEvent('resource-selected', {
    detail: { resource },
    bubbles: true,
    composed: true,
  })
);
```

Why `bubbles: true`?

- It allows a parent (or the document) to listen without wiring direct references between components.

Why `composed: true`?

- Since we are using a Shadow DOM in our components, events will need to cross the Shadow DOM boundary.

### Step 4: Listen for the event and update details

In `<resource-details>`:

- Create a `set resource(resource)` setter
- Store the selected resource
- Re-render the details view when it changes

Then, in a place that can see both components (choose one):

Option A (implemented in this example): **Listen in `main.js`**

- Listen for `resource-selected`
- Call `details.resource = resource`

Option B: **Listen inside a parent component** (explored in a later example)

### Step 5: Add a selected state in results

After a click:

- Visually highlight the selected item (use the Bootstrap `active` class)
- Reinforces the idea that UI is reacting to data changes

## Assessing

Minimum requirements:

- Results render from an array of resource objects
- Clicking a result updates the details panel
- Use a custom event (`resource-selected`) to communicate

## Student exercise

Stretch goals:

- Add keyboard support (Enter/Space selects an item)
- Add a "selected id" state inside results
- Add a default state in details ("Select a resource to view details")

## Looking ahead to Lesson 04

Lesson 04 will push the reactive pattern further.

We'll connect:

- `<resource-filters>` (form inputs)
- to `<resource-results>` (rendered list)

The key idea will be:

- Filters emit an event describing the new filter state
- Results reacts by filtering the array and re-rendering

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add .
```
2. Commit:
```sh
git commit -m 'Lesson 03 - Reactive pattern (resource selection)'
```
3. Push:
```sh
git push origin main
```