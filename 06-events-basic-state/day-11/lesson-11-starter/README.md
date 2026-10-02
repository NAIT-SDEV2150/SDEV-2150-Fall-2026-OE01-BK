# Lesson 11 Starter

## Install dependencies and run the dev server

In this lesson, you will continue working in the **same React + Tailwind project** from Lesson 10.

1. Move into your existing project directory (for example, `lesson-10`) or copy and paste to create a new version for this lesson:
```sh
cd lesson-10
```
2. Install any new dependencies:
```sh
npm install
```
3. Start the dev server:
```sh
npm run dev
```
4. Open the provided dev server URL in your browser

## Lesson focus

This lesson introduces [DaisyUI](https://daisyui.com/), a component library built on top of Tailwind CSS.

Rather than writing all UI elements from scratch using utility classes, DaisyUI provides:

- Prebuilt, accessible UI components
- Consistent styling out of the box
- Theme support for rapid visual changes

The goal of this lesson is **not** to replace Tailwind, but to understand how a component library can accelerate UI development while still allowing customization.

## Connecting to prior lessons

So far, you have:

- Built reusable React components
- Styled layouts directly with Tailwind utilities
- Implemented responsive layout behavior using breakpoints

In this lesson, you will **layer DaisyUI on top of your existing Tailwind setup** and refactor parts of the UI to use prebuilt components.

## Strategy

We will:

1. Install and configure DaisyUI
2. Explore DaisyUI components and themes
3. Replace selected custom markup with DaisyUI components
4. Evaluate trade-offs between custom styling and component libraries

All work will be done within your existing project.

## Phase 1: Install and configure DaisyUI

Install DaisyUI as a development dependency:

```sh
npm i -D daisyui@latest
```

Add daisyUI in  CSS file (and remove old styles)

```css
/* src/index.css */
@import "tailwindcss";
@plugin "daisyui";
```

Restart the dev server (if necessary) after making this change.

We are now ready to start using DaisyUI class names.

## Phase 2: Verify DaisyUI is working

To confirm DaisyUI is installed correctly:

1. Open one of your existing components (for example, `Header.jsx` or `Results.jsx`)
2. Temporarily add a DaisyUI class such as:

```html
<button className="btn btn-primary">Test Button</button>
```

If the button renders with DaisyUI styling, the installation is successful. Remove the button before proceeding.

## Phase 3: Introduce DaisyUI themes

DaisyUI supports multiple themes out of the box.

In our **Vite + React** setup, themes should be applied from **React**, not by editing `index.html` directly. The recommended place to do this is in a top-level layout component.

### Apply a theme in `PageLayout.jsx`

Open your layout component (for example, `PageLayout.jsx`) and add a `data-theme` attribute to the outer wrapper element:

```jsx
// src/components/layout/PageLayout.jsx
export default function PageLayout({ header, children }) {
  return (
    <div data-theme="light" className="min-h-screen bg-base-200">
      {/* existing layout markup */}
      {children}
    </div>
  );
}
```

Now try changing the theme value to one of DaisyUI’s built-in themes, such as:

- `dark`
- `cupcake`
- `corporate`

You should see the background color (and potentially a component or two) styles update immediately without changing any component markup.

### Optional: prepare for a theme toggle later

To prepare for a future lesson, you can store the theme in a constant (no state yet):

```jsx
// src/components/layout/PageLayout.jsx
const theme = 'light';

...
<div data-theme={theme} className="min-h-screen bg-base-200">
  {children}
</div>
```

This keeps theming controlled at the layout level and mirrors how many real-world React applications integrate DaisyUI.

## Phase 4: Refactor components using DaisyUI

Select **one or two existing components** and refactor them to use DaisyUI components.

Good candidates include:

- Cards or Buttons
- Button groups
- Navigation or header sections

For example, replace a custom card layout with a DaisyUI `card`:

```jsx
// src/components/ui/Card.jsx
export default function Card({ title, children }) {
  return (
    <section className="card bg-base-100 shadow-md">
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

Focus on **structure and consistency**, not pixel-perfect styling.

## Phase 5: Compare custom styling vs DaisyUI

After refactoring:

- Identify which Tailwind utility classes were removed
- Note which styles DaisyUI provides automatically
- Decide where DaisyUI helps and where custom Tailwind is still preferable

This comparison is a key learning outcome of the lesson.

## Assessment

- DaisyUI is correctly installed and configured
- At least one existing component uses DaisyUI classes
- A DaisyUI theme is applied and visible
- Existing layout and responsiveness continue to work
- No custom CSS files are added

## Student exercise

- Refactor an additional component using DaisyUI
- Experiment with at least one alternative DaisyUI theme
- Identify one advantage and one drawback of using a component library

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add -A
```
2. Commit:
```sh
git commit -m 'Lesson 11 - integrate DaisyUI'
```
3. Push:
```sh
git push origin main
```