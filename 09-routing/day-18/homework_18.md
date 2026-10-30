# Lesson 18 Homework

## Continuing the Users and Posts Project

In this homework, you will continue building your existing **Users and Posts** React application.

Up to this point, your application should already:

- Use static routing with React Router 7
- Display users and posts on the main page
- Include a user management page for creating and editing users
- Use controlled forms for create and edit workflows

In Lesson 18, we introduced **dynamic route parameters**.

This homework asks you to extend the existing routing structure so that the **currently selected user is represented in the URL** on the user admin page.

## Goal

Update your existing application so that the manage user page supports both:

- `/users/manage` for **create mode**
- `/users/manage/:userId` for **edit mode**

The selected user should be determined by the route parameter rather than only by local component state.

This homework focuses on:

- Dynamic routing with React Router 7
- Reading route parameters with `useParams()`
- Navigating programmatically with `useNavigate()`
- Using the URL as application state

## Task

### Part 1: Update the route structure

Modify your existing routes so the manage user page supports a dynamic route parameter.

Your application must support at least these routes:

- `/` for the main Users and Posts page
- `/users/manage` for creating a new user
- `/users/manage/:userId` for editing an existing user

Example route pattern:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<UsersPostsPage />} />
      <Route path="users/manage" element={<ManageUserPage />} />
      <Route path="users/manage/:userId" element={<ManageUserPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### Part 2: Read the selected user from the route

Inside `ManageUserPage`, use `useParams()` to read the `userId` value from the URL.

Requirements:

1. Import and use `useParams()`.
2. If the route includes a `userId`, treat the page as **edit mode**.
3. If there is no `userId`, treat the page as **create mode**.

Example:

```jsx
import { useParams } from 'react-router';

const { userId } = useParams();
```

### Part 3: Display the currently selected user on the admin page

Your manage user page must clearly show which user is currently selected for editing.

Requirements:

1. Display the selected user’s name somewhere on the page when in edit mode.
2. Make it clear when the page is in create mode instead.
3. The displayed user must come from the route parameter and the users data, not from unrelated local state.

Examples:

- "Currently editing: Leanne Graham"
- "Create New User"

### Part 4: Update the user list to navigate by route

If your manage user page includes a list of users for editing, clicking a user should update the route.

Requirements:

1. Use `useNavigate()` or `Link`/`NavLink`.
2. Selecting a user should navigate to:

```text
/users/manage/:userId
```

3. The form should then reflect the selected user.

Example:

```jsx
navigate(`/users/manage/${user.id}`);
```

### Part 5: Populate the form for edit mode

When a `userId` is present in the route:

- locate the matching user
- populate the form with that user’s values
- allow the user to edit the form

When no `userId` is present:

- show a blank form
- allow the user to create a new user

You may use either of these approaches:

#### Option A: Derive the selected user directly in the page

- Find the matching user using the route parameter
- Initialize or populate the form from that user

#### Option B: Extract a dedicated form component

- Move the form into a child component
- Pass the selected user’s values in as initial data
- Remount or reset the form when the route changes

Either approach is acceptable.

### Part 6: Programmatic navigation after submit

After form submission:

#### When creating a new user

- the app should navigate to that newly created user’s route
- example: `/users/manage/11`

#### When editing an existing user

- the app should remain on that user’s route

Because JSONPlaceholder does not persist changes permanently, you may simulate this behaviour in local state if needed.

### Part 7: Add helpful UI feedback

Your UI should clearly communicate route-driven state.

Include at least two of the following:

- A heading that changes between create mode and edit mode
- A "Currently editing" message with the selected user’s name
- A "New User" button that navigates back to `/users/manage`
- Visual styling for the selected user in the list

## Constraints

Do **not**:

- Remove the existing users and posts functionality
- Introduce route loaders or actions
- Add global state libraries
- Replace the entire application structure

This homework is about **dynamic route parameters and route-driven UI state**.

## UI Expectations

Your UI should now:

- support navigation between pages
- preserve the existing main users/posts behaviour
- support both create mode and edit mode on the manage user page
- reflect the selected user in the URL
- display the currently selected user on the manage page

## Submission Checklist

Before submitting, confirm that:

- The application supports `/users/manage` and `/users/manage/:userId`
- `useParams()` is used correctly
- The selected user is shown on the manage page
- Clicking a user updates the route
- The form supports both create mode and edit mode
- The main users/posts page still works
- Navigation still works without a full page reload

Commit and push your updated workbook repository.

```sh
git add -A
git commit -m "Lesson 18 homework"
git push origin main
```
