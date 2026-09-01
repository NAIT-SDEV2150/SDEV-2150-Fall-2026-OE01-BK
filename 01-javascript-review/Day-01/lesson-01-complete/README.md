# Lesson 01 Starter

## Install dependencies and run the dev server

0. Extract the starter zip and rename the folder to `lesson-01`
1. Move into the lesson-01/ directory:
```sh
cd lesson-01
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
5. You should see the default render for the Vite project.
6. Use this as the base for today's examples.

## Instructor Demo and Student Exercise

Complete the demo along with your instructor and then attempt the exercise prompts (see the comments in the `main.js` file).

This lesson is a JavaScript review focused on reinforcing core syntax and problem solving, then applying it to simple DOM interactions. Follow the short, incremental snippets below during the live demo and examine the updates in the browser after each change.

### Select DOM elements

```js
const list = document.querySelector('#todo-list');
const output = document.querySelector('#output');
const btnRun = document.querySelector('#btn-run');
const btnClear = document.querySelector('#btn-clear');
```

### Variables and template strings

```js
const course = 'SDEV2150';
let topic = 'JavaScript review';

output.innerHTML = `<p>Course: ${course} | Topic: ${topic}</p>`;
```

### Functions, parameters, and return values

```js
// declared function
function add(a, b) {
  return a + b;
}

// arrow function
const formatResult = (label, value) => {
  return `${label}: ${value}`;
}

output.innerHTML += `<p>${formatResult('2 + 3', add(2, 3))}</p>`;
```

### Arrays, objects, and iteration

```js
const tasks = [
  { title: 'Install dependencies', done: true },
  { title: 'Run dev server', done: true },
  { title: 'Complete the demo', done: false },
];

let completedCount = 0;
for (const task of tasks) {
  if (task.done) completedCount++;
}

output.textContent = `Completed: ${completedCount} of ${tasks.length}`;
```

### Build a string from data

```js
function renderTaskList(items) {
  let html = '<ul>';
  for (const item of items) {
    const status = item.done ? 'done' : 'todo';
    html += `<li class="${status}">${item.title}</li>`;
  }
  html += '</ul>';
  return html;
}

list.innerHTML = renderTaskList(tasks);
```

### DOM manipulation, create and append elements

```js
function addMessage(message) {
  const p = document.createElement('p');
  p.textContent = message;
  output.appendChild(p);
}

addMessage('This message was appended with createElement');
```

### Events, connect buttons to functions

```js
function runDemo() {
  output.innerHTML = '';
  addMessage('Running demo...');
  addMessage(formatResult('5 + 8', add(5, 8)));
  list.innerHTML = renderTaskList(tasks);
}

function clearUI() {
  output.innerHTML = '';
  list.innerHTML = '';
}

btnRun.addEventListener('click', runDemo);
btnClear.addEventListener('click', clearUI);
```

### Mini extension, input driven update

Wire up the existing input and add button:

```js
const txtTask = document.getElementById('txt-task');
const btnAdd = document.getElementById('btn-add');

btnAdd.addEventListener('click', () => {
  const title = txtTask.value.trim();
  if (!title) return;

  tasks.push({ title, done: false });
  list.innerHTML = renderTaskList(tasks);
  txtTask.value = '';
});
```

## Student Exercise

Work through the prompts in `main.js`. Your goal is to reinforce problem solving first, then connect it to DOM updates.

1. Add a function `toggleDone(title)` that finds a task by title and flips its `done` value.
2. Update `renderTaskList()` to include the status text like `(done)` or `(todo)`.
3. Add a click listener using event delegation on the list. When a list item is clicked, call `toggleDone()` and re-render the list.
4. Stretch goals:
   - utilize a checkbox for each task to indicate done/todo (clicking the checkbox should toggle done for each task).
   - update the app so that pressing enter in the input field will also add the task (notice we aren't using a form in this example).
   - display a summary line above the list, like `Completed: 2 of 3`.

## Push to your GitHub workbook repo

Once you're done making your own custom updates to the project, stage your files, commit your work, and push to the remote repository.

1. Open a terminal in VS Code
2. Stage all updated and created files:
```sh
git add .
```
3. Commit the changes:
```sh
git commit -m 'Lesson 1 Example'
```
4. Push your changes to the remote workbook repository:
```sh
git push origin main
```