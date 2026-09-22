// main.js
import './components/resource-header.js';
import './components/resource-filters.js';
import './components/resource-results.js';
import './components/resource-details.js';

// TODO: Stage 1: Replace hard-coded data with a fetch() call
// Sample data for resources
const resultData = [
  {
    id: 'tutoring',
    title: 'Peer Tutoring Centre',
    category: 'Academic',
    summary: 'Drop-in tutoring and study support.',
    location: 'Building W, Room W101',
    hours: 'Mon-Thu 10:00-16:00',
    contact: 'tutoring@nait.ca',
    virtual: false,
    openNow: true,
  },
  {
    id: 'counselling',
    title: 'Counselling Services',
    category: 'Wellness',
    summary: 'Confidential mental health supports.',
    location: 'Virtual and in-person',
    hours: 'Mon-Fri 09:00-17:00',
    contact: 'wellness@nait.ca',
    virtual: true,
    openNow: true,
  },
  {
    id: 'bursaries',
    title: 'Student Awards and Bursaries',
    category: 'Financial',
    summary: 'Funding options and application help.',
    location: 'Student Services, Main Floor CAT',
    hours: 'Mon-Fri 10:00-15:00',
    contact: 'awards@nait.ca',
    virtual: true,
    openNow: false,
  },
  {
    id: 'it',
    title: 'IT Service Desk',
    category: 'Tech',
    summary: 'Account access, Wi-Fi, MFA resets.',
    location: 'Library',
    hours: 'Mon-Fri 08:30-16:30',
    contact: 'it@nait.ca',
    virtual: false,
    openNow: true,
  },
];

// TODO: Stage 1: After fetching from the API, pass the fetched resources into <resource-results>
const resultsComponent = document.querySelector('resource-results');
resultsComponent.results = resultData;

// Filters emit state, main.js updates results and resets details
const filtersComponent = document.querySelector('resource-filters');
filtersComponent.addEventListener('resource-filters-changed', (event) => {
  resultsComponent.filters = event.detail;
  const detailsComponent = document.querySelector('resource-details');
  // Reset details when filter state changes to avoid stale selection.
  detailsComponent.resource = null;
});

const detailsComponent = document.querySelector('resource-details');
resultsComponent.addEventListener('resource-selected', (event) => {
  const { resource } = event.detail;
  detailsComponent.resource = resource;
});

// TODO: Stage 2: Replace the app shell coordination above with a `source` attribute on <resource-results>
// so the component fetches its own data when the source changes
// Option 1: set the source attribute to a URL string hrere in code or
// Option 2: set the source attribute directly in the HTML markup (index.html)
