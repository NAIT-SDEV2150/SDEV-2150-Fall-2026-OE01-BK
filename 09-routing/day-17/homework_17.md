# Lesson 17 Homework

## Continuing the Users and Posts Project

In this homework, you will continue building your existing **Users and Posts** React application.

Up to this point, your application should already:

- Load users from the JSONPlaceholder API
- Load posts for the selected user
- Persist the selected user using `sessionStorage`
- Use `useEffect` for data fetching and side effects

In Lesson 17, we introduced **static routing** using **React Router 7**.

This homework asks you to reorganize your application into multiple pages and add a new page for managing users.

## Goal

Update your existing application so that it uses routing and supports two pages:

1. A main page for viewing users and posts
2. A second page for creating a new user or editing an existing user

This homework focuses on:

- Static routing with React Router 7
- Shared layout and navigation
- Route-based page organization
- Controlled forms for create/edit workflows

## Task

### Part 1: Add routing to the application

Install and configure React Router 7.

Your application must include:

- `BrowserRouter`
- `Routes`
- `Route`
- `NavLink` or `Link`
- `Outlet`

### Requirements

1. Convert your existing app so that routing controls which page is displayed.
2. Create a layout route using `App.jsx`.
3. Keep shared UI (for example, header or navigation) in the layout.
4. Use `Outlet` to render the current page.

Your route structure should include at least:

- `/` for the main Users and Posts page
- `/users/manage` for the create/edit page

Example route pattern:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<UsersPostsPage />} />
      <Route path="users/manage" element={<ManageUserPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### Part 2: Keep the existing Users and Posts page working

Move your current UI into a dedicated page component.

This page should still:

- Display users
- Highlight the selected user
- Load posts for the selected user
- Persist selected user across refresh

Routing should not break any of the existing behaviour.

### Part 3: Add navigation

Your application must include navigation so the user can move between pages.

### Requirements

1. Add navigation to the shared layout or header.
2. Include a link to:
   - the main page
   - the manage user page
3. Use `NavLink` if you want the current page to be visually highlighted.

Example:

```jsx
<NavLink to="/">Home</NavLink>
<NavLink to="/users/manage">Manage Users</NavLink>
```

### Part 4: Create the Manage User page

Create a new page component for managing users.

Suggested filename:

```text
src/pages/ManageUserPage.jsx
```

This page must allow the user to:

- create a new user
- select an existing user to edit
- update an existing user's values in the form

Because JSONPlaceholder does not persist changes permanently, this page will simulate create/update behaviour in the UI.

### Requirements

1. Display a list of available users.
2. When a user is clicked, load that user's data into the form.
3. Track whether the form is in **create mode** or **edit mode**.
4. Use controlled inputs for all form fields.
5. Include at least these fields:
   - name
   - email
   - phone
   - website
6. Include a submit button.

### Part 5: Handle create vs edit behaviour

The form must support two different behaviours:

#### Create mode

When no existing user is selected:

- the form should be blank
- submitting should simulate creating a new user

#### Edit mode

When an existing user is selected:

- the form should be populated with that user's current values
- submitting should simulate updating that user

### Acceptable approaches

You may choose either of the following:

#### Option A: Local UI update only

- Keep a local copy of the users array in state
- Add or update users in that local state
- Do not send changes to the API

#### Option B: Use JSONPlaceholder requests

- Send `POST` or `PUT` requests to JSONPlaceholder
- Still update local state so the UI reflects the changes

Either approach is acceptable as long as the UI clearly supports both create and edit workflows.

### Part 6: Add helpful UI feedback

Your page should make it clear whether the user is:

- creating a new user
- editing an existing user

Examples:

- Change the page heading
- Change the submit button label
- Show the selected user's name

Also include one of the following:

- a cancel edit button
- a clear form button

## Constraints

Do **not**:

- Remove the existing users+posts functionality
- Add dynamic route parameters yet
- Introduce route loaders or actions
- Add global state libraries

This homework is about **static routing and page structure**.

## UI Expectations

Your UI should now:

- support navigation between two pages
- preserve the existing main users/posts behaviour
- show a dedicated page for managing users
- allow the form to switch between create and edit modes

## Submission Checklist

Before submitting, confirm that:

- React Router 7 is installed and configured
- The application has at least two routes
- Navigation works without a full page reload
- The main users/posts page still works
- The manage user page supports create mode and edit mode
- The form uses controlled inputs
- The application uses `Outlet` in the shared layout

Commit and push your updated workbook repository.

```sh
git add -A
git commit -m "Lesson 17 homework"
git push origin main
```
