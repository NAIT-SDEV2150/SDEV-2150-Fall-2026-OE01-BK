# Homework Exercise: Mini To‑Do App

## Goal
- Practice core JavaScript and basic DOM interactions by building a small To‑Do app.

## Task (deliverables)
1. Build a single static page and a separate JS file (e.g., src/js/main.js).
2. Page must include:
   - An input for a new task and an "Add" button.
   - A list area that displays tasks as DOM elements.
3. Behavior:
   - Add a non-empty task by clicking Add or pressing Enter.
   - Each task item includes:
     - Text label
     - A "Done" toggle that visually marks completion (strike-through or dim)
     - A "Delete" button that removes the item from the DOM
4. Include a short `README.md` explaining how to open and run the page in a browser.
5. Utilize [Vite](https://vite.dev/) to scaffold and complete your development.

## Starter HTML (optional)
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Mini To-Do</title>
    <script src="./src/js/main.js" type="module"></script>
  </head>
  <body>
    <h1>Mini To-Do</h1>
    <input id="taskInput" placeholder="New task" />
    <button id="addBtn">Add</button>
    <ul id="taskList"></ul>
  </body>
</html>
```

## Acceptance Criteria

- Adding a non-empty task creates a new list item in the DOM.
- Pressing Enter also adds the task.
- "Done" toggles a completed style immediately.
- "Delete" removes the item immediately.
- JavaScript is modular (separate file), uses functions and event listeners, and contains at least one comment explaining logic.
- README explains how to open/test the page.

## Stretch Challenges (optional)

- Persist tasks using localStorage.
- Add an "Edit" button to change task text in place.
- Show validation feedback for empty input.

## Estimated time

- 30-60 minutes

## Submission

- Commit your files to your workbook repo and push to GitHub.
- Ensure a README.md is present describing how to open and run the page locally.