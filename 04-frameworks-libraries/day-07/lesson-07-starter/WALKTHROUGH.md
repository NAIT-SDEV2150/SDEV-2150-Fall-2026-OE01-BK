# Lesson 07 Starter

## Install dependencies and run the dev server

In this lesson, we transition from vanilla JavaScript and Web Components to a framework-based UI using **React**, **Tailwind CSS**, and **Vite**.

We will continue working with the **NAIT Resource Directory** domain. The backend folder remains unchanged and can be reused for future lessons, but this lesson focuses only on front-end setup and static UI components.

0. Extract the starter zip and rename the folder to `lesson-07`
1. Move into the lesson-07/ directory:
   ```sh
   cd lesson-07
   ```
2. Scaffold a new Vite project:
   ```sh
   npm create vite@latest .
   ```
   > Accept the prompt to install vite package, and ignore files and continue
   - Select **React** when prompted
   - Select **JavaScript** (not TypeScript) no compiler, and do not use rolldown-vite (default)
   - Choose `Yes` for "Install with npm and start now?" prompt

4. Open the provided development server URL in your browser
5. You should see the default Vite + React starter page

## Lesson focus

This lesson introduces **framework foundations**.

Our goals today are to:

- Scaffold a React project using Vite (done)
- Manually configure Tailwind CSS
- Create and compose **static React components** using JSX

## Connecting to prior lessons

Up to this point, we have built UI using:

- Plain JavaScript
- Web Components
- Custom events for communication

In this lesson, we introduce React as a framework layer that changes:

- How components are defined
- How the UI is rendered
- How styling is applied

We will explicitly compare the React setup to the previous vanilla project.

## Phase 1: Scaffolding a React project with Vite

### Why Vite

Vite provides:

- Fast development feedback
- A simple mental model
- Minimal configuration for modern JavaScript

React support is enabled via a Vite plugin, which we will briefly examine shortly.

### Files of interest

After scaffolding, review the following files:

- `index.html`
- `src/main.jsx`
- `src/App.jsx`

Compare these to the previous project's `index.html` and `main.js` to see what has changed.

### How the new project structure supports React

The structure created by Vite is designed to support a **React-based UI** rather than direct DOM manipulation.

At a high level:

- `index.html` contains a single root element where the React application is mounted
- `src/main.jsx` is responsible for bootstrapping React and attaching it to the DOM
- `src/App.jsx` becomes the top-level component that represents the UI
- Additional UI pieces are defined as React components and composed inside `App.jsx`

Unlike the previous vanilla JavaScript approach:

- We no longer manually select or update DOM elements
- We do not inject HTML strings into the page
- The UI is described declaratively using JSX

React manages updating the DOM for us based on the component structure we define. Our responsibility shifts from *how to update the DOM* to *what the UI should look like*.

> **This structural change is what enables frameworks like React to scale more effectively as applications grow.**

### Tooling configuration files

When Vite scaffolds the project, it also generates a small number of configuration files that support development tooling. These files are not part of the UI itself, but they strongly influence how the project behaves during development.

#### vite.config.js

The `vite.config.js` file configures the Vite development server and build process.

At a high level, this file:

- Enables React support through a Vite plugin
- Controls how modules are resolved and bundled
- Defines development and build-time behaviour

For this lesson, we will largely treat this file as **infrastructure** rather than something we actively modify. The important takeaway is that React support is not automatic, it is enabled through tooling configuration.

#### eslint.config.js

The `eslint.config.js` file configures **code quality rules** for the project.

ESLint does not affect how the application runs, but it does affect:

- How code is written
- Which patterns are allowed or discouraged
- Which mistakes are surfaced early in the editor

This configuration can be **extended and customized**.

