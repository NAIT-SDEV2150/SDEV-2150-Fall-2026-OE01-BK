# Lesson 05 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-05`
1. Move into the lesson-05/ directory:
```sh
cd lesson-05
```
2. Install the necessary dependencies:
```sh
npm install
```
or
```sh
npm i
```
3. Start the backend API server (in a separate terminal):
```sh
cd backend
npm install
npm start
```
4. Start the front-end dev server:
```sh
npm run dev
```
5. Open the provided development server URL in your browser
6. You should see the **NAIT Resource Directory** loading data from the hard-coded results.

---

## Lesson focus

In this lesson, we introduce **asynchronous JavaScript** and the **fetch API**.

We will extend the reactive, component-based application built in previous lessons so that:

- Data is loaded asynchronously from a backend API
- The UI renders after data is fetched
- Components react to data arriving over time

We are still not using a framework. The goal is to understand the mental model that frameworks later abstract.

---

## Backend overview [[backend/README.md](backend/README.md)]

A local backend server is included for this example.

- Base URL: `http://localhost:3000`
- Resource endpoint: `GET /resources`
- Data shape matches the resource objects used in previous lessons

You do **not** need to modify the backend.

---

## Strategy

We will approach async data loading in two stages.

1. **Stage 1:** Fetch data in `main.js` and pass it into components
2. **Stage 2:** Move fetching responsibility into the component using a `source` attribute

This allows us to compare two common architectural patterns.

---

## Stage 1: Fetch and coordinate data in `main.js` (app shell/container approach)

### Why start here

Fetching in `main.js` makes the async flow very explicit:

- The application starts
- A network request is made
- Data arrives
- Components are updated

This is the easiest place to reason about `async` and `await`.

---

### Step 1: Fetch resources on page load

In `main.js`:

- Use `fetch()` to request `http://localhost:3000/resources`
- Await the response
- Parse the response as JSON

Example structure:

```js
const response = await fetch('http://localhost:3000/resources');
const data = await response.json();
```

---

### Step 2: Handle async states explicitly

Before updating components, consider:

- What happens while data is loading?
- What happens if the request fails?

For now, we will focus on the **happy path**, but note where loading and error handling could be added.

---

### Step 3: Pass fetched data into components

Once data is available:

- Pass the array of resources into `<resource-results>`
- Existing selection and filtering behaviour should continue to work

> Components render based on data, ***regardless of where the data comes from***.

---

## Stage 2: Fetching inside the component with a `source` attribute

Now that we understand async data flow, we refactor toward a more reusable design.

---

### Setting a `source` attribute

We add a `source` attribute to the results component:

```html
<resource-results source="http://localhost:3000/resources"></resource-results>
```

When the `source` attribute is set:

- The component fetches data from the provided URL
- The component manages its own loading and error states
- The component renders when data arrives

---

### Why use a `source` attribute

This approach:

- Makes the component reusable in different contexts
- Separates *where data comes from* from *how it is rendered*
- Introduces attribute-driven reactivity

Changing the attribute changes the data.

---

### Implementing attribute-driven fetch

In `<resource-results>`:

- Observe the `source` attribute
- When it changes, fetch from the new URL
- Avoid refetching if the value has not changed

This introduces a new reactive pattern:

> Attribute change -> async side effect -> state update -> render

---

## Comparing the two approaches

### Fetch in `main.js`

Pros:
- Very explicit data flow
- Easy to debug
- Clear separation of concerns early in the course

Cons:
- `main.js` can grow large over time
- Components depend on external coordination

---

### Fetch inside the component (`source` attribute)

Pros:
- Highly reusable components
- Encapsulated loading and error handling
- Cleaner application bootstrap

Cons:
- More complex component logic
- Requires careful handling of async lifecycle

Both approaches are valid. The choice depends on scale and reuse needs.

---

## Assessment

- Fetch resources from the backend API
- Render fetched resources in `<resource-results>`
- Ensure selection and filtering still work

## Student exercise

Stretch goals:

- Add a loading state to the results component
- Add basic error handling for failed requests to the results component

---

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 05 - Fetch and async data loading'
```
3. Push:
```sh
git push origin main
```