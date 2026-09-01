// main.js

// --------------------------------------------------
// STEP 1: Import component modules so they register
// --------------------------------------------------
// TODO: Create these files in src/js/components/ and then uncomment imports.

// import './components/resource-header.js';
// import './components/resource-filters.js';
// import './components/resource-results.js';
// import './components/resource-details.js';

// Optional stretch:
// import './components/resource-item.js';


// --------------------------------------------------
// STEP 2: Replace markup in index.html with custom elements
// --------------------------------------------------
// Once your component files exist and are imported above,
// update src/index.html so it uses:
//
// <resource-header></resource-header>
// <div class="row g-3">
//   <resource-filters class="col-12 col-lg-4"></resource-filters>
//   <resource-results class="col-12 col-lg-4"></resource-results>
//   <resource-details class="col-12 col-lg-4"></resource-details>
// </div>
//
// At that point the page will be empty until each component renders.


// --------------------------------------------------
// STEP 3: (Later) Add data and interaction
// --------------------------------------------------
// Lesson 02 focuses on composition. Functionality can be minimal.
// If you have time, use these stretch ideas:
//
// - Store resources in an array of objects
// - Render the results list from data
// - Emit a custom event from <resource-results> when a result is selected
// - Update <resource-details> when a selection event is received


// --------------------------------------------------
// Helpful: starter data shape for later
// --------------------------------------------------
// You can copy this into <resource-results> later.

// const resources = [
//   {
//     id: 'tutoring',
//     title: 'Peer Tutoring Centre',
//     category: 'Academic',
//     summary: 'Drop-in tutoring and study support.',
//     location: 'Building E, Room 210',
//     hours: 'Mon–Thu 10:00–16:00',
//     contact: 'tutoring@example.edu',
//     virtual: false,
//     openNow: true,
//   },
//   {
//     id: 'counselling',
//     title: 'Counselling Services',
//     category: 'Wellness',
//     summary: 'Confidential mental health supports.',
//     location: 'Virtual and in-person',
//     hours: 'Mon–Fri 09:00–17:00',
//     contact: 'wellness@example.edu',
//     virtual: true,
//     openNow: true,
//   },
//   {
//     id: 'bursaries',
//     title: 'Student Awards and Bursaries',
//     category: 'Financial',
//     summary: 'Funding options and application help.',
//     location: 'Service Desk, Main Floor',
//     hours: 'Mon–Fri 10:00–15:00',
//     contact: 'awards@example.edu',
//     virtual: true,
//     openNow: false,
//   },
//   {
//     id: 'it',
//     title: 'IT Service Desk',
//     category: 'Tech',
//     summary: 'Account access, Wi-Fi, MFA resets.',
//     location: 'Library entrance',
//     hours: 'Mon–Fri 08:30–16:30',
//     contact: 'it@example.edu',
//     virtual: false,
//     openNow: true,
//   },
// ];
