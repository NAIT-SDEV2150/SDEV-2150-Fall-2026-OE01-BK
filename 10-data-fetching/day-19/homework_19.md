# Lesson 19 Homework

## Continuing the Users and Posts Project

In this homework, you will continue building your existing **Users and Posts** React application.

Up to this point, your application should already:

- Use React Router for multi-page navigation
- Display users and posts on the main page
- Include a user management page for creating and editing users
- Use dynamic route parameters for the selected user on the management page

In Lesson 19, we introduced **React Router data mode**.

This homework asks you to refactor your existing application so that the router becomes responsible for:

- loading route data
- handling form submissions
- displaying route-level errors

## Goal

Update your existing application so that it uses **React Router data mode**.

Your application must:

- switch from component-based routing to a router object
- load page data using **loaders**
- submit create and edit forms using **actions**
- display an **ErrorBoundary** when route data cannot be loaded

This homework focuses on:

- `createBrowserRouter`
- `RouterProvider`
- `loader`
- `action`
- `useLoaderData()`
- `<Form>`
- route-level error handling

## Task

### Part 1: Switch the app to React Router data mode

Refactor your routing setup so that the application uses a router object instead of `BrowserRouter`, `Routes`, and `Route` directly in `main.jsx`.

### Requirements

1. Create a router configuration file such as:

```text
src/router.jsx
```

2. Use:

- `createBrowserRouter`
- `RouterProvider`

3. Define your application routes inside the router object.
4. Keep the same overall page structure you already built in previous lessons.

Your application should still support at least:

- `/` for the main Users and Posts page
- `/users/manage` for create mode
- `/users/manage/:userId` for edit mode

### Part 2: Load users using a route loader

Move the logic for loading users out of your component and into a **route loader**.

### Requirements

1. Create a loader for the main page that fetches users from JSONPlaceholder.
2. The loader should return the users data for the route.
3. The component should access that data using `useLoaderData()`.
4. Remove the old `useEffect`-based user fetch from that page.

Suggested endpoint:

```text
https://jsonplaceholder.typicode.com/users
```

### Part 3: Load posts using a route loader or route-driven strategy

Your application currently displays posts for the selected user.

Refactor the application so that posts are also loaded using router-based data.

### Acceptable approaches

#### Option A: Main page loader loads both users and posts

- Fetch users in the loader
- Fetch posts in the loader
- Return both to the page
- Filter or display posts based on route/page state

#### Option B: Manage posts through a loader tied to the selected user route or another router-based design

- Use the route structure and loader logic to determine which posts to show
- The key requirement is that the data loading should now be **router-driven**, not `useEffect`-driven inside the component

Either approach is acceptable.

### Part 4: Refactor the manage user page to use loader data

Your manage user page should no longer fetch user data inside the component.

### Requirements

1. Create a loader for the manage user route.
2. The loader must support both:
   - `/users/manage`
   - `/users/manage/:userId`
3. If a `userId` is present, the route should load the selected user.
4. If no `userId` is present, the route should still load the data needed for create mode.
5. The page must use `useLoaderData()` to access the route data.

### Part 5: Replace manual form submission with a route action

Refactor the create/edit form on the manage user page so that it submits through a **route action**.

### Requirements

1. Create an `action` for the manage user route.
2. Use React Router’s `<Form>` component instead of a normal form with a manual `onSubmit` handler.
3. The action must support both:
   - creating a user
   - updating a user
4. After submission:
   - new users should navigate to their route
   - edited users should remain on their route

Because JSONPlaceholder does not permanently persist changes, you may simulate the final UI result in local state or by using the returned response data.

### Part 6: Add an ErrorBoundary for route errors

Add route-level error handling using an **ErrorBoundary**.

### Requirements

1. Create an error boundary component, for example:

```text
src/pages/ErrorPage.jsx
```

2. Use React Router’s error handling hook inside it.

Suggested hook:

```jsx
useRouteError()
```

3. Display a helpful message when a route loader fails.
4. Include enough information for the user to understand that data could not be loaded.
5. Attach the error boundary to at least the routes that fetch remote data.

Your error UI should handle situations such as:

- network failure
- bad response from the API
- invalid user id for the manage route

### Part 7: Add helpful pending or UI feedback

Because route actions and loaders now drive the app, the user should receive useful feedback.

Include at least two of the following:

- a loading or pending message while a form is submitting
- a disabled submit button while saving
- a heading that changes between create mode and edit mode
- a message when no user is selected
- a message when the requested user cannot be found

## Constraints

Do **not**:

- Remove the existing users and posts functionality
- Return to component-based fetching with `useEffect` for the main route data
- Add global state libraries
- Introduce unrelated new features

This homework is about **React Router data mode and route-level error handling**.

## UI Expectations

Your UI should now:

- still support the existing users and posts workflow
- load route data through loaders
- submit forms through actions
- display route-driven create/edit modes
- show a route-level error screen when loading fails

## Submission Checklist

Before submitting, confirm that:

- The application uses `createBrowserRouter` and `RouterProvider`
- At least one page uses a loader and `useLoaderData()`
- The manage user page uses a route action
- The manage user form uses React Router’s `<Form>`
- An ErrorBoundary is connected to routes that can fail while loading
- The main users/posts functionality still works
- Navigation still works without a full page reload

Commit and push your updated workbook repository.

```sh
git add -A
git commit -m "Lesson 19 homework"
git push origin main
```
