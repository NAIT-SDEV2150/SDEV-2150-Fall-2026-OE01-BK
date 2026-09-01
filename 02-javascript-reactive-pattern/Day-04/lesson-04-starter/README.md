# Lesson 04 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-04`
1. Move into the lesson-04/ directory:
```sh
cd lesson-04
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

In this lesson we build an event-driven, reactive UI using Web Components.

We'll implement two connected behaviours:

- **Selection reactivity:** clicking a result updates the details panel (lesson 03)
- **Filtering reactivity:** submitting the filters form updates the results list (current lesson)

The core pattern is consistent:

1. A user action happens
2. A component emits a custom event describing what changed
3. Another part of the app reacts by updating state and re-rendering

We are still not using a framework. We're practicing the mental model that frameworks later formalize.

## Instructor demo

### Target behaviour

- The filters form is submitted
- Filter state is emitted as a custom event
- The results list updates to reflect the new filter state
- Selection behaviour continues to work

We'll use submit-based filtering for clarity (live filtering is a stretch goal).

## Concepts explored

- Event-driven programming (user actions trigger code)
- Custom events (`CustomEvent`)
- Event bubbling and event composition (`bubbles`, `composed`)
- One-way data flow between components
- Reactive UI updates (state changes trigger re-render)
- Shadow DOM communication (events crossing the boundary)

## Event Contract

We will be explicit about the event contract between components.

An event contract defines:

- Who emits the event
- What the event is called
- What data it carries
- Who is allowed to listen and react

### Event: `resource-filters-changed`

**Emitted by:**
- `<resource-filters>`

**When it fires:**
- The filters form is submitted

**Purpose:**
- Describe the current filter state to the rest of the application

**Event configuration:**

- `bubbles: true`
- `composed: true`

**Event detail payload:**

```js
{
  query: string,
  category: string | null,
  openNow: boolean,
  virtual: boolean
}
```

**Who listens:**

- `main.js`

**What the listener does:**

- Passes the filter state to `<resource-results>` via a method or propety such as `setFilters(filters)` or `set filters(filters)`.

## Walkthrough

### Step 1: Agree on the data shape

We'll use the same data shape across components.

Example:

```js
{
  query: 'tutor',
  category: 'academic',
  openNow: true,
  virtual: true,
}
```

### Step 2: Dispatch `resource-filters-changed` on form submit

In `<resource-filters>`:

- Default to "All" category
- Support individual category selection (assign class `active` to selected category)
- Listen for the form `submit` event and `preventDefault()`
- Read current form values
- Dispatch `resource-filters-changed` with the full filter state

### Step 3: Results react to filter state

In `<resource-results>`:

- Store the full dataset
- Store current filters
- Add a method or property, such as `setFilters(filters)` or `set filters(filters)`
- Filter the dataset (without mutating the original)
- Re-render the list based on the filtered results

### Step 4: Wire filters to results in `main.js`

In `main.js`:

- Listen for `resource-filters-changed`
- Call `results.setFilters(filters)`, or set `results.filters = filters`

### Step 5: Verify reactive behaviour

- Submitting the form changes which results are displayed
- Selecting a result still updates the details panel
- The UI reflects current state at all times

## Assessment

Minimum requirements:

- Submitting the filters form dispatches `resource-filters-changed`
- Results update based on emitted filter state
- The original resource dataset is not mutated

## Student exercise

Stretch goals:

- Implement filter form reset
- Implement live filtering by dispatching `resource-filters-changed` on input/change events
- Update the example to support multiple category selections
- Debounce the search input to reduce unnecessary re-renders (applies to live filtering)

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add .
```
2. Commit:
```sh
git commit -m 'Lesson 04 - Reactive filtering'
```
3. Push:
```sh
git push origin main
```