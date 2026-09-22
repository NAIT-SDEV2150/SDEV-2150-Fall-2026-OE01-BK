# Lesson 08 Starter

## Install dependencies and run the dev server

In this lesson, we continue working in the same React + Tailwind project from Lesson 07.

0. Extract the starter zip and rename the folder to `lesson-08`
1. Move into the lesson-08/ directory:
```sh
cd lesson-08
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

This lesson extends our React component work by moving beyond simple static examples.

In this example, we will cover:

- Passing data into components with **props**
- Using **children** to "slot" content into a component
- Using composition with a small sub-component (`ResultsItem`) to reduce repeated markup

## Connecting to prior lessons

In Lesson 07 we rebuilt the NAIT Resource Directory UI using React and Tailwind.

In this lesson, we keep the same UI, but work on making it more maintainable and reusable:

- Repeated markup becomes a component
- Data flows into components via props
- Components can expose "slots" using `children`

## Strategy

We will focus on one area of the UI: the **Results list**.

1. Introduce a hard-coded `resources` array
2. Create a `ResultsItem` component
3. Refactor `Results` to render a list of `ResultsItem`s
4. Use `children` to render an optional **Open Now** badge

## Phase 1: Add sample resource data

Create a new file:

- `src/data/resources.js`

Add the following array:

```js
export const resources = [
  {
    id: 'tutoring',
    title: 'Peer Tutoring Centre',
    category: 'Academic',
    summary: 'Drop-in tutoring and study support.',
    location: 'Building W, Room W101',
    openNow: true,
  },
  {
    id: 'counselling',
    title: 'Counselling Services',
    category: 'Wellness',
    summary: 'Confidential mental health supports.',
    location: 'Virtual and in-person',
    openNow: true,
  },
  {
    id: 'bursaries',
    title: 'Student Awards and Bursaries',
    category: 'Financial',
    summary: 'Funding options and application help.',
    location: 'Student Services, Main Floor CAT',
    openNow: false,
  },
  {
    id: 'it',
    title: 'IT Service Desk',
    category: 'Tech',
    summary: 'Account access, Wi-Fi, BYOD support.',
    location: 'Library',
    openNow: true,
  },
];
```

## Phase 2: Create a ResultsItem component

Create a new component file:

- `src/components/ResultsItem.jsx`

This component will:

- Accept props for the resource data
- Render a consistent layout
- Use `children` for optional content (the badge)

Start with this:

```jsx
export default function ResultsItem({ title, category, summary, location, children }) {
  return (
    <li className="px-4 py-3 text-gray-900 hover:bg-gray-50">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {children}
          <small className="text-xs text-gray-500">{category}</small>
        </div>
      </div>

      <p className="mt-1 text-xs text-gray-500">{summary}</p>

      <small className="mt-1 block text-xs text-gray-500">{location}</small>
    </li>
  );
}
```

What to notice:

- Props flow into the component as inputs
- `children` is rendered in a specific spot, making it a simple "slot"

## Phase 3: Refactor Results to compose ResultsItem

Open `src/components/Results.jsx`.

1) Import the resources data.
2) Import `ResultsItem`.
3) Map the array and render one `ResultsItem` per resource.

Here is a complete example:

```jsx
import ResultsItem from './ResultsItem';
import { resources } from '../data/resources';

export default function Results() {
  return (
    <section className="h-full mb-4">
      <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <strong className="text-sm text-gray-900">Results</strong>
          <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
            {resources.length}
          </span>
        </div>

        <ul className="divide-y divide-gray-200">
          {resources.map((r) => (
            <ResultsItem
              key={r.id}
              title={r.title}
              category={r.category}
              summary={r.summary}
              location={r.location}
            >
              {/* children: optional badge content */}
              {r.openNow && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  Open now
                </span>
              )}
            </ResultsItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

This is the key Lesson 08 idea:

- `Results` composes the list from smaller components
- Data flows into `ResultsItem` using props
- Optional UI is inserted into `ResultsItem` using `children`

## Assessment

- `ResultsItem` exists and is used by `Results`
- Props are used to pass resource data into `ResultsItem`
- `children` is used to render an optional "Open now" badge

## Student exercise

1) Add one more optional badge using children, for example:
   - A category-specific badge for `Tech`
   - A "Popular" badge for one item

2) Add a prop to `ResultsItem` for an optional value, for example:
   - `isVirtual` (boolean)
   - `hours` (string)
     Render it only when provided (conditional rendering)

Stretch goal:
- Add an `isSelected` prop and conditionally apply a highlight class when it is true

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 08 - ResultsItem, props, children'
```
3. Push:
```sh
git push origin main
```