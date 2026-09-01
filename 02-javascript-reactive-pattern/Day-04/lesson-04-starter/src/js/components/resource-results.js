const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class="list-group list-group-flush">
        <!-- Results will be injected here -->
      </div>
    </div>
  </section>`;

class ResourceResults extends HTMLElement {
  #results = [];

  // Step 3: Store the filtered dataset and current filters, then derive and render filtered results.
  // TODO: Keep a filtered copy of the dataset (e.g., #filteredResults).
#filteredResults = [];

  // TODO: Add a private filters field that triggers filtering and re-render.

  #filters = {
    query = '',
    category = 'all',
    openNow = false,
    virtual = false,
  };
  
  constructor() {
    super();
    this._handleResultClick = this._handleResultClick.bind(this);
    this.attachShadow({ mode: 'open' });
  }

  // TODO: Add a filters property (e.g., set filters(filters)) that triggers filtering and re-render.

  set results(data) {
    this.#results = data;
    // Step 3: Set the filtered results initially to the full dataset.
    this.#filteredResults = [...data]    // TODO: Initialize the filtered results.
    this.render();
  }

   // TODO: Add a filters property (e.g., set filters(filters)) that triggers filtering and re-render.

  set filters(filters) {
    // Retain ALL existing filter values unless explicitly overridden
    this.#filters = {
      ...this.#filters,
      ...filters,
    };
    this.#applyFilters();
  }
  
  _handleResultClick(event) {
    const button = event.target.closest('button[data-id]');
    if (button) {
      const selectedId = button.getAttribute('data-id');
      // Mark the selected result as active
      // NOTE: can use and explain the optional chaining operator here (as below) OR just use an if statement
      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      button.classList.add('active');

      // Find the selected resource from the results
      const resource = this.#results.find(r => r.id === selectedId);
      // Dispatch a custom event with the selected resource details
      const selectedEvent = new CustomEvent('resource-selected', {
        detail: { resource },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(selectedEvent);
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }

  // TODO: Filter without mutating the original dataset.
#applyFilters() {
    const { query, category, openNow, virtual } = this.#filters; // object destructuring 
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedCategory = (category || '').trim().toLowerCase();

    // There are many ways to implement filtering; the following is just one approach.
    this.#filteredResults = this.#results.filter((result) => {
      if (normalizedQuery) {
        const haystack = [
          result.title,
          result.summary,
          result.category,
          result.location,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }

      if (normalizedCategory && normalizedCategory !== 'all') {
        if (result.category.toLowerCase() !== normalizedCategory) {
          return false;
        }
      }

      if (openNow && !result.openNow) {
        return false;
      }

      if (virtual && !result.virtual) {
        return false;
      }

      return true;
    });

    this.render();
  }
  render() {
    const content = template.content.cloneNode(true);

    // Step 3: Render from the derived (filtered) results, show an empty-state when none match.
    // TODO: Use the filtered results to build the list items.
    if (this.#filteredResults.length) {
      // Generate the list of results to display
      const resultsHtml = this.#filteredResults.map(result => `<button type="button" class="list-group-item list-group-item-action" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}</p>
          <small class="text-body-secondary">${result.location}</small>
        </button>`);
      const listGroup = content.querySelector('.list-group');
      listGroup.innerHTML = resultsHtml.join('');
    } else {
      // No results found message
      const listGroup = content.querySelector('.list-group');
      listGroup.innerHTML = `<div class="list-group-item">
          <p class="mb-0">No results found.</p>
        </div>`;
    }

    // Clear existing content and append new content
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}

customElements.define('resource-results', ResourceResults);
