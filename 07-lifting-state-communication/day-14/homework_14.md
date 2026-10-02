# SDEV2150 - Lesson 14: Building Components in React

These exercises help students build proficiency in developing structured, reusable React components.
They focus on props, composition, state, and controlled rendering using React with Vite and Tailwind CSS.

---

## Exercise 1: Reusable Card with Props and Children
**Goal:** Practice building a flexible, presentational component using `props` and `children`.

**Instructions:**
1. Create a `Card` component that accepts props: `title`, `subtitle`, and optional `actions` (React node).
2. Render `children` as the main content area.
3. Style using Tailwind classes for consistent spacing and typography.

**Acceptance Criteria:**
- `<Card title="Welcome" subtitle="Start here">Content</Card>` renders title, subtitle, and content.
- Optional `actions` prop renders as a right-aligned toolbar area.

**Stretch Challenge:**
- Add a `variant` prop to change between two visual styles.

**Key Concepts:** props, children, presentational components, Tailwind styling

---

## Exercise 2: Badge and Avatar Components, Then Compose
**Goal:** Build small, focused components, then compose them into a larger UI.

**Instructions:**
1. Create a `Badge` component with props: `label` and `variant` (e.g., `info`, `success`, `warning`).
2. Create an `Avatar` component with props: `src`, `alt`, and `size` (`sm`, `md`, `lg`).
3. Create a `UserHeader` component that composes `Avatar`, user name, and one or more `Badge` elements passed via `children`.

**Acceptance Criteria:**
- `UserHeader` displays an avatar, name, and badges inline.
- `Avatar` and `Badge` use Tailwind classes mapped to prop variants.

**Stretch Challenge:**
- Add `aria-label` descriptions for screen reader accessibility.

**Key Concepts:** composition, mapping props to styles, reusable UI building blocks

---

## Exercise 3: Simple Stateful Toggle in a Presentational Shell
**Goal:** Introduce minimal local state while keeping presentational concerns separated.

**Instructions:**
1. Extend the `Card` to optionally display a collapsible section controlled by a `Toggle` child component.
2. The `Toggle` component manages its own open/closed state and provides a button to reveal or hide content.

**Acceptance Criteria:**
- Clicking the button reveals or hides `children` content.
- The `Toggle` owns its state independently of the `Card`.
- Use DaisyUI styled components.

**Stretch Challenge:**
- Add a `defaultOpen` prop to `Toggle` for initial state control.

**Key Concepts:** local state, separation of concerns, reusability

---

## Exercise 4: Controlled Input and Derived UI
**Goal:** Manage local state and render UI based on controlled input.

**Instructions:**
1. Create a `SearchBox` component with a controlled input for a query string.
2. Create an `ItemList` that renders items passed via props.
3. Combine both into a `FilterableList` component that filters items by name in real time as the user types.

**Acceptance Criteria:**
- Typing in the `SearchBox` filters `ItemList` dynamically.
- `ItemList` only displays filtered results, with filtering logic in `FilterableList`.
- Use DaisyUI styled components.

**Stretch Challenge:**
- Highlight matched substrings in the list using a helper function.

**Key Concepts:** controlled components, derived state, data flow

---

## Exercise 5: Compound Component Pattern (Tabs)
**Goal:** Practice composition using compound components for structured, related UI elements.

**Instructions:**
1. Implement a `Tabs` component with subcomponents: `Tabs.List`, `Tabs.Tab`, and `Tabs.Panel`.
2. `Tabs` manages the active tab index in local state.
3. Clicking a `Tabs.Tab` updates the index and displays the corresponding `Tabs.Panel`.

**Acceptance Criteria:**
- Keyboard focus is visible, and tabs switch content correctly.
- Example usage:
  ```jsx
  <Tabs defaultIndex={0}>
    <Tabs.List>
      <Tabs.Tab>Overview</Tabs.Tab>
      <Tabs.Tab>Details</Tabs.Tab>
      <Tabs.Tab>Reviews</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel>Overview content</Tabs.Panel>
    <Tabs.Panel>Details content</Tabs.Panel>
    <Tabs.Panel>Reviews content</Tabs.Panel>
  </Tabs>
  ```

**Stretch Challenge:**
- Add `aria-selected`, `role="tab"`, `role="tablist"`, and `role="tabpanel"` attributes for accessibility.

**Key Concepts:** compound components, component hierarchy, controlled state

---

### Suggested Timing
| **Time**    | **Activity**  | **Focus**                                |
| ----------- | ------------- | ---------------------------------------- |
| 0–25 min    | Exercises 1–2 | Props, children, composition             |
| 25–45 min   | Exercise 3    | Local state management                   |
| 45–70 min   | Exercise 4    | Controlled inputs and derived UI         |
| 70–110 min  | Exercise 5    | Compound components                      |

---

**Instructor Notes:**
- Encourage use of DaisyUI and Tailwind utilities consistently to maintain design coherence.
- Have students commit each exercise separately for incremental progress tracking.
- Discuss accessibility and semantic HTML integration as part of component refinement.
