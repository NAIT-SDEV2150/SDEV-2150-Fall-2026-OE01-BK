// main.js
import './components/resource-header.js';
import './components/resource-filters.js';
import './components/resource-results.js';
import './components/resource-details.js';

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

const resultsComponent = document.querySelector('resource-results');
resultsComponent.results = resultData;

// Step 4: Wire <resource-filters> to <resource-results>.
// TODO: Listen for `resource-filters-changed` (bubbles and composed from Shadow DOM).
const filtersComponent = document.querySelector('resource-filters');
filtersComponent.addEventListener('resource-filters-changed', (event) => {
  resultsComponent.filters = event.detail;
// TODO: Pass filters to results via resultsComponent.setFilters(filters) or resultsComponent.filters = filters.
  const detailsComponent = document.querySelector('resource-details');
  detailsComponent.resource = null;
});


// TODO: Reset details view when new filters are applied (clear previous selection).

const detailsComponent = document.querySelector('resource-details');
resultsComponent.addEventListener('resource-selected', (event) => {
  const { resource } = event.detail;
  detailsComponent.resource = resource;
});
