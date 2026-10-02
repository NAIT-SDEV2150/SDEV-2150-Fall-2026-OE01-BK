

# Homework Exercise: React + Tailwind Foundations (Static Components)

## Goal
Refactor a static React + Tailwind UI to emphasize **component composition and reuse**.

You will build on the existing Users and Posts components and introduce reusable layout and presentational components that reduce duplication and clarify structure.

## Why this matters
As React applications grow, repeated markup and ad-hoc layout decisions quickly become hard to maintain.

This exercise focuses on:

- identifying repeated structure
- extracting reusable presentational components
- composing a page from smaller, focused pieces

These are foundational skills for building scalable React applications.

## Task (deliverables)

You must complete **all** of the following:

1. Create or refactor a reusable `Layout` or `PageLayout` component that defines the overall page structure.
2. Create a reusable `Card` component for consistent section styling.
3. Refactor both `Users` and `Posts` to render their content inside `Card`.
4. Compose the full page in `App.jsx` using the layout component and section components.

The goal is that `App.jsx` reads like a **page outline**, not an implementation dump.

## Composition requirements

- Reusable components must accept props and/or `children`
- Layout and styling concerns should live in presentational components
- Domain components (`Users`, `Posts`) should focus on rendering data
- Avoid duplicating layout markup across components

## Setup requirements

> **Note:** If you are carrying on fro the previous homework task, you can skip this step.

From an empty folder:

1. Scaffold a Vite project:
```sh
npm create vite@latest .
```
Remember: 
- Select **React**
- Select **JavaScript**
2. Update ESLint to require semi-colons
3. Install and configure Tailwind:
```sh
npm i -D tailwindcss @tailwindcss/vite
```
4. Configure the Vite tailwind plugin
5. Import Tailwind into to the main `css` file

## Data shapes

These shapes are based on JSONPlaceholder:

- Users: `https://jsonplaceholder.typicode.com/users`
- Posts: `https://jsonplaceholder.typicode.com/posts`

### User (simplified - see API docs for full property list)

```js
{
  id: number,
  name: string,
  username: string,
  email: string,
  company: { name: string }
}
```

### Post (summary)

```js
{
  id: number,
  userId: number,
  title: string,
  body: string
}
```

## Sample data (hard-code this)

Create a file such as `src/data/sampleData.js` and export these arrays.

### Sample users

```js
export const users = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'leanne@example.com',
    company: { name: 'Romaguera-Crona' },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'ervin@example.com',
    company: { name: 'Deckow-Crist' },
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'clementine@example.com',
    company: { name: 'Romaguera-Jacobson' },
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'patricia@example.com',
    company: { name: 'Robel-Corkery' },
  },
];
```

### Sample posts

```js
export const posts = [
  {
    id: 1,
    userId: 1,
    title: 'sunt aut facere repellat provident occaecati',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur',
  },
  {
    id: 2,
    userId: 1,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil',
  },
  {
    id: 3,
    userId: 2,
    title: 'ea molestias quasi exercitationem repellat',
    body: 'et iusto sed quo iure\nvoluptatem occaecati',
  },
  {
    id: 4,
    userId: 3,
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis\nvoluptatem adipisci',
  },
  {
    id: 5,
    userId: 4,
    title: 'nesciunt quas odio',
    body: 'repudiandae veniam quaerat\n sunt sed alias',
  },
];
```

## UI requirements

### Layout

Your page should include:

- A header with a title like **"JSONPlaceholder Dashboard"**
- Two main sections:
  - **Users** (list)
  - **Posts** (summary)

Use Tailwind to create a clean layout (grid or flex).

### Users component

Create `src/components/Users.jsx`.

It must:

- Render a heading ("Users")
- Display all users from the hard-coded array
- Show at minimum:
  - name
  - username
  - email
  - company name

### Posts component

Create `src/components/Posts.jsx`.

It must:

- Render a heading ("Posts")
- Display all posts from the hard-coded array
- Show at minimum:
  - title
  - a short excerpt of the body (first 80–120 characters)
  - the `userId` (for now)

## Acceptance criteria

- A reusable layout component exists and is used by `App.jsx`
- A reusable `Card` component exists and is used by both `Users` and `Posts`
- `App.jsx` composes the page using high-level components only
- Components have clear presentational vs container responsibilities
- Tailwind utility classes are applied consistently via shared components
- No fetching, state, or event handling is used

## Further extensions (optional)

- Add a `SectionHeader` component to standardize headings
- Add an `actions` slot to `Card` using `children`
- Compare before/after code and describe what duplication was removed
- Introduce a second layout variant (e.g., single-column vs two-column)

## Estimated time

- 90–150 minutes

## Submission

- Commit your files to your workbook repo and push to GitHub.
- Include a short `README.md` with run instructions and a brief note describing:
  - your project structure
  - any stretch challenges completed