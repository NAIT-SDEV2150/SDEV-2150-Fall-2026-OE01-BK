

# Lesson 16 Homework

## Continuing the Users and Posts Project

In this homework, you will extend your existing **Users and Posts** React application.

You will:

- Persist the selected user using `useEffect`
- Fetch users from the JSONPlaceholder API
- Fetch posts for the selected user
- Manage loading and error states

This homework builds directly on the work from Lessons 12–15.

---

## Part 1: Persist the Selected User with useEffect

Currently, your application highlights a selected user.

Update your project so that:

- The selected user is stored in `sessionStorage`
- The selected user is restored when the page reloads

### Requirements

1. Use `useState` with lazy initialization to read from `sessionStorage`.
2. Use `useEffect` to persist changes to the selected user.
3. If the selected user becomes `null`, remove the item from storage.

### Example pattern

```js
const STORAGE_KEY = 'selectedUser';

const [selectedUser, setSelectedUser] = useState(() => {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
});

useEffect(() => {
  if (selectedUser === null) {
    sessionStorage.removeItem(STORAGE_KEY);
  } else {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selectedUser));
  }
}, [selectedUser]);
```

You may place this logic directly in a component or extract it into a custom hook such as `useSelectedUser`.

---

## Part 2: Fetch Users from the API

Replace any hardcoded user data with live data from:

```
https://jsonplaceholder.typicode.com/users
```

### Requirements

1. Use `useEffect` with an empty dependency array to fetch users on mount.
2. Store users in state.
3. Add a loading indicator while fetching.
4. Add basic error handling.

### Example pattern

```js
useEffect(() => {
  async function fetchUsers() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  fetchUsers();
}, []);
```

---

## Part 3: Fetch Posts for the Selected User

When a user is selected, fetch only that user's posts.

Endpoint:

```
https://jsonplaceholder.typicode.com/posts?userId=ID
```

Where `ID` is the selected user's `id`.

### Requirements

1. Use a second `useEffect` that depends on `selectedUser`.
2. If `selectedUser` is `null`, clear the posts list.
3. Display loading state while posts are being fetched.
4. Display only posts associated with the selected user.

### Example pattern

```js
useEffect(() => {
  if (!selectedUser) {
    setPosts([]);
    return;
  }

  async function fetchPosts() {
    setIsLoadingPosts(true);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`
      );
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setPostsError(err);
    } finally {
      setIsLoadingPosts(false);
    }
  }

  fetchPosts();
}, [selectedUser]);
```

---

## UI Expectations

Your UI should now:

- Load users from the API when the app mounts
- Highlight the selected user
- Persist selection across refresh
- Load posts dynamically when a user is selected
- Show loading indicators appropriately

---

## Stretch Challenge (Optional)

1. Extract your fetching logic into custom hooks:
   - `useUsers()`
   - `usePosts(userId)`
2. Add an AbortController to prevent race conditions.
3. Add a "Refresh Posts" button.

---

## Submission Checklist

Before submitting:

- No hardcoded users
- Users load on mount
- Posts load when a user is selected
- Selection persists after refresh
- No infinite loops in effects
- Proper dependency arrays are used

Commit and push your updated workbook repository.

```sh
git add -A
git commit -m "Lesson 16 homework"
git push origin main
```

---

## Reflection

In a short paragraph, answer:

- Why must data fetching occur inside `useEffect`?
- What problem would occur if you fetched posts directly during rendering?

Be prepared to discuss your answer in the next class.