For example, we can add or override rules by exporting a configuration object with a `rules` section:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    ...
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // TODO: add the following rule to your eslint config
      semi: ['error', 'always'],
    },
  },
])
```

In this example:

- The `semi` rule enforces semicolons
- Violations will be reported as errors (you should see that once you add and save this rule, the eslint file itself will be showing errors)
- You can configure your code editory to use ESLint as a formatter to ensure your code always matches the project's rules

Run the following in your terminal, or update/create a lint script in `package.json` to easily have ESLint fix all linting errors

```sh
npx eslint . --fix
```

This demonstrates that linting rules are a **team decision**, not a language requirement. As projects grow, ESLint helps keep code style consistent across teams.

## Phase 2: Configuring Tailwind CSS

In this phase, we manually install and configure Tailwind so you understand exactly what is required.

### Install Tailwind and related packages

```sh
npm i -D tailwindcss @tailwindcss/vite
```

### Configure the Vite plugin

Update `vite.config.js` to import tailwindcss and support the plugin:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// TODO: import tailwindcss
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  plugins: [
    react(),
    // TODO: add the tailwindcss plugin
    tailwindcss(),
    ],
});
```

### Add Tailwind directive

In `src/index.css`, add:

```css
@import "tailwindcss";
```

You should see the styling of the page alter slightly once the tailwindcss import has been saved. Test your install by adding a utility class to the `h1` in `App.jsx`:

```jsx
...
<h1 className="bg-sky-500">Vite + React</h1>
...
```

> Why `className` is used instead of `class` will be covered during the JSX demo with your instructor.

## Phase 3: Creating static React components

For this lesson, all components are **static**.

They:

- Return JSX
- Accept **at most one simple prop** for display purposes
- Do not manage internal state

