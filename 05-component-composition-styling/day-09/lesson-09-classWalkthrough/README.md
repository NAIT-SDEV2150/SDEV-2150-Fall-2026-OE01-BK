# Lesson 09 Starter

## Install dependencies and run the dev server

In this lesson, we continue working in the same React + Tailwind project from Lesson 08.

0. Extract the starter zip and rename the folder to `lesson-09`
1. Move into the lesson-09/ directory:
```sh
cd lesson-09
```
2. Install dependencies:
```sh
npm install
```
3. Start the dev server:
```sh
npm run dev
```
4. Open the provided dev server URL in your browser

## Lesson focus

This lesson explores **component composition** as a strategy for building scalable and maintainable React applications.

You will practice:

- Designing reusable presentational components
- Separating container components from presentational components
- Composing multiple small components into larger UI structures
- Passing data through props intentionally and clearly

The emphasis is on **structure and responsibility**, not new syntax.

## Connecting to prior lessons

In Lesson 08, we introduced:

- Props as component inputs
- `children` as a way to slot content
- Composition at a small scale (`Results` --> `ResultsItem`)

In this lesson, we zoom out and apply composition more deliberately across the UI.

## Strategy

We will refactor the existing UI to introduce **clear composition layers**.

Our approach:

1. Identify repeated layout and styling patterns
2. Extract reusable **presentational components**
3. Introduce **container components** that coordinate data and structure
4. Compose the full UI from these smaller pieces

## Phase 1: Identify presentational vs. container responsibilities

Before writing code, pause and identify responsibilities:

### Presentational components

- Focus on *how things look*
- Receive data via props
- Do not own data sources

Examples in our app:

- `ResultsItem`
- `Filters` UI markup
- `ResourceDetails` display

### Container components

- Focus on *how things are assembled*
- Decide which components render
- Pass data down via props

Examples in our app:

- `Results`
- `App`

## Phase 2: Extract a reusable `Card` component

Create a new folder:

- `src/components/ui/`

Add a new file:

- `src/components/ui/Card.jsx`

This component will:

- Accept a `title` prop
- Render `children` inside a styled container
- Encapsulate common layout and Tailwind styles

Start with:

```jsx
export default function Card({ title, children }) {
  return (
    <section className="h-full rounded border border-gray-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="leading-relaxed font-bold text-sm text-gray-900">{title}</h2>
      </header>
      <div>
        {children}
      </div>
    </section>
  );
}
```

What to notice:

- The component is purely presentational
- Styling lives in one place
- `children` makes the component flexible

## Phase 3: Refactor existing components to use Card

Update the following components:

- `Results.jsx`
- `Filters.jsx`
- `Details.jsx`

Wrap their existing markup with `<Card>` instead of duplicating layout styles.

For example, in `Results.jsx`:

```jsx
import Card from './ui/Card';

<Card title="Results">
  {/* existing Results markup */}
</Card>
```

This reduces duplication and makes layout changes easier.

## Phase 4: Clarify container vs. presentational roles

Revisit `Results.jsx` and `ResultsItem.jsx`:

- `Results` acts as a **container**
  - imports data
  - maps over resources
  - decides which items render

- `ResultsItem` acts as a **presentational component**
  - receives props
  - renders markup
  - does not know where data comes from

This separation improves readability and reuse.

## Phase 5: Compose the page intentionally

In this phase, we refactor `App.jsx` so it acts clearly as a **container component**.

Rather than managing layout details directly, `App` will delegate layout responsibilities to a presentational component.

### Introduce a `PageLayout` component

Create a new file:

- `src/components/layout/PageLayout.jsx`

This component will:

- Define the overall page layout and grid structure
- Accept named props for different regions of the page
- Render those regions using composition

Start with the following:

```jsx
export default function PageLayout({ header, left, middle, right }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4">
        {header}
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3">
        <aside>{left}</aside>
        <section className="md:col-span-2">{middle}</section>
        <aside>{right}</aside>
      </main>
    </div>
  );
}
```

What to notice:

- PageLayout is purely presentational
- Layout and grid concerns live in one place
- The component does not know what it is rendering

### Refactor App.jsx to use PageLayout

Update `App.jsx` so it becomes a clear page outline:

```jsx
import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

export default function App() {
  return (
    <PageLayout
      header={<Header tagline="Find the right resources, right away" />}
      left={<Filters />}
      middle={<Results />}
      right={<Details />}
    />
  );
}
```

> **Note:** The `App.css` import has been removed as we no longer apply any specific styling to the app at this stage.

> You might also want to explore the option of allowing a developer to determine the content of the `PageLayout` by using `children` rather than props.

This refactor reinforces:

- Composition through named slots
- Clear separation between layout and content
- App as a container that assembles the page

After this change, `App.jsx` should read like a **page blueprint**, not a layout implementation.

## Assessment

- A reusable `Card` component exists
- Card uses props and `children`
- Results, Filters, and Details use Card
- Presentational and container responsibilities are clearly separated
- The UI is composed from small, focused components
- App delegates layout to a presentational `PageLayout` component

## Student exercise

1) Create a second reusable UI component, for example:

- `CardHeader`
- `CardFooter`
- `ResultsList`
- `StatBadge`
- `EmptyState`

2) Refactor at least one existing component to use it.

Stretch goals:

- Add an `actions` prop to `Card` for optional header content (e.g., the results count for the Results UI)
- Compare before/after code and note what improved

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 09 - component composition and containers'
```
3. Push:
```sh
git push origin main
```