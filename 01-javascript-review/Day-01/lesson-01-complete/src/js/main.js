// main.js

// --------------------------------------------------
// STEP 1: Select DOM elements ONCE
// --------------------------------------------------
// Grab references to the main UI elements.
// These IDs should already exist in index.html.

// TODO: Select the main todo list container
const list = document.querySelector('#todo-list');

// TODO: Select the output area for text and messages
const output = document.querySelector('#output');

// TODO: Select the Run Demo button
const btnRun = document.querySelector('#btn-run');

// TODO: Select the Clear button
const btnClear = document.querySelector('#btn-clear');

// --------------------------------------------------
// STEP 2: Variables and template strings
// --------------------------------------------------
// Create a constant and a variable, then display
// them using a template string.

// TODO: Create a constant named course
const course = 'SDEV2150';
// TODO: Create a variable named topic
let topic = 'JavaScript review';
// TODO: Use a template string to display both values
output.innerHTML = `<p>Course: ${course} | Topic: ${topic}</p>`;

// --------------------------------------------------
// STEP 3: Functions and return values
// --------------------------------------------------
// Write a function that adds two numbers and
// another function that formats a label/value pair.

// TODO: Create a function add(a, b)
function add(a, b) {
	return a + b;
}

// TODO: Create an arrow function formatResult(label, value)
const formatResult = (label, value) => {
	return `${label}: ${value}`;
}

// TODO: Call the functions and display the result
output.innerHTML += `<p>${formatResult('2 + 3', add(2, 3))}</p>`;

// --------------------------------------------------
// STEP 4: Arrays, objects, and iteration
// --------------------------------------------------
// Create an array of task objects and count
// how many are marked as done.

// TODO: Create an array named tasks
// Each task should have: title (string), done (boolean)
const tasks = [
	{ title: 'Install dependencies', done: true },
	{ title: 'Run dev server', done: true },
	{ title: 'Complete the demo', done: false },
];

// TODO: Use a loop to count completed tasks
let completedCount = 0;
for (const task of tasks) {
	if (task.done) completedCount++;
}

// TODO: Display: "Completed: X of Y"
output.innerHTML += `<p>Completed: ${completedCount} of ${tasks.length}</p>`;

// --------------------------------------------------
// STEP 5: Problem solving – build HTML from data
// --------------------------------------------------
// Build a function that converts the tasks array
// into an HTML list using a loop.

// TODO: Create a function renderTaskList(items)
// - Start with '<ul>'
// - Loop over items
// - Add <li> elements with a class of 'done' or 'todo'
// - Close the list and return the string
function renderTaskList(items) {
  let html = '<ul>';
  for (const item of items) {
    const status = item.done ? 'done' : 'todo';
    html += `<li class="${status}">${item.title}</li>`;
  }
  html += '</ul>';
  return html;
}

// TODO: Render the task list inside the list container
list.innerHTML = renderTaskList(tasks);

// --------------------------------------------------
// STEP 6: DOM manipulation with createElement
// --------------------------------------------------
// Create and append elements instead of using innerHTML.

// TODO: Create a function addMessage(message)
// - Create a <p> element
// - Set its textContent
// - Append it to the output element
function addMessage(message) {
  const p = document.createElement('p');
  p.textContent = message;
  output.appendChild(p);
}

// TODO: Test the addMessage function
addMessage('This message was appended with createElement');

// --------------------------------------------------
// STEP 7: Events – connect UI to behavior
// --------------------------------------------------
// Wire the buttons to functions that update the UI.

// TODO: Create a function runDemo()
// - Clear output
// - Add a few messages
// - Render the task list
function runDemo() {
  output.innerHTML = '';
  addMessage('Running demo...');
  addMessage(formatResult('5 + 8', add(5, 8)));
  list.innerHTML = renderTaskList(tasks);
}

// TODO: Create a function clearUI()
// - Clear both output and todo list containers
function clearUI() {
  output.innerHTML = '';
  list.innerHTML = '';
}

// TODO: Add click listeners for btnRun and btnClear
btnRun.addEventListener('click', runDemo);
btnClear.addEventListener('click', clearUI);

// --------------------------------------------------
// STEP 8: Mini extension – Adding tasks
// --------------------------------------------------
const txtTask = document.getElementById('txt-task');
const btnAdd = document.getElementById('btn-add');

btnAdd.addEventListener('click', () => {
  const title = txtTask.value.trim();
  if (!title) return;

  tasks.push({ title, done: false });
  list.innerHTML = renderTaskList(tasks);
  txtTask.value = '';
});

// --------------------------------------------------
// STEP 9: Student Exercise Prompts
// --------------------------------------------------
// Complete these AFTER the demo:

// 1. Create a function toggleDone(title)
//    - Find a task by title
//    - Flip its done value (true/false)

// 2. Update renderTaskList() to show '(done)' or '(todo)'

// 3. Add event delegation to the <ul>
//    - When a list item is clicked:
//      * Toggle the task
//      * Re-render the list

// 4. Stretch goals:
//    - Display a chekcbox next to each task to represent done/todo 
//      (checking/unchecking it toggles the state)
//    - Update the UI so that pressing enter in the text input adds 
//      the task (notice we aren't using a form
//    - Display a summary line above the list
//      e.g. "Completed: 2 of 3"