This allows us to focus on [JSX](https://react.dev/learn/writing-markup-with-jsx) syntax, file structure, and styling.

### Component breakdown

In this React version of the application, the UI is divided into a small set of components that each represent a **distinct section of the page**.

At this stage, components are responsible for **structure and presentation only**, not behaviour.

The breakdown mirrors the component boundaries established earlier with Web Components:

- `Header` - displays the application title
- `Filters` - displays filter controls (UI only, no logic yet)
- `Results` - displays a list layout for resources (static for now)
- `Details` - displays a placeholder or static detail view

Each component:

- Is defined as a React function
- Returns JSX
- Uses Tailwind utility classes for layout and styling

> Component boundaries are a **design decision**, not something imposed by a framework.

Create the following components in `src/components/`:

- `Header.jsx`
- `Filters.jsx`
- `Results.jsx`
- `Details.jsx`

Each component should:

- Return markup similar to the previous UI
- Use Tailwind utility classes for layout and styling

> **When styling components:**
> 
> - Focus on layout, spacing, and alignment
> - Do not aim for exact Bootstrap parity
> - Translate layout intent, not class names
> 
> The goal is to become comfortable with utility-first styling.

### Header.jsx

```jsx
// src/components/Header.jsx
export default function Header() {
  return (
    <header className="mb-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-sky-600">NAIT Resource Directory</h1>
          <p className="text-sm text-gray-500">
            Find student support services, labs, and campus resources.
          </p>
        </div>
      </div>
    </header>
  );
}
```

### Filters.jsx

```jsx
// src/components/Filters.jsx
export default function Filters() {
  return (
    <aside className="h-full mb-4">
      <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-4 py-3">
          <strong className="text-sm text-gray-900">Filters</strong>
        </div>

        <div className="space-y-4 p-4">
          <form id="frm-filter" className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="q" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                id="q"
                type="text"
                placeholder="Try: tutoring, mental health, bursary"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-800">Category</div>
              <div className="flex flex-wrap gap-2" aria-label="Category filters">
                {/* INFO: Could just copy/paste individual buttons, but this is more maintainable */}
                {['All', 'Academic', 'Wellness', 'Financial', 'Tech'].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded border border-sky-600 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  id="openNow"
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                Open now
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  id="virtual"
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                Virtual options
              </label>
            </div>

            <hr className="border-gray-200" />

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Filter
              </button>
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
}
```

### Results.jsx

```jsx
// src/components/Results.jsx
export default function Results() {
  return (
    <section className="h-full mb-4">
      <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <strong className="text-sm text-gray-900">Results</strong>
          <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
            4
          </span>
        </div>
        {/* Replaced div with buttons with a list */}
        <ul className="divide-y divide-gray-200">
          <li
            className="w-full text-left bg-blue-600 text-white px-4 py-3 focus:outline-none"
            aria-current="true"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-semibold">Peer Tutoring Centre</h2>
              <small className="text-xs text-blue-100">Academic</small>
            </div>
            <p className="mt-1 text-xs text-blue-100">
              Drop-in tutoring and study support.
            </p>
            <small className="mt-1 block text-xs text-blue-100">
              Building W, Room W101
            </small>
          </li>
          {/* INFO: Could just copy/paste individual buttons, but this is more maintainable */}
          {[
            {
              title: 'Counselling Services',
              category: 'Wellness',
              summary: 'Confidential mental health supports.',
              location: 'Virtual and in-person',
            },
            {
              title: 'Student Awards and Bursaries',
              category: 'Financial',
              summary: 'Funding options and application help.',
              location: 'Student Services, Main Floor CAT',
            },
            {
              title: 'IT Service Desk',
              category: 'Tech',
              summary: 'Account access, Wi-Fi, BYOD support.',
              location: 'Library',
            },
          ].map((item) => (
            <li
              key={item.title}
              className="w-full text-left px-4 py-3 text-gray-900 hover:bg-gray-50"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm font-semibold">{item.title}</h2>
                <small className="text-xs text-gray-500">{item.category}</small>
              </div>
              <p className="mt-1 text-xs text-gray-500">{item.summary}</p>
              <small className="mt-1 block text-xs text-gray-500">
                {item.location}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

### Details.jsx

Using what you have seen and walked through above, try to implement the Details component on your own.

## Composing components in App.jsx

In `App.jsx`:

- Import each component
- Compose them together to recreate the page layout

### Import the first component - Header

Before we can begin working on our project, we need to clean up the default components and styles applied at project init time. Begin with `src/App.jsx`. Remove unnecessary JSX and imports, and compose the UI of just the `Header` component, for now:

```jsx
import Header from './components/Header';
import './App.css';

function App() {
  return <Header />;
}

export default App;
```

Next, clean up the `App.css` styles:

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
```

Finally, update the project `index.css` styles:

```css
@import "tailwindcss";
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light;
 
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

```

At this time, the project should be rendering the UI with just the Header, and it should look pretty close to the original project!

Continue to build out the remaining components and add them to the UI composed in `App.jsx` until you have a UI that mathces (pretty closely) the UI from our web component version.

## A first look at props

Before we wrap up this lesson, we will introduce one small example of using **props**.

Props allow data to be passed *into* a component. For now, we will use props only for **display**, not logic or state management.

### Adding a `tagline` prop to the Header

Update `Header.jsx` so it accepts a `tagline` prop:

```jsx
export default function Header({ tagline }) {
  tagline = false;
  return (
    <header className="mb-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-sky-600">NAIT Resource Directory</h1>
          <p className="text-sm text-gray-500">
            {/* Conditional rendering with or (||) operator */}
            {tagline ? tagline : 'Find student support services, labs, and campus resources.'}
          </p>
        </div>
      </div>
    </header>
  );
}
```

In this example:

- `tagline` is a prop passed into the component
- The paragraph text is **conditionally rendered**: if there is no tagline, then the default is rendered
- No state or side effects are involved

### Passing the prop from App.jsx

Update `App.jsx` to pass a value for the `tagline` prop:

```jsx
<Header tagline="Find the right resources, right away" />
```

This example demonstrates that:

- Props flow *into* components
- Components can choose how (and whether) to render them
- Conditional rendering can be expressed directly in JSX

We will explore props and state in more detail in the next lesson.

## Assessment

- A Vite + React project that runs locally
- Tailwind CSS configured and working
- At least three static React components
- Components composed inside `App.jsx`
- Tailwind utilities applied for layout and styling

## Student Exercise

- Complete the build and implementation of the `Details` component on your own
- Refine layout using Tailwind grid or flex utilities
- Extract repeated markup into additional components
- Adjust spacing and typography for readability

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 07 - React scaffold and static components'
```
3. Push:
```sh
git push origin main
```