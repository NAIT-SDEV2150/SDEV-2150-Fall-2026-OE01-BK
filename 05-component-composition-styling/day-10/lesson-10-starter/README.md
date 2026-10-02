# Lesson 10 Starter

## Install dependencies and run the dev server

In this lesson, we continue working in the same React + Tailwind project from Lesson 09.

0. Extract the starter zip and rename the folder to `lesson-10`
1. Move into the lesson-10/ directory:
```sh
cd lesson-10
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

This lesson focuses on **responsive layout and component styling using Tailwind CSS**.

Up to this point, most Tailwind utility classes have been provided for you. In this lesson, you will begin making **intentional styling decisions**, particularly around layout behaviour at different screen sizes.

You will practice:

- Using Tailwind's responsive breakpoints (`sm`, `md`, `lg`)
- Modifying grid and column behaviour at different screen sizes
- Designing layouts that adapt across mobile, tablet, and desktop
- Reasoning about layout requirements instead of trial-and-error styling

## Connecting to prior lessons

In Lesson 09, we introduced:

- Component composition strategies
- Layout responsibility via a `PageLayout` component
- Clear separation between layout, containers, and presentational components

In Lesson 10, we build directly on that work by **refining the layout behaviour** inside the layout component.

## Strategy

We will modify the existing layout so it behaves differently across three screen sizes:

- **Mobile (default)**: stacked layout
- **Tablet / medium screens**: Filters span the full width above Results and Details
- **Desktop / large screens**: Filters, Results, and Details appear side-by-side

All changes for this lesson should occur inside the **layout component**.

## Why this layout uses `children`

The `PageLayout` component is intentionally designed to accept `children` rather than fixed props like `left`, `middle`, and `right`.

This approach:

- Keeps the layout component **generic and reusable**
- Allows the parent (`App.jsx`) to decide *what* content appears and *how* it spans the grid
- Reinforces the idea that **layout defines structure**, while parents control composition

In this lesson, responsive behaviour is achieved by wrapping each child with an element that applies Tailwind grid utilities (such as `col-span-*`) at different breakpoints.

This design mirrors real-world React layouts, where layout components provide structure and flexibility rather than enforcing a fixed page shape.

## Phase 1: Review the current layout

Open `src/components/layout/PageLayout.jsx`.

Observe the current Tailwind classes applied to the `<main>` grid and its children.

### What you should see in `PageLayout.jsx`

Your layout component should look similar to this:

```jsx
export default function PageLayout({ header, children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-sky-600 bg-white px-6 py-4">
        {header}
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3">
        {children}
      </main>
    </div>
  );
}
```

For this lesson, **PageLayout.jsx is the only file that defines the grid itself**.

Confirm the existing behaviour:

- On small screens, all sections stack vertically
- On larger screens, the layout switches to columns

Before making changes, resize the browser or use responsive mode in DevTools to verify this behaviour.

## Phase 2: Define the desired responsive behaviour

We will target three layout modes:

### Mobile (default)

- Filters, Results, and Details stack vertically
- Each section spans the full width

### Medium screens (`md`)

- Filters appear in a full-width row at the top
- Results and Details appear side-by-side beneath Filters

### Large screens (`lg`)

- Filters appear in the left column
- Results appear in the center column
- Details appear in the right column

Keep this layout description visible while implementing the changes.

## Phase 3: Modify the grid for the intermediate layout

In `PageLayout.jsx`, update the grid configuration so that:

- The grid switches to multiple columns at the `md` breakpoint
- The Filters section spans all columns at `md`
- Results and Details share the row beneath

This will require adjusting:

- `grid-cols-*`
- `col-span-*`
- Responsive prefixes (`md:` and `lg:`)

Avoid hard-coding pixel values. Use Tailwind's breakpoint system exclusively.

### Snippet to implement the `md` layout (children-based)

With the `children` approach, the layout component defines the grid, and the parent controls how each child spans that grid.

**Step A: Update the grid spacing in `PageLayout.jsx`:**

```jsx
<main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3 md:gap-6">
  {children}
</main>
```

**Step B: In `App.jsx`, wrap each section to control its span at `md`:**

```jsx
<PageLayout header={<Header tagline="Find the right resources, right away" />}>
  <aside className="md:col-span-3">
    <Filters />
  </aside>

  <section className="md:col-span-2">
    <Results />
  </section>

  <aside className="md:col-span-1">
    <Details />
  </aside>
</PageLayout>
```

Expected behaviour after this step:

- Mobile: stacked layout
- Medium (`md`): Filters spans full width, Results and Details appear below

## Phase 4: Refine the desktop layout

Extend the layout rules at the `lg` breakpoint so that:

- Filters no longer span all columns
- Each section occupies its own column

At this point, the layout should clearly shift between three distinct configurations.

Use DevTools to verify transitions between breakpoints.

### Snippet to implement the `lg` layout (children-based)

Extend the same wrappers so that at the `lg` breakpoint, the layout becomes fully horizontal again.

Update the wrappers in `App.jsx`:

```jsx
<PageLayout header={<Header tagline="Find the right resources, right away" />}>
  <aside className="md:col-span-3 lg:col-span-1">
    <Filters />
  </aside>

  <section className="md:col-span-2 lg:col-span-1">
    <Results />
  </section>

  <aside className="md:col-span-1 lg:col-span-1">
    <Details />
  </aside>
</PageLayout>
```

Expected behaviour after this step:

- Mobile: stacked
- Medium (`md`): Filters on top, Results and Details below
- Large (`lg`): Filters, Results, and Details side-by-side

## Phase 5: Improve layout clarity and spacing

Once the structure is correct, refine the visual clarity:

- Adjust `gap-*` values between grid items
- Ensure consistent padding across sections
- Confirm that content does not feel cramped or overly sparse at any breakpoint

Focus on **consistency and readability**, not decorative styling.

## Assessment

- The layout changes correctly across mobile, medium, and large screens
- All responsive behaviour is controlled via Tailwind utility classes
- Changes are isolated to the layout component
- Breakpoints are used intentionally and consistently
- The UI remains readable and well-spaced at all sizes

## Student exercise

- Introduce an optional `layout` (or `variant`) prop on the `PageLayout` component that switches between two different Tailwind class rule sets (e.g., `standard` (3 cols) and `wide` (4 cols) ), while rendering the same children.
- Change the visual order of sections at one breakpoint using Tailwind's `order-*` utilities

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 10 - responsive layout with Tailwind'
```
3. Push:
```sh
git push origin main
```