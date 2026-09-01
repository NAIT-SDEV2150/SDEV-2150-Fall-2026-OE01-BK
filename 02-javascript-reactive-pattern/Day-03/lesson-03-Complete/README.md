# Lesson 02 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-02`
1. Move into the lesson-02/ directory:
```sh
cd lesson-02
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
5. You should see a simple **Campus Resource Directory** page built with plain HTML + Bootstrap.

## Lesson focus

In SDEV1150 you learned the Web Component fundamentals:

- Custom elements
- Shadow DOM
- Templates

In this lesson we quickly review those features, then focus on **composition**.

Composition means building larger interfaces by combining smaller components. Instead of one massive component (or inheritance chains), we create focused pieces and assemble them into a UI that's easier to change and extend.

## Instructor demo


We start with a single HTML document (`src/index.html`). The goal is to **carve it into components** without changing the look and layout.

## The Composition Moment

This is the most important conceptual moment in the lesson.

Before this step, we are only **extracting components**.
After this step, we are **using composition**.

### What changes at this moment

When you replace large chunks of HTML with custom elements, your `index.html` stops describing *how the UI works* and starts describing *how the UI is assembled*.

Compare these two mental models:

**Before (no composition):**
- One large HTML document
- UI details live in one place
- Structure and behavior are tightly coupled

**After (with composition):**
- `index.html` contains mostly custom element tags
- Each component owns its own markup and logic
- The page is created by arranging components together

At this point, the page file answers only one question:

> "Which components appear, and how are they arranged?"

That shift is what we mean by **composition**.

### Why this matters

- The page becomes easier to read
- Components can be reused or rearranged
- UI complexity is distributed instead of centralized
- This same idea carries forward into frameworks like React and Vue

If your page still contains large amounts of raw HTML, you have not reached the composition moment yet.

### Component plan

We'll extract these parts from the existing markup:

1. **`<resource-header>`**
   - Page title, subtitle, and the top buttons
2. **`<resource-filters>`**
   - Search input, category buttons, checkboxes
3. **`<resource-results>`**
   - The results list (list-group)
4. **`<resource-details>`**
   - The details card on the right

> Optional stretch: add a `<resource-item>` (or `<resource-card>`) component for a single list item.

### Extraction steps

#### Step 1: Identify boundaries in the HTML

Open `src/index.html` and find the four regions:

- `<header ...>` (top of the page)
- `<aside ...>` (filters)
- The middle results card
- The right details card

We're going to move each region into its own component.

#### Step 2: Create component files

Create a folder such as `src/js/components/` and add:

- `resource-header.js`
- `resource-filters.js`
- `resource-results.js`
- `resource-details.js`

In `src/js/main.js`, import the component modules so they register:

```js
import './components/resource-header.js';
import './components/resource-filters.js';
import './components/resource-results.js';
import './components/resource-details.js';
```

#### Step 3: Replace HTML with custom elements

In `src/index.html`, replace the four regions with your custom elements.

Example target structure:

```html
<resource-header></resource-header>

<div class="row g-3">
  <resource-filters class="col-12 col-lg-4"></resource-filters>
  <resource-results class="col-12 col-lg-4"></resource-results>
  <resource-details class="col-12 col-lg-4"></resource-details>
</div>
```

At this point, the page will look empty until your components render.

#### Step 4: Implement each component (template + shadow)

Each component should:

- Extend `HTMLElement`
- Attach a Shadow DOM
- Render HTML with a cloned template node
- Use `connectedCallback()` to render

Skeleton example:

```js
const template = document.createElement('template');
template.innerHTML = `...`;

class ResourceHeader extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('resource-header', ResourceHeader);
```

> Important: Bootstrap styles do **not** automatically apply inside Shadow DOM. You will need to include the CSS link in your shadow root.

Options:

- Use **light DOM rendering** (render into `this.innerHTML` instead of Shadow DOM).
- Or, include styles inside the component (used in this example).

For Lesson 02, we'll choose one approach as a class and stay consistent.

#### Step 5: Composition discussion

Once the UI is rebuilt using components, we'll discuss:

- What improved (clarity, reuse, maintainability)
- What got harder (more files, more structure)
- Why composition scales better than inheritance for UI

## Student exercise
- Create a `<resource-item>` component and render the results list from an array

## Push to your GitHub workbook repo

1. Stage all changes:
```sh
git add .
```
2. Commit:
```sh
git commit -m 'Lesson 02 - Web Components composition'
```
3. Push:
```sh
git push origin main
```