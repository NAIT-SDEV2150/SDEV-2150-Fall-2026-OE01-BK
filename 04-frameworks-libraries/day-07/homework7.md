

# Homework Exercise: React + Tailwind Foundations (Static Components)

## Goal
Create a Vite + React project and build two **static** React components that model data from the JSONPlaceholder API:

- A **Users** component that displays a list of users
- A **Posts** component that displays a summary list of posts

No fetching will be done in this exercise. You will hard-code sample data.

## Why this matters
We will reuse this same domain (users + posts) over the next lessons to add:

- props
- state
- events
- fetching with `fetch` and `async/await`

For now, the focus is project setup, file structure, JSX, and Tailwind styling.

## Task (deliverables)

1. Create a new Vite + React project.
2. Configure Tailwind CSS.
3. Create two React components:

   - `<Users />` (renders a list of users)
   - `<Posts />` (renders a summary list of posts)

4. Compose both components inside `App.jsx` to create a simple layout.

> Note: This is a **static UI** exercise. Do not use `fetch`, `useEffect`, or component state.

## Setup requirements

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

- Project runs using `npm run dev`
- Tailwind is configured and utility classes are visible in the UI
- Both components (`Users.jsx`, `Posts.jsx`) render correctly
- Data is hard-coded (no fetch, no state, no effects)
- Components are composed inside `App.jsx`
- Markup is readable and uses Tailwind utilities for spacing and layout

## Stretch challenges (optional)

- Add a simple `Layout` component to wrap the page
- Add a `Card` component to standardize section styling
- Show a derived summary:
  - total users
  - total posts
- Replace the `userId` display with the matching user’s `name` (still without fetching)

## Estimated time

- 60–120 minutes

## Submission

- Commit your files to your workbook repo and push to GitHub.
- Include a short `README.md` with run instructions and a brief note describing:
  - your project structure
  - any stretch challenges